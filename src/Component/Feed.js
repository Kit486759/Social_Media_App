import React, { useContext, useState } from 'react'
import { Context } from './ContextApi'
import { v4 as uuidv4 } from 'uuid';
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Feed() {

    const { data, dispatch } = useContext(Context)
    const [input, setInput] = useState({})
    const [like, setLike] = useState(false)

    // Submit comment , sent value back to Context
    const submit = (e) => {
  
        e.preventDefault()
        if (input.user === "" || input.comment === "") {
            return alert("Please input all information ")
        }
        dispatch({ type: "ADD_COMMENT", payload: input })

        // Clear user & comment input box after submition
        e.target.userInput.value = ""
        e.target.cmInput.value = ""

    }

    // Function for like button
    const likeOnClick = (postId) => {

        setLike(!like)
        if (like === false)
            dispatch({ type: "LIKED", payload: postId })
        if (like === true)
            dispatch({ type: "UNLIKED", payload: postId })
    }

    return (
        <div className=" relative w-500 mx-auto mt-28">
            {data.map((data, index) => {
                return (
                    <div className=" relative border border-gray-200 mb-8 h-3/6 mx-auto w-full rounded-md p-2  shadow-md "
                        key={index}>
                        <div className="mt-1 mb-2 h-1/6 bg-blue-50">
                            <p className="font-bold text-base">{data.owner.firstName}</p>
                        </div>
                        <img className=" w-500 h-80 object-cover"
                            src={data.image} alt="image" />
                        <div className="my-2">
                            {like === false ?
                                <FaRegHeart className="inline" size={20} style={{ cursor: "pointer", borderColor: "white" }}
                                    onClick={() => likeOnClick(data.id)} />
                                :
                                <FaHeart className="inline" size={20} style={{ cursor: "pointer", color: "af0d0d" }}
                                    onClick={() => likeOnClick(data.id)} />
                            }
                            <span className="text-sm ml-2 mb-2 align-bottom">{data.likes} Likes </span>
                        </div>

                        <span className="font-black mr-2 text-base mt-5">{data.owner.firstName}</span>
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

                                    </div>
                                })
                                }
                            </>
                            : null
                        }

                        < form onSubmit={submit}>
                            <input className="block rounded-2xl mb-1 w-full pl-2 focus:outline-none
                             focus:bg-gray-100 border border-gray-200"
                                id="userInput" autoComplete="off" placeholder="User" onChange={e => setInput({ ...input, id: data.id, user: e.target.value, uid: uuidv4() })}></input>
                            <div className="flex">
                                <textarea className="rounded-2xl w-10/12 pl-2 pt-2 focus:outline-none
                             focus:bg-gray-100 border border-gray-200"
                                    id="cmInput" autoComplete="off" placeholder="Write comments" onChange={e => setInput({ ...input, comment: e.target.value })}></textarea>
                                <button className="text-gray-400 font-bold p rounded-lg ml-2 w-1/6
                              text-center bg-gray-50 hover:bg-blue-50
                            "
                                    type="submit"
                                >Post</button>
                            </div>
                        </form>
                    </div >
                )
            })}
        </div >
    )

}

// Delete button
{/* {comment.user !== null &&
<button className="bg-gray-500 rounded-full w-5 float-right"
onClick={() => deleteComment(data.cm.uid)}
>X</button>} */}