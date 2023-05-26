var express = require('express');
var router = express.Router();


const productController = require('../../components/product/Controller');

const categoryController = require('../../components/category/Controller');
const { checkTokenWeb } = require('../../middle/Authen');
const upload = require('../../middle/Uploadfile');
//localhost:3000/cpanel/product
router.get('/', [checkTokenWeb], async (req, res, next) => {
    try {
        const product = await productController.getALLProducts();
        const category = await categoryController.getAllCategory();
        return res.render('product/list', { product, category });
    } catch (error) {
        next(error);
    }
});


router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.deleteProductsByID(id);
        return res.json({ result });
    } catch (error) {
        return res.json({ result: false });
    }
});




//hiển thị trang thêm mới
//localhost:3000/cpanel/product/new
// router.get('/a', async(req, res, next) => {
//     try {
//         const category = await categoryController.getAllCategory();
//         console.log("category",category);
//        return res.render('product/list', {category})
//     } catch (error) {
//         next(error);
//     }
// });
//xử lý thêm mới

//middleware
router.post('/', [checkTokenWeb, upload.array('image', 10)], async (req, res, next) => {
    try {
        let { body, files } = req;
        if (files && files.length > 0) {
            // files = `http://192.168.1.4:3000/images/${files.filename}`;
            // body  = {...body,image: files};
            let link = [];
            files.forEach(files => {
                link.push(`http://localhost:3000/images/${files.filename}`);
            })
            body  = {...body,image: link[0], imageContent1: link[1], imageContent2: link[2],imageContent3: link[3]};
        }
        const { title, author, content, image,imageContent1,imageContent2,imageContent3, category } = body;
        console.log("Image", image);
        const result = await productController.addProduct(title, author, content, image,imageContent1,imageContent2,imageContent3, category);
        if (result) {
            return res.redirect('/cpanel/product/');
        }
    } catch (error) {
        next(error);
    }
});
router.get('/:id/edit', [checkTokenWeb], async (req, res, next) => {
    try {
        let { id } = req.params;
        const product = await productController.getProductByID(id);
        let category = await categoryController.getAllCategory();
        console.log("Check cate:", product);
        category = category.map(item => {
            item.selected = false;
            if (item._id.toString() == product.category.toString()) {
                item.selected = true;
            }
            return item;
        });
        console.log("Check category:", category);
        res.render('product/update', { category, product });
    } catch (error) {
        next(error);
    }
});



//update iamge
router.post('/:id/edit', [checkTokenWeb, upload.single('image')], async (req, res, next) => {
    try {
        let { body, file } = req;
        let { id } = req.params;
        if (file) {
            file = `http://192.168.1.4/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { title, author, content, image, category } = body;
        console.log("category", category);
        const result = await productController.updateProductByID(id, title, author, content, image, category);
        if (result) {
            return res.redirect('/cpanel/product/');
        } else {
            return res.redirect('/');

        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});
module.exports = router;