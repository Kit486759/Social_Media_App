import React, { useEffect, createContext, useReducer, useState } from 'react';
import axios from 'axios';


const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...state, action.payload]
        case 'ADD_COMMENT':
            // return state.map((info)=>{{info === action.payload.id && console.log(info) } })
            // return state.map((info)=>{{info.id === action.payload.id && {...info, cm : action.payload} }})
            // return [...state, action.payload]
        default:
            return action.payload
    }
}

const commentReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.payload]
        // case 'COMBINE_CAPTION':
        //     return Object.assign({}, ...state, action.payload)
        //     return state.map((img) => ({ ...img, text: action.payload }))
        default:
            return action.payload
    }
}



export const Context = createContext()

export default function ContextApi({ children }) {


    const [data, dispatch] = useReducer(reducer, [])
    const [comments, commentDispatch] = useReducer(commentReducer, [])



    const fetch = async () => {

        try {
            const img = await axios.get("https://fakestoreapi.com/products/")
            // const text = await axios.get("https://jsonplaceholder.typicode.com/posts")
            console.log(img.data)

            dispatch({ type: 'default', payload: img.data })

            // dispatch({ type: 'COMBINE_CAPTION', payload: text.data })
        }
        catch (err) { console.log(`There is an error${err}`) }
    }


    useEffect(() => {
        fetch()

    }, [])


    console.log(data)
    console.log(comments)
    return (
        <>
            {/* {data.length !== 0 && ( */}

            <Context.Provider value={{ data, dispatch,comments,commentDispatch }}>
                {children}
            </Context.Provider>

        </>
    )
}
