import { IoCheckmarkCircle } from "react-icons/io5";
import React, { useRef, useState } from 'react'
import { CATEGORIES } from '../Constants'
import { FaImage } from "react-icons/fa";
import { useCreateProducts } from '../Hooks/useCreateProducts';
import { usePreviewImage } from '../Hooks/usePreviewImage';
import { Navigate } from 'react-router-dom';
function CreateProducts() {
    const imgRef = useRef()
    const [productsInputs, setProductsInputs] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
    })
    const { CreateProducts } = useCreateProducts()
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImage()

    return (
        <div className=' w-full  px-2 border-blue-500 h-[70vH]'>

            <div className='px-2  rounded-md border-gray-500 bg-gray-400 bg-opacity-20
         mx-auto w-full md:w-1/3 h-full py-2 '>
                <h1 className='text-2xl capitalize font-semibold text-emerald-400 text-center '>create New Product</h1>

                <div className="flex flex-col items-start mt-4 w-full">

                    <div className=" flex  items-center justify-between w-full text-center mb-3 ">
                        <label htmlFor="name"> Product Name</label>
                        <input type="text" id='name' className='ml-2 bg-transparent border border-slate-400 mt-1 w-[13rem]
                        rounded-md px-2 '
                            value={productsInputs.name} onChange={(e) => setProductsInputs({ ...productsInputs, name: e.target.value })}
                            placeholder='Product Name' />

                    </div>

                    <div className="flex  items-center justify-between w-full text-center my-3  ">
                        <label htmlFor="name" className=''> Product Description

                        </label>
                        <textarea type="textarea" id='name'
                            className=' ml-2 bg-transparent border border-slate-400 mt-2 w-[13rem]
                        rounded-md px-2 '  placeholder='Product Description'
                            value={productsInputs.description} onChange={(e) => setProductsInputs({ ...productsInputs, description: e.target.value })} />
                    </div>


                    <div className="flex  items-center justify-between w-full text-center my-3 ">
                        <label htmlFor="name"> Product Price    </label>
                        <input type="text" id='name' className='ml-2 bg-transparent border border-slate-400 mt-1  w-[13rem]
                        rounded-md px-2 '  placeholder='Product Price'
                            value={productsInputs.price} onChange={(e) => setProductsInputs({ ...productsInputs, price: e.target.value })} />

                    </div>

                    <div className="flex  items-center justify-between w-full text-center my-3 ">
                        <label htmlFor="name"> Product Category    </label>
                       
                       
                        <select type="text" id='name' className='ml-2  border border-slate-400 mt-1  w-[13rem]
                        text-inherit bg-gray-800  border-none
                        rounded-md px-2 '  placeholder='Product Category'
                            value={productsInputs.category} onChange={(e) => setProductsInputs({ ...productsInputs, category: e.target.value })}>

                            {CATEGORIES.map((item,index) => (
                                <option key={index} className=" " value={item.name}>{item.name.toUpperCase()}</option>


                            ))}

                        </select>

                    </div>

                    <div className="flex  items-center justify-between w-full text-center my-3 ">
                        <label htmlFor="name"> Product in Stock    </label>
                        <input type="text" id='name' className='ml-2 bg-transparent border border-slate-400 mt-1  w-[13rem]
                        rounded-md px-2 '  placeholder='Product in Stock'
                            value={productsInputs.stock} onChange={(e) => setProductsInputs({ ...productsInputs, stock: e.target.value })} />

                    </div>

                    <div className="flex  items-center justify-between relative  my-4    w-full">
                        <label htmlFor="name"> Product Image    </label>
                        <input ref={imgRef} type="file" hidden id='name' className='ml-2 bg-transparent border border-slate-400 mt-1
                        rounded-md px-2 '  placeholder='Product Image'
                            value={productsInputs.image} onChange={handleImageChange} />


                        <FaImage size={40}
                            className=' absolute -top-1 right-[.5rem] w-1/2 border border-gray-400 rounded-md p-1 cursor-pointer ' onClick={() => imgRef.current.click()} />
                           {selectedFile && 
                            <IoCheckmarkCircle size={20} 
                            className=' absolute top-[.5rem] right-[1rem] fill-emerald-400' />}
                           

                    </div>

                    <div className="flex  items-center justify-center  text-start w-full mt-3 ">
                        <button className='border  border-gray-400 px-3 py-1 rounded-md leading-normal bg-emerald-500 w-full'
                            onClick={() =>
                                CreateProducts({ ...productsInputs, image: selectedFile })

                            }>Create</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CreateProducts
