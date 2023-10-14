/* eslint-disable react/prop-types */
// react-icons
import {BsImages } from 'react-icons/bs'

// react-spinner
import {FadeLoader } from 'react-spinners'

const ImgSelectBox = ({loader, htmlFor, onChange}) => {
  return (
    <>
    <label className='flex flex-col justify-center items-center w-full h-full border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative cursor-pointer' htmlFor={htmlFor} >
    <span><BsImages /></span>
    <span>Select Image</span>

    {
        loader && (
            <div className="bg-slate-600 opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center z-20 ">
                <span> <FadeLoader /> </span>
            </div>
        )
    }
    </label>
    <input type="file" multiple={true} name={htmlFor} id={htmlFor} className='hidden' onChange={onChange} />
    </>
  )
}

export default ImgSelectBox