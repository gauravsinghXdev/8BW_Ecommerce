const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Recent = require('../models/Recent');
const Featured = require('../models/Featured');
const Cart = require('../models/Cart');

const mainLayout = '../views/layouts/main';

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    res.render('index', { 
      currentRoute: '/',
      layout: mainLayout
    });

  } catch (error) {
    console.log(error);
  }

});

/**
 * GET /
 * 
*/
router.get('', async (req, res) => {
  try {
    const data = await Product.find();
    res.render('index', { 
      currentRoute: '/',
      layout: mainLayout,
      data
    });

  } catch (error) {
    console.log(error);
  }
  
});
/**
 * GET /
 * SHOP
*/
router.get('/shop', async (req, res) => {
  try {
    const data = await Product.find();
    res.render('shop', { 
      currentRoute: '/shop',
      layout: mainLayout,
      data
    });

  } catch (error) {
    console.log(error);
  }
  
});

/**
 * GET /
 * CART
*/
router.get('/cart', async (req, res) => {
  try {
    const data = await Cart.find();
    res.render('cart', { 
      currentRoute: '/cart',
      layout: mainLayout,
      data
    });

  } catch (error) {
    console.log(error);
  }
  
});

/**
 * GET /
 * PRODUCT BY ID
*/
router.get('/product/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Product.findById({ _id: slug });

    const locals = {
      title: data.title
      }

    res.render('shoes', { 
      locals,
      data,
      currentRoute: `/shoes/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});

router.post('/addToCart', async (req, res) => {
  try {
    try {

      const newItem = await new Cart({
        title: req.params.title,
        body: req.params.body,
        price: req.params.price,
        discountPrice: req.params.discountPrice,
        img: req.params.img
      });

      await Cart.create(newItem);
      res.redirect('/cart');
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});



// function insertProductData () {
//   Product.insertMany([
//     {
//       title: "Adidas",
//       body: "Adidas-Predator-Freak.3-LL-TF-Football-Shoes",
//       img: "/images/Adidas-Predator-Freak.3-LL-TF-Football-Shoes.jpg",
//       discountPrice: 5499,
//       price: 6000
//     },
//     {
//       title: "Nike",
//       body: "Zoom-mercurial-vapor-15-academy-mg-multi-ground-football-boots",
//       img: "/images/zoom-mercurial-vapor-15-academy-mg-multi-ground-football-boots-tC05BT.png",
//       discountPrice: 5999,
//       price: 7500
//     },
//     {
//       title: "Nike",
//       body: "Phantom-gx-academy-high-top-football-shoes",
//       img: "/images/phantom-gx-academy-high-top-football-shoes-QCKHdl.png",
//       discountPrice: 4599,
//       price: 5500
//     },
//     {
//       title: "Adidas",
//       body: "Adidas-Predator-Freak.4-HF-Football-Shoes",
//       img: "/images/-original-imagf5zjrfj43fuy.webp",
//       discountPrice: 6999,
//       price: 8000
//     },
//     {
//       title: "Adidas",
//       body: "Adidas speed 0.4-HG-football shoes",
//       img: "/images/-original-imagqfwbbabxayap.webp",
//       discountPrice: 4500,
//       price: 6000
//     },
//     {
//       title: "Adidas",
//       body: "Phantom-gx-academy-high-top-football-shoes",
//       img: "/images/phantom-gx-academy-high-top-football-shoes-QCKHdl.png",
//       discountPrice: 4500,
//       price: 6000
//     },
//     {
//       title: "Adidas",
//       body: "X_Speedportal.3_Indoor_Boots_Green",
//       img: "/images/X_Speedportal.3_Indoor_Boots_Green_GW8464_22_model_1400x.jpg",
//       discountPrice: 5499,
//       price: 6000
//     },
//     {
//       title: "Nike",
//       body: "Nike-Air-red-original",
//       img: "/images/11045572-47-5-nike-red-original-imafpj9zkge5r6xh.webp",
//       discountPrice: 4999,
//       price: 6400
//     },
//     {
//       title: "Nike",
//       body: "Mercurial-superfly-9-academy-high-top-football-shoes",
//       img: "/images/mercurial-superfly-9-academy-high-top-football-shoes-6NvfmT.png",
//       discountPrice: 6499,
//       price: 8000
//     },
//     {
//       title: "Nike",
//       body: "Mercurial-vapor-15-club-low-top-football-shoes",
//       img: "/images/mercurial-vapor-15-club-low-top-football-shoes-KrwVSC.jpeg",
//       discountPrice: 6999,
//       price: 8500
//     },
//     {
//       title: "Adidas",
//       body: "Speed 0.3 HG-football shoes",
//       img: "/images/-original-imagq57a6bvzqkrz.webp",
//       discountPrice: 4499,
//       price: 6000
//     },
//     {
//       title: "Adidas",
//       body: "Adidas-x-speedportal-3-fg-football-shoes-pink-roses-and-purples",
//       img: "/images/adidas-x-speedportal-3-fg-m-gz5076-football-shoes-pink-roses-and-purples-2000x2000.jpeg",
//       discountPrice: 3999,
//       price: 5000
//     },

//   ])
// }

// insertProductData();

// function insertRecentData () {
//   Recent.insertMany([
//       {
//               title: "Adidas",
//               body: "Adidas-Predator-Freak.3-LL-TF-Football-Shoes",
//               img: "/images/Adidas-Predator-Freak.3-LL-TF-Football-Shoes.jpg",
//               discountPrice: 5499,
//               price: 6000
//             },
//             {
//               title: "Nike",
//               body: "Zoom-mercurial-vapor-15-academy-mg-multi-ground-football-boots",
//               img: "/images/zoom-mercurial-vapor-15-academy-mg-multi-ground-football-boots-tC05BT.png",
//               discountPrice: 5999,
//               price: 7500
//             },
//             {
//               title: "Nike",
//               body: "Phantom-gx-academy-high-top-football-shoes",
//               img: "/images/phantom-gx-academy-high-top-football-shoes-QCKHdl.png",
//               discountPrice: 4599,
//               price: 5500
//             },
//             {
//               title: "Adidas",
//               body: "Adidas-Predator-Freak.4-HF-Football-Shoes",
//               img: "/images/-original-imagf5zjrfj43fuy.webp",
//               discountPrice: 6999,
//               price: 8000
//             },
//   ])
// }

// insertRecentData();


// function insertFeaturedData () {
//   Featured.insertMany([
//     {
//       title: "Adidas",
//       body: "Adidas-Predator-Freak.4-HF-Football-Shoes",
//       img: "/images/-original-imagf5zjrfj43fuy.webp",
//       discountPrice: 6999,
//       price: 8000
//     },
//     {
//       title: "Adidas",
//       body: "Adidas speed 0.4-HG-football shoes",
//       img: "/images/-original-imagqfwbbabxayap.webp",
//       discountPrice: 4500,
//       price: 6000
//     },
//     {
//       title: "Adidas",
//       body: "Phantom-gx-academy-high-top-football-shoes",
//       img: "/images/phantom-gx-academy-high-top-football-shoes-QCKHdl.png",
//       discountPrice: 4500,
//       price: 6000
//     },
//     {
//       title: "Adidas",
//       body: "X_Speedportal.3_Indoor_Boots_Green",
//       img: "/images/X_Speedportal.3_Indoor_Boots_Green_GW8464_22_model_1400x.jpg",
//       discountPrice: 5499,
//       price: 6000
//     },
//     {
//       title: "Nike",
//       body: "Nike-Air-red-original",
//       img: "/images/11045572-47-5-nike-red-original-imafpj9zkge5r6xh.webp",
//       discountPrice: 4999,
//       price: 6400
//     },
//     {
//       title: "Nike",
//       body: "Mercurial-superfly-9-academy-high-top-football-shoes",
//       img: "/images/mercurial-superfly-9-academy-high-top-football-shoes-6NvfmT.png",
//       discountPrice: 6499,
//       price: 8000
//     },
//     {
//       title: "Nike",
//       body: "Mercurial-vapor-15-club-low-top-football-shoes",
//       img: "/images/mercurial-vapor-15-club-low-top-football-shoes-KrwVSC.jpeg",
//       discountPrice: 6999,
//       price: 8500
//     },
//     {
//       title: "Adidas",
//       body: "Speed 0.3 HG-football shoes",
//       img: "/images/-original-imagq57a6bvzqkrz.webp",
//       discountPrice: 4499,
//       price: 6000
//     },
//   ])
// }

// insertFeaturedData();


module.exports = router;