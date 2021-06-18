import React, { useContext, useState } from 'react'
import { Context } from './ContextApi'


export default function Feed() {

    const { data, dispatch, comments, commentDispatch } = useContext(Context)
    const [input, setInput] = useState({})

    const submit = (e) => {
        e.preventDefault()
        if (input.user === "" || input.comment === "") {
           return  alert("Please input all information ")
        }
        commentDispatch({ type: "ADD_COMMENT", payload: input })
 
    }
           console.log(input)
        console.log(data)

    return (
        <div className=" relative w-300px mx-auto mt-28 ">
            {data.map((data, index) => {
                return (
                    <div className=" relative bg-gray-200 mb-20 h-3/6 w-300px rounded-3xl p-2"
                        key={index}>
                        <div className="mt-5 h-1/6">Kit user</div>
                        <img className=" h-80  object-cover"
                            src={data.image} alt="image" />
                        <p>Like heart</p>
                        <p>Caption: {data.description}</p>
                        {comments.map((comment, index) => {
                            return <div
                                key={index}>
                                <p>{comment.user}{comment.comment}</p>
                            </div>
                        })}

                        <form onSubmit={submit}>
                            <input className="block rounded-2xl mb-1"
                                placeholder="User" onChange={e => setInput({ ...input,id:data.id , user: e.target.value  })}></input>
                            <textarea className="rounded-2xl"
                                placeholder="Write comments" onChange={e => setInput({ ...input, comment: e.target.value })}></textarea>
                            <button className="mb-5"
                                type="submit"
                            >submit</button>
                        </form>
                    </div >
                )
            })}
        </div>
    )

}
