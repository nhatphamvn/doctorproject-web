import db from "../models"

const createProduct = async (ProductData)=>{
    return await db.Product.create(ProductData)
}

const getAllProducts = async () => {
    try {
        const Products = await db.Product.findAll();

        return Products;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        return null;
    }
};

const getProductById = async (id)=>{
    return await db.Product.findOne({where :{id}})
}

const updateProduct = async (id, newData) => {
    const [affectedRows] = await db.Product.update(newData, { where: { id } });

    if (affectedRows === 0) {
        return null; // Không có Product nào được cập nhật
    }

    // Trả về Product sau khi cập nhật
    return await db.Product.findOne({ where: { id } });
}


const deleteProduct = async (id)=>{
    return await db.Product.destroy({where:{id}})
}

module.exports ={
    createProduct,getAllProducts,getProductById,updateProduct,deleteProduct

}
