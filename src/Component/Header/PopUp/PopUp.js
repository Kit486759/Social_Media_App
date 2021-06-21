import './PopUp.css';
import { CgProfile } from 'react-icons/cg';
import { BiImageAdd } from 'react-icons/bi';

const PopUp = props => {
    const closeBtn = () => {
        props.close();
    }

    return (
        <>
            <div className='popUp-wrap'>
                <div className='popUp'>
                    <button onClick={closeBtn} className='popUp-btn'>Close</button>
                    <div className='popUp-newPost'>
                        <p>New Post</p>
                    </div>
                    <div className='popUp-container'>
                        <div className='flex items-center'>
                            <CgProfile className='w-10 h-10 mr-4' />
                            <span className='text-xl'>Lorem Ipsum</span>
                        </div>
                        <div className='flex justify-center border border-black rounded-md mt-4 w-full h-48 items-center'>
                            <div className='flex'>
                                <BiImageAdd className='w-10 h-10' />
                            </div>
                                <p>No Image</p>
                        </div>
                        <input
                            type='Text'
                            placeholder='Title'
                            className='border border-black rounded-md mt-4 w-full p-4'>
                        </input>
                        <button className='mt-4 bg-black w-full 
                        rounded-md border border-black p-2 text-white
                         hover:text-black hover:bg-gray-100'>
                            Post</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUp;