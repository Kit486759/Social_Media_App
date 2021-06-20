import React, { useEffect, createContext, useReducer, useState } from 'react';
import axios from 'axios';


const reducer = (state, action) => {
    switch (action.type) {

        case 'ADD_POST':
            return [...state, action.payload]

        case 'ADD_COMMENT':
            return state.map((info) => {
                // validation check by post id, the change will only apply in that post
                return info.id === action.payload.id ?
                    {
                        ...info,
                        cm: [{ user: action.payload.user, comment: action.payload.comment, uid: action.payload.uid }, ...info.cm]
                    } : info
            })

        case 'LIKED':
            return state.map((info) => {
                return info.id === action.payload ?
                    {
                        ...info,
                        likes: info.likes + 1
                    } : info
            })

        case 'UNLIKED':
            return state.map((info) => {
                return info.id === action.payload ?
                    {
                        ...info,
                        likes: info.likes - 1
                    } : info
            })

        case 'SHOWMORE':
            return state.map((info) => {
                return info.id === action.payload ?
                    {
                        ...info,

                        // Set show items = comments length
                        itemsToShow: info.cm.length,
                        expanded: true
                    } : info
            })

        case 'SHOWLESS':
            return state.map((info) => {
                return info.id === action.payload ?
                    {
                        ...info,

                        // Set show items = comments length
                        itemsToShow: 2,
                        expanded: false
                    } : info
            })


        default:
            return action.payload
                .map((info) => ({
                    ...info, cm: [
                        {
                            user: "kit",
                            comment: "Cute dog"
                        },
                        {
                            user: "kit",
                            comment: "Cute dog"
                        },
                        {
                            user: "kit",
                            comment: "Cute dog"
                        },
                        {
                            user: "kit",
                            comment: "Cute dog"
                        },
                        {
                            user: "kit",
                            comment: "Cute dog"
                        }
                    ],

                    itemsToShow: 2,
                    expanded: false
                }))
    }
}

export const Context = createContext()

export default function ContextApi({ children }) {

    const [data, dispatch] = useReducer(reducer, [])
    const BASE_URL = 'https://dummyapi.io/data/api';
    const APP_ID = '60cd05fef94203502e75f55f';

    const fetch = async () => {

        try {
            const img = await axios.get("https://fakestoreapi.com/products/")
            // const text = await axios.get("https://jsonplaceholder.typicode.com/posts")
            const post = await axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID } })

            console.log(post.data.data)

            dispatch({ type: 'default', payload: post.data.data })

            // dispatch({ type: 'COMBINE_CAPTION', payload: text.data })
        }
        catch (err) { console.log(`There is an error${err}`) }
    }

    useEffect(() => {
        fetch()
    }, [])

    // console.log(data)
    // console.log(comments)
    return (
        <>
            <Context.Provider value={{ data, dispatch }}>
                {children}
            </Context.Provider>
        </>
    )
}
