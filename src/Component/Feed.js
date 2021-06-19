import React, { useContext, useState } from 'react'
import { Context } from './ContextApi'
import { v4 as uuidv4 } from 'uuid';


export default function Feed() {

    const { data, dispatch, comments, commentDispatch } = useContext(Context)
    const [input, setInput] = useState({})

    const submit = (e) => {
        e.preventDefault()
        if (input.user === "" || input.comment === "") {
            return alert("Please input all information ")
        }
        dispatch({ type: "ADD_COMMENT", payload: input })

    }

    const deleteComment = (id) => {
        console.log(id)
        dispatch({ type: "DEL_COMMENT", payload: input })
    }

    // console.log(input)
    // console.log(data)

    return (
        <div className=" relative w-500 mx-auto mt-28">
            {data.map((data, index) => {
                return (
                    <div className=" relative bg-gray-200 mb-8 h-3/6 mx-auto w-full rounded-md p-2 shadow-xl border-5 border-gray-500"
                        key={index}>
                        <div className="my-2 h-1/6">
                            <p className="font-bold text-base">{data.owner.firstName}</p>
                        </div>
                        <img className=" w-500 h-80 object-cover"
                            src={data.image} alt="image" />
                        <p>{data.likes} Likes </p>
                        <span className="font-bold mr-2 text-sm ">{data.owner.firstName}</span>
                        <span className="text-sm break-words">{data.text}</span>
                        <div>
                            {data.tags.map((tag, index) => {
                                return <span className="text-sm mr-2 underline text-blue-900 cursor-pointer"
                                    key={index}>#{tag}
                                </span>
                            })}
                        </div>

                        {data.cm ?
                            <>
                                {data.cm.map((comment, index) => {
                                    return <div className="my-2 text-sm text"
                                        key={index}>
                                        <span className="break-words font-bold mr-2" >{comment.user}</span>
                                        <span className="break-words">{comment.comment}</span>
                                        {/* {comment.user !== null &&
                                            <button className="bg-gray-500 rounded-full w-5 float-right"
                                                onClick={() => deleteComment(data.cm.uid)}
                                            >X</button>
                                        } */}
                                    </div>
                                })
                                }
                            </>
                            : null
                        }










                        < form onSubmit={submit}>
                            <input className="block rounded-2xl mb-1 w-full pl-2"
                                placeholder="User" onChange={e => setInput({ ...input, id: data.id, user: e.target.value, uid: uuidv4() })}></input>
                            <textarea className="rounded-2xl w-full pl-2 pt-2"
                                placeholder="Write comments" onChange={e => setInput({ ...input, comment: e.target.value })}></textarea>
                            <button className="mb-5"
                                type="submit"
                            >submit</button>
                        </form>
                    </div >
                )
            })}
        </div >
    )

}
