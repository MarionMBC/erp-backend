import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductByCategoryId, getProducts, updateProduct } from '../controllers/product/product.js';
import {
    getProductCategories,
    getProductCategory,
    updateProductCategory
} from "../controllers/product/productCategory.js";

import { getProductProvider, getProductProviders } from "../controllers/product/productProvider.js";

const router = express.Router();

const users = [
    {
        "id": 1,
        "nombre": "Goku",
        "genero": "M",
        "verificado": true,
        "edad": 20,
        "imagenPerfil": "profile-pics/goku.jpg",
        "imagenPortada": "cover-pics/goku.jpg",
        "ocupacion": "Guerrero Z",
        "ciudad": "Tegucigalpa",
        "intereses": ["Pelear", "Comer", "Genkidamas"],
        "matches": [7, 3],
        "likes": [2, 3, 4],
        "generoInteres": ["F"]
    },
    {
        "id": 2,
        "nombre": "Gohan",
        "genero": "M",
        "verificado": false,
        "edad": 20,
        "imagenPerfil": "profile-pics/gohan.jpg",
        "imagenPortada": "cover-pics/gohan.jpg",
        "ocupacion": "Guerrero Z",
        "ciudad": "Tegucigalpa",
        "intereses": ["Pelear", "Comer", "Genkidamas"],
        "matches": [],
        "likes": [1, 3],
        "generoInteres": ["F", "M"]
    },
    {
        "id": 3,
        "nombre": "Bulma",
        "genero": "F",
        "verificado": true,
        "edad": 20,
        "imagenPerfil": "profile-pics/bulma.jpg",
        "imagenPortada": "cover-pics/bulma.jpg",
        "ocupacion": "Científica",
        "ciudad": "Tegucigalpa",
        "intereses": ["Pelear", "Comer", "Genkidamas"],
        "matches": [1],
        "likes": [1, 2],
        "generoInteres": ["F", "M"]
    },
    {
        "id": 4,
        "nombre": "Videl",
        "genero": "F",
        "verificado": true,
        "edad": 20,
        "imagenPerfil": "profile-pics/videl.jpg",
        "imagenPortada": "cover-pics/videl.jpg",
        "ocupacion": "Guerrero Z",
        "ciudad": "Tegucigalpa",
        "intereses": ["Pelear", "Comer", "Genkidamas"],
        "matches": [5],
        "likes": [5],
        "generoInteres": ["M"]
    },
    {
        "id": 5,
        "nombre": "Naruto",
        "genero": "M",
        "verificado": false,
        "edad": 20,
        "imagenPerfil": "profile-pics/naruto.jpg",
        "imagenPortada": "cover-pics/naruto.jpg",
        "ocupacion": "Hokage",
        "ciudad": "Tegucigalpa",
        "intereses": ["Pelear", "Comer", "Genkidamas"],
        "matches": [4],
        "likes": [4],
        "generoInteres": ["F"]
    },
    {
        "id": 6,
        "nombre": "Hinata",
        "genero": "F",
        "verificado": false,
        "edad": 20,
        "imagenPerfil": "profile-pics/hinata.jpg",
        "imagenPortada": "cover-pics/hinata.jpg",
        "ocupacion": "Guerrera",
        "ciudad": "Tegucigalpa",
        "intereses": ["Hokagues", "Jutsus"],
        "matches": [5],
        "likes": [5, 7],
        "generoInteres": ["M"]
    },
    {
        "id": 7,
        "nombre": "Sasuke",
        "genero": "M",
        "verificado": false,
        "edad": 20,
        "imagenPerfil": "profile-pics/sasuke.jpg",
        "imagenPortada": "cover-pics/sasuke.jpg",
        "ocupacion": "Uchija",
        "ciudad": "Tegucigalpa",
        "intereses": ["Jutsus"],
        "matches": [4, 1],
        "likes": [4],
        "generoInteres": ["F"]
    }
]

router.get('/getProduct', getProducts);
router.get('/getProduct/:id', getProduct);
router.post('/addProduct', addProduct);
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/getProductByCategory/:id', getProductByCategoryId);


router.get('/getCategory', getProductCategories);
router.get('/getCategory/:id', getProductCategory);
router.post('/addCategory', () => { return null });
router.delete('/deleteCategory', () => { return null });

router.get('/getProductProviders', getProductProviders);
router.get('/getProductProvider/:id', getProductProvider)




router.get('/getProduct/:id/matches', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id);
    const matches = user.matches.map(match => users.find(user => user.id == match));

    res.json(matches);
})





router.patch('/updateProduct/:id', updateProduct);
router.patch('/updateCategory/:id', updateProductCategory);



export { router }


