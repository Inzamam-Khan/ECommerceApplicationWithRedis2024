import { useParams } from 'react-router-dom'
import ProductCategoryItem from '../Components/ProductCategoryItem'
import { useSelector } from 'react-redux'

export function ProductsByCategory() {
    
    const {category}=useParams()
    var  products=useSelector(state=>state.ProductsReducer)?.filter((item)=>
        item.category === category

    );
   
  return (
    <div className=' border-blue-500 min-h-screen overflow-hidden  w-full text-white  '>

        <div  className="   border-green-500 w-full h-full mx-auto px-4 sm:px-6 lg:px-8 pt-[5.5rem] sm:pt-[6rem] ">
       
       <h1 className='  text-2xl font-medium capitalize leading-normal text-gray-300  max-sm:pt-[3rem]
                 '>
        Product Category -
        <span className='bg-gradient-to-tr from-blue-500 to-red-500 text-transparent bg-clip-text'>{""} {category.toUpperCase()}</span>
       </h1>

            <div className="overflow-auto border-red-500 py-4 
            mt-2 w-full   min-h-[76vH] grid grid-cols-1 sm:grid-cols-3
             md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6  gap-8 sm:gap-4 md:gap-2   ">
                
                {/* ProductCategoryItems */}
                {products?.map((item,index)=>(
                         <ProductCategoryItem key={index} {...item}/>     
                ))}
               

            </div>




        </div>
      
    </div>
  )
}


