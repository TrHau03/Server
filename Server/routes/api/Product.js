var express = require('express');
var router = express.Router();
 const productController = require('../../components/product/Controller');
const  cateController  = require('../../components/category/Controller');
 const upload = require('../../middle/Uploadfile');
 const {checkTokenApp} = require('../../middle/Authen');
////localhost:3000/api/product/get-all
 router.get('/get-all',checkTokenApp, async(req, res, next) => {
    try {
        const product = await productController.getALLProducts();
        return res.status(200).json({data:{return : true, product : product}}); 
    } catch (error) {
        return res.status(504).json({return : false, product: null});
    }
 });
 router.get('/get-allCategory', async(req, res, next) => {
    try {
        const cate = await cateController.getAllCategory();
        console.log("cate", cate);
        return res.status(200).json({data:{return : true, cate : cate}}); 
    } catch (error) {
        return res.status(504).json({return : false, cate: null});
    }
 });
 ////localhost:3000/api/product/search?key=iphone
 router.get('/search', async(req, res, next) => {
    try {
        const {key}  = req.query;
        const product = await productController.searchProduct(key);
        return res.status(200).json({data:{return : true, product : product}}); 
    } catch (error) {
        return res.status(500).json({return : false, product: null});
    }
 });
 router.get('/getProductByID/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id);
        const product = await productController.getProductByID(id);
        return res.status(200).json({data:{return : true, product : product}});
    } catch (error) {
        return res.status(500).json({return : false, product: null});
    }
 });
 router.get('/getProductByCate/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productController.getProductByCate(id);
        console.log("Product by Cate", product);
        return res.status(200).json({data:{return : true, product : product}});
    } catch (error) {
        return res.status(500).json({return : false, product: null});
    }
 });
 router.post('/upload-image',[upload.single('image')], async(req, res, next) => {
    try {
        let {file} = req;
        if(file){
          let  link  = `http://localhost:3000/images/${file.filename}`;
          /*let link = [];
          files.forEach(file =>{
            link.push(`http://localhost:3000/images/${files.filename}`);
          })*/ 
          return res.status(200).json({result: true, link: link});

        }
    } catch (error) {
        console.log("Uploading image failed:", error);
        return res.status(500).json({result: false});
    }
});
router.post('/upload-images',[upload.array('images', 10)], async(req, res, next) => {
    try {
        let {files} = req;
        if(files && files.length > 0)    {
          let link = [];
          files.forEach(files =>{
            link.push(`http://localhost:3000/images/${files.filename}`);
          })
          return res.status(200).json({result: true, link: link});

        }
    } catch (error) {
        console.log("Uploading image failed:", error);
        return res.status(500).json({result: false});
    }
});
module.exports = router;
