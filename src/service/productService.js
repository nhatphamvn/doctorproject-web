import productRepository from '../repositories/productRepositories'

//GET
const ApiGetProductById = async(id)=>{

    try {
        const data = await productRepository.getProductById(id)
        if(!data){
            return({
                EM:'Không có sản phẩm!',
                EC:1,
                DT:null
            });
        }
        return({
            EM:'Tìm kiếm sản phẩm thành công!',
            EC:0,
            DT:data
        })

    } catch (error) {
        return({
            EM:'Lỗi truy xuất sản phẩm!',
            EC:500,
            DT:null
        })
    }
}

const ApiGetAllProducts =async()=>{
    try {
        const data = await productRepository.getAllProducts();
        if(!data){
            return({
                EM:'Không có sản phẩm nào trong dữ liệu!',
                EC:1,
                DT:null
            });
        }
        return({
            EM:'Tìm kiếm thành công!',
            EC:0,
            DT:data
        })
    } catch (error) {
        return({
            EM:'Lỗi truy xuất dữ liệu!',
            EC:500,
            DT:null
        })
    }
    
}
//POST
const ApiCreateProduct = async (name, price, description, image) => {
  try {
    if (!name || !price || !description) {
      return {
        EM: "Thiếu dữ liệu đầu vào!",
        EC: 400,
        DT: null,
      };
    }

    const data = await productRepository.createProduct({ name, price, description, image });

    return {
      EM: "Bạn đã tạo thành công sản phẩm!",
      EC: 0,
      DT: data
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "Lỗi tạo sản phẩm!",
      EC: 500,
      DT: null,
    };
  }
};


//PUT
const ApiUpdateProduct = async (id, name, price, description,image) => {
    try {
  
        if (!id) {
            return {
                EM: "ID không hợp lệ",
                EC: 400,
                DT: null
            };
        }

        const data = await productRepository.updateProduct(id, { name, price, description,image });

        if (!data) {
            return {
                EM: "sản phẩm không được tìm thấy",
                EC: 1,
                DT: null
            };
        }

        return {
            EM: "Sửa đổi thành công sản phẩm",
            EC: 0,
            DT: data
        };
    } catch (error) {
        console.error("Error updating Product:", error);
        return {
            EM: "Lỗi chỉnh sửa sản phẩm",
            EC: 500,
            DT: null
        };
    }
};

const ApiDeleteProduct =async (id)=>{
    try {
        const deleted = await productRepository.deleteProduct(id)
        if(!deleted){
            return({
                EM:'Không tìm thấy sản phẩm!',
                EC:1,
                DT:null
            })
        }
        return({
            EM:'Đã xoá thành công sản phẩm',
            EC:0,
            DT:deleted
        })
    } catch (error) {
        return({
            EM:'Lỗi khi xoá sản phẩm!',
            EC:500,
            DT:null
        })
    }
//DELETE    
}

module.exports ={
    ApiUpdateProduct,ApiDeleteProduct,ApiGetAllProducts,ApiGetProductById,ApiCreateProduct
}