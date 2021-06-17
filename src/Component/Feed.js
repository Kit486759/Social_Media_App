import React, { useContext } from 'react'
import { Context } from './ContextApi'

export default function Feed() {

    const data = useContext(Context)

    return (
        <div>
            {data.map((data, index) => {
                return (
                    <div key={index}>
                        <img src={data.image} alt="image" style={{height:400,width:400}}/>
                    </div >
                )
            })}
        </div>
    )

}
