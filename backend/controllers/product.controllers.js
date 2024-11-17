const Product = require("../Models/productModel")
const { redis } = require('../DB/redis.js')
const cloudinary = require("../DB/cloudinary.js")

async function getAllProducts(req, res) {
    try {
        const products = await Product.find({})
        
        return res.json({ products })


    } catch (error) {
        console.log(error)
        return error.message

    }

}



async function featuredProducts(req, res) {
    try {
        let featuredProducts = await redis.get("featured_products")
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        }
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ error: 'NO featured Products Found!' })
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts));
        return res.json(featuredProducts)
    } catch (error) {
        console.log(error.message)
        return error.message

    }


}

async function createProducts(req, res) {
    const { name, description, price, image, category,stock } = req.body
    console.log(req.body)

   
    try {
        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'products' })
        }

        const product = await Product.create({
            name, description, price, category,stock,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : ""

        })
        res.status(201).json({ message: "Product created Successfully", product })

    } catch (error) {
        console.log(error)
        return res.status(401).json({error:error.message})

    }


}


async function deleteProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ error: "Product Not Found!" });

        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]
            try {
                const cloudinaryDeleteResponse = await cloudinary.uploader.destroy(`products/${publicId}`)
                if (cloudinaryDeleteResponse.result != "ok") {
                    return res.status(404).json({ error: cloudinaryDeleteResponse.result })

                }


            } catch (error) {
                console.log(error)
                return error.message

            }
        }

        await Product.findByIdAndDelete(req.params.id)
        return res.json({ message: "Product deleted Successfully" })

    } catch (error) {
        console.log(error)
        return error.message

    }


}


async function getRecommendedProducts(req, res) {
    try {
        const products = await Product.aggregate([
            {
                $sample:
                {
                    size: 3
                }
            },
            {
                $project:
                {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])
        return res.json(products)

    } catch (error) {
        console.log(error)
        return error.message

    }

}

async function getProductsByProductId(req,res){
    const {productId}=req.params;
    
    try {
        const products=await Product.findById(productId)
        
        if(products.length == 0) return res.status(404).json({error:"No Products Found!"})

        return res.json(products);
        
    } catch (error) {
        console.log(error)
        return error.message
        
    }


}


async function toggleFeaturedProducts(req,res){
    const{ id}=req.params
    try {
        const product=await Product.findById(id);
        product.isFeatured=!product.isFeatured
        const updatedProduct=await product.save()
        await updateFeaturedProductsCache()
        return res.status(200).json(updatedProduct)
        
    } catch (error) {
        console.log(error)
        return error.message
        
    }
}


const updateFeaturedProductsCache=async()=>{
    try {
        const featuredProducts=await Product.find({isFeatured:true}).lean();
    await redis.set("featured_products",JSON.stringify(featuredProducts));
        
    } catch (error) {
        console.log(error)
        return error.message
        
    }
    

}




module.exports = {
    getAllProducts,getProductsByProductId,toggleFeaturedProducts,
    featuredProducts, createProducts,
    deleteProduct, getRecommendedProducts
}