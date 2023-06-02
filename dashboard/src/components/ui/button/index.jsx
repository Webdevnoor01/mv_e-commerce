import React, { useState } from 'react'

const Button = ({ btnTxt, type, btnHandler, customeClass }) => {
    return (
        <button className={`${customeClass ? customeClass : 'bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'}`}  type={type?type:"button"} >{btnTxt}</button>
    )
}

export default Button