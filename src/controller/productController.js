import productService from '../service/productService';

const productReadById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ EM: "Missing product ID", EC: 400, DT: null });
        }

        const data = await productService.ApiGetProductById(id);

        if (!data || !data.DT) {
            return res.status(404).json({ EM: "Product not found", EC: 404, DT: null });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in productReadById:", error);
        return res.status(500).json({ EM: "Internal server error", EC: 500, DT: null });
    }
};

const productReadAll = async (req, res) => {
    try {
        const data = await productService.ApiGetAllProducts();

        if (!data || !data.DT || data.DT.length === 0) {
            return res.status(404).json({ EM: "No products found", EC: 404, DT: null });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in productReadAll:", error);
        return res.status(500).json({ EM: "Internal server error", EC: 500, DT: null });
    }
};

const productCreateNewDB = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ EM: "Missing required fields", EC: 400, DT: null });
        }

        const newProduct = await productService.ApiCreateProduct(name, price, description, image);

        if (!newProduct.DT) {
            return res.status(400).json({ EM: newProduct.EM, EC: newProduct.EC, DT: null });
        }

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error in productCreateNewDB:", error);
        return res.status(500).json({ EM: "Internal server error", EC: 500, DT: null });
    }
};

const productUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, image } = req.body;

        if (!id || !name || !price || !description) {
            return res.status(400).json({ EM: "Missing required fields", EC: 400, DT: null });
        }

        const updatedProduct = await productService.ApiUpdateProduct(id, name, price, description, image);

        if (updatedProduct.EC !== 0) {
            return res.status(400).json({ EM: updatedProduct.EM, EC: updatedProduct.EC, DT: null });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error in productUpdate:", error);
        return res.status(500).json({ EM: "Internal server error", EC: 500, DT: null });
    }
};

const productDelete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ EM: "Missing product ID", EC: 400, DT: null });
        }

        const deletedProduct = await productService.ApiDeleteProduct(id);

        if (!deletedProduct || !deletedProduct.DT) {
            return res.status(404).json({ EM: "Product not found", EC: 404, DT: null });
        }

        return res.status(200).json(deletedProduct);
    } catch (error) {
        console.error("Error in productDelete:", error);
        return res.status(500).json({ EM: "Internal server error", EC: 500, DT: null });
    }
};

module.exports = {
    productReadById,
    productReadAll,
    productCreateNewDB,
    productUpdate,
    productDelete
};
