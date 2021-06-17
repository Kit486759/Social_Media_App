import React, { useEffect, createContext, useReducer, useState } from 'react';
import axios from 'axios';


const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...state, action.payload]
        case 'COMBINE_CAPTION':
            return [{...state,  "text": action.payload }]
        default:
            return action.payload
    }
}

export const Context = createContext()
export default function ContextApi({ children }) {

    // const [data, setdata] = useState([])
    const [data, dispatch] = useReducer(reducer, [])

    const fetch = async () => {

        try {
            const img = await axios.get("https://fakestoreapi.com/products/")
            const text = await axios.get("https://jsonplaceholder.typicode.com/posts")
            console.log(img.data)
            console.log(text.data)
            dispatch({ type: 'default', payload: img.data })
            // dispatch({ type: 'COMBINE_CAPTION', payload: text.data.body })
        }
        catch (err) { console.log(`There is an error${err}`) }
    }


    useEffect(() => {
        fetch()
    }, [])



    console.log(data)
    return (
        <>
            {/* {data.length !== 0 && ( */}

            <Context.Provider value={data}>
                {children}
            </Context.Provider>

        </>
    )
}
