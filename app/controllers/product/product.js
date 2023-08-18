import { uid } from "uid";
import pool from "../../config/database.js";
import { err400, err500, succes200 } from "../../utils/statusList.js";

const getProducts = async(req, res) => {
    try {
        const [product] = await pool.query("SELECT * FROM products");
        return res.status(200).json(product);
    } catch (e) {
        res.status(400).json({
            msg: "Algo ha salido mal.",
            error: e,
        });
    }
};

const getProduct = async(req, res) => {
    const id = req.params.id;
    try {
        const [product] = await pool.query(
            "Select * from products where id = ?", [id]
        );
        return product.length > 0 ?
            res.status(200).json(product) :
            res.status(404).json({ msg: "No se ha encontrado el producto." });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Algo ha salido mal al obtener el producto" });
    }
};

const addProduct = async(req, res) => {
    try {
        const {
            name,
            description,
            idProductCategoryFK,
            idProductUnityFK,
            taxablePrice,
            taxExemptPrice,
            salePrice,
            images,
            status,
            elaborationDate,
            expirationDate,
        } = req.body;

        const productCode = `prod-${uid(5)}`;

        const [productAdded] = await pool.query(
            "INSERT INTO products (name, productCode, description, idProductCategoryFK, idProductUnityFK, taxablePrice, taxExemptPrice, salePrice, status, elaborationDate, expirationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                name,
                productCode,
                description,
                idProductCategoryFK,
                idProductUnityFK,
                taxablePrice,
                taxExemptPrice,
                salePrice,
                status,
                elaborationDate,
                expirationDate,
            ]
        );

        images.forEach(async(image) => {
            const [imageUploaded] = await pool.query(
                "INSERT INTO productImage (imageUrl) VALUES (?)", [image]
            );
            await pool.query(
                "INSERT INTO product_image (productId, imageId) VALUES (?, ?)", [productAdded.insertId, imageUploaded.insertId]
            );
        });
        return res
            .status(200)
            .json({ msg: "Producto agregado correctamente", ...productAdded });
        // return succes200(res, 'Producto agregado correctamente');
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Error al insertar el producto",
        });
    }
};

const addImages = async(idImage, idProduct) => {
    try {
        await pool.query(
            "INSERT INTO product_image (productId, imageId) VALUES (?, ?)", [idProduct, idImage]
        );
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async(req, res) => {

    try {
        const id = parseInt(req.params.id);
        const {
            name,
            description,
            idProductCategoryFK,
            idProductUnityFK,
            taxExemptPrice,
            taxablePrice,
            salePrice,
            status,
            elaborationDate,
            expirationDate,
        } = req.body;
        const [product] = await pool.query(
            "UPDATE products SET name = IFNULL(?, name), description = IFNULL(?, description), idProductCategoryFK = IFNULL(?, idProductCategoryFK), idProductUnityFK = IFNULL(?, idProductUnityFK), taxablePrice = IFNULL(?, taxablePrice), taxExemptPrice = IFNULL(?, taxExemptPrice), salePrice = IFNULL(?, salePrice), status = IFNULL(?, status), elaborationDate = IFNULL(?, elaborationDate), expirationDate = IFNULL(?, expirationDate) WHERE id = ?", [
                name,
                description,
                idProductCategoryFK,
                idProductUnityFK,
                taxablePrice,
                taxExemptPrice,
                salePrice,
                status,
                elaborationDate,
                expirationDate,
                id,
            ]
        );

 /*       const [imagesIds] = await pool.query("SELECT productId FROM product_image WHERE productId = ?", [id]);

        images.forEach(async(image, index) => {
            const [imageUploaded] = await pool.query(
                "Update productImage set imageUrl =  IFNULL (?, imageUrl) where id = ?", [image, imagesIds[index]]);
            await pool.query(
                "update product_image  = IFNULL (?, ?)", [productAdded.insertId, imageUploaded.insertId]
            );
        });*/

        const [updatedProduct] = await pool.query(
            "SELECT * FROM products WHERE ID=?", [id]
        );
        return product.affectedRows > 0 && updatedProduct.length > 0 ?
            res.status(200).json({
                msg: "Se ha modificado el producto correctamente.",
                ...updatedProduct,
            }) :
            res.status(404).json({
                msg: "No se ha encontrado el producto",
            });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            error: "No se ha podido modificar el producto.",
        });
    }
};

const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id;
        const [product] = await pool.query("DELETE FROM products WHERE id=?", [
            id,
        ]);
        product.affectedRows === 0 ?
            res.status(404).json({
                msg: "No se ha encontrado el producto",
            }) :
            res.status(204).json({
                msg: "El producto se eliminó correctamente",
            });
    } catch (e) {
        console.log({ error: e });
        return res.status(500).json({
            msg: "No se ha podido eliminar el producto",
            error: e,
        });
    }
};

const getProductByCategoryId = async(req, res) => {
    try {
        const id = req.params.id;
        const [product] = await pool.query(
            "SELECT * FROM products WHERE idProductCategoryFK = ?", [id]
        );
        return product.length > 0 ?
            res.status(200).json(product) :
            res
            .status(404)
            .json({ msg: "No se han encontrado los productos." });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Algo ha salido mal al obtener los productos" });
    }
};

const getProductByName = async(req, res) => {
    try {
        const name = req.params.name;
        const [product] = await pool.query(
            "SELECT * FROM products WHERE name like ?", [name]
        );
        return product.length > 0 ?
            res.status(200).json(product) :
            res
            .status(404)
            .json({ msg: "No se han encontrado los productos." });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Algo ha salido mal al obtener los productos" });
    }
};

const getProductByCategoryName = async(req, res) => {
    try {
        const name = req.params.name;
        const [product] = await pool.query(
            "SELECT * FROM products WHERE idProductCategoryFK = (SELECT id FROM productCategory WHERE name like ?)", [name]
        );
        return product.length > 0 ?
            res.status(200).json(product) :
            res
            .status(404)
            .json({ msg: "No se han encontrado los productos." });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Algo ha salido mal al obtener los productos" });
    }
};

export {
    getProducts,
    getProduct,
    getProductByName,
    getProductByCategoryId,
    getProductByCategoryName,
    addProduct,
    updateProduct,
    deleteProduct,
};