import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext/authContext";
import { useLogout } from "../Hooks/useLogout";
import bagsCategory from '../assets/bgImages/bagsCategory.jpg'
import { useSelector } from "react-redux";
export const Navbar=()=>{
   
    const handleRefreshToken=async()=>{
       const res= await fetch("/api/auth/refreshToken",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(await res.json())
    }
    
    const {Logout}=useLogout()
    // const cartItems=useSelector(state=>state.CartReducer)
    // console.log(cartItems)
    const {authUser:user}=useAuthContext()
    
   
  
    const isAdmin=user?.role === 'admin'
   

   
    return(
        <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-50 transition-all  mb-20 
         duration-300 border-b border-gray-500">
           
            <div className=" container flex justify-between  max-sm:flex-wrap items-center mx-auto  px-4 py-3 ">
               
                <Link to="/" className={`cursor-pointer min-w-[9rem] text-2xl font-bold text-blue-400 items-center leading-normal ${window.location.pathname === `/signup`? 
                    ` bg-gradient-to-tr from-emerald-400 to-red-500 bg-clip-text text-transparent`:`${window.location.pathname == `/login `? `
                    bg-gradient-to-tr from-blue-400 to-red-500 bg-clip-text text-transparent`  :``}`
                    
                    } `}>E-Commerce</Link>
               
               
                <nav className="text-gray-300 flex max-sm:flex-wrap items-center gap-7 max-sm:w-1/2  max-sm:justify-end ">
                   
                    <Link to={"/"} className="hover:bg-blue-400 hover:text-white px-3 py-1 cursor-pointer rounded-md font-medium transition flex items-center
                     duration-300 ease-in-out">
                        <IoMdHome size={21} className="inline-block mr-1"/>
                        <span className="hidden  sm:inline">Home</span>
                        </Link>

                    {user && (<Link to={"/cart"} className="hover:bg-blue-400 hover:text-white px-3 py-1
                    relative rounded-md font-medium transition duration-300 ease-in-out">
                    <FaCartShopping className="inline-block mr-1  "size={20} />
                    <span className="hidden  sm:inline">Cart</span>
                    {user?.cartItems?.length>0 &&
                    <span className=" bg-opacity-75 absolute -top-0 -left-0 text-sm text-white rounded-full px-1.5 py-0.2 bg-emerald-400 transition duration-300 ease-in-out">{user?.cartItems?.length}</span>
                    }
                    
                    </Link>)}

                    {
                    (user && isAdmin) ?(
                       
                       <Link className=" hover:bg-blue-400 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"to={"/admin"} >
                            <FaUnlock className="inline-block mr-1  "size={18} />
                            <span className="hidden  sm:inline">Admin</span>
                        </Link>)
                                :
                                (user &&  ( <Link className=" hover:bg-blue-400 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"to={`/my-tab/user/${user?._id}`} >
                                    {/* <img src={bagsCategory} alt="" className="border rounded-full w-[1.5rem] h-[1.5rem] " /> */}
                                    
                                    <FaUser className="inline-block mr-1  rounded-full "size={18} />
                                    <span className="hidden  sm:inline">{user?.userName}</span>
                                        </Link>
                
                
                
                
                                    ))
                    }

                    {user? (
                        <button onClick={()=>Logout()}
                        className="hover:bg-gray-600 hover:text-white font-medium py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">
                            <CiLogout size={18}/>
                            <span className="hidden sm:inline ml-1">Logout</span>
                            </button>
                    ):(<>
                    <Link to={'/signup'} className="bg-gray-800 hover:text-white px-3 py-1 rounded-md font-medium transition
                     duration-300 ease-in-out flex items-center">
                        <FaUserPlus size={18}/>
                        <span className="hidden  sm:inline ml-1">Signup</span></Link>
                    <Link to={'/login'} className="bg-slate-800 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center">
                    <CiLogin size={18}/>
                    <span className="hidden sm:inline ml-1">Login</span>
                    </Link>
                    
                    </>)}

                    <button onClick={handleRefreshToken} className="border px-2 rounded-md capitalize">refresh</button>
                 
                </nav>
            </div>
        </header>
    )
}