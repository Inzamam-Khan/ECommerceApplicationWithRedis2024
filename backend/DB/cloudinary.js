const  { v2 :cloudinary } =require("cloudinary");



    // Configuration
    cloudinary.config({ 
        cloud_name: 'daz5yzinz', 
        api_key: '359421763755664', 
        api_secret: 'HFBXY9H6oCOCn6_oT7ccd0Dyzsc' // Click 'View API Keys' above to copy your API secret
    })

    module.exports=cloudinary;


    
    // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();