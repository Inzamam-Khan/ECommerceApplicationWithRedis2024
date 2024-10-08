import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {motion} from 'framer-motion'
import { FaRegUser } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useSignup } from '../Hooks/useSignup.js';
import { Toaster } from 'react-hot-toast';
export function Signup() {

    const [isView,setIsView]=useState(false)
	
	const{signup,loading}=useSignup()
	const [inputs,setInputs]=useState({
		email:"",
		userName:"",
		password:""
	})
	// console.log(inputs)
  return (
    <motion.div
	initial={{opacity:0,y:-20}}
	animate={{opacity:1,y:0}}
	transition={{duration:0.8}}
	 className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">

		

	<div className="relative py-3   sm:max-w-sm sm:mx-auto top-6">
		<div
			className="absolute inset-0 bg-gradient-to-r from-emerald-300
             to-emerald-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative  px-4 py-10 bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				
				<div>
					<h1 className="text-3xl font-medium bg-gradient-to-tr from-emerald-400 to-red-500 bg-clip-text text-transparent text-center">
                        Signup</h1>
				</div>
				
				<motion.div 
				initial={{opacity:0,y:20}}
				animate={{opacity:1,y:0}}
				transition={{duration:0.8,delay:0.2}}
				 className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						
						<div className="relative ">
							<MdEmail className='absolute  top-3 right-2' size={14}/>
							<input value={inputs.email} onChange={(e)=>setInputs({...inputs,email:e.target.value})}
							autocomplete="off"
						id="email" name="email" type="text" className="bg-transparent peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:border-emerald-600" placeholder="Email address" />
							<label for="email" className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">Email</label>
						</div>
						<div className="relative ">
								<FaRegUser className='absolute  top-3 right-2' size={14}/>
							<input value={inputs.userName} onChange={(e)=>setInputs({...inputs,userName:e.target.value})}
							autocomplete="off" id="userName" name="userName" type="text" className="bg-transparent peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:border-emerald-600" placeholder="Username" />
							<label for="userName" className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">Username</label>
						</div>


                        <div className="relative ">
							<input value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}
							autocomplete="off"
						 id="password" name="password" type={`${isView? `text`:`password`}`} className="bg-transparent peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-white focus:outline-none focus:border-emerald-600" placeholder="Password" />
							<label for="password" className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">Password</label>
                            
                                <div className="absolute top-3 right-2 text-gray-400 cursor-pointer" onClick={()=>setIsView(!isView)}>
                                      {isView? (
                                <FaRegEye size={16} />
                            ):(
                                <FaRegEyeSlash size={16} />
                            )}

                                </div>
                          
                            
						</div>
						<div className="px-2 py-1 relative text-center">

							{loading ? (
								<div className='bg-slate-800 rounded-md py-1'>
								<FiLoader className='inline-block mr-1  mx-auto animate-[spin_2s_linear_infinite]   text-emerald-400 '/>
								
								</div>
							):(
								<button onClick={()=>signup(inputs)}
								className="hover:bg-emerald-400 bg-emerald-500 text-white rounded-md px-2 py-1">
									
									
									
									
									Signup</button>
							)}
							
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	</div>
    </motion.div>
    
  )
}

