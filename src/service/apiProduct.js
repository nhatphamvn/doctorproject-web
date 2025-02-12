import axios from "../utils/axiosConfig";

const ApiGetProductById = (id) => {
  return axios.get(`api/v1/product/read/${id}`); // Truyền id trực tiếp vào URL
};

const ApiGetAllProduct = () => {
  return axios.get("api/v1/product/read-all-product");
};

const ApiCreateNewProduct = (name, price, description, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("price", price);
  data.append("description", description);
  data.append("image", image);

 return axios.post("api/v1/product/create-product", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
};

const ApiUpdateProduct = (id, name, price, description, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("price", price);
  data.append("description", description);
  data.append("image", image);

  return axios.put(`api/v1/product/update-product/${id}`, data);
};


const ApiDeleteProduct = (productId) => {
  return axios.delete(`api/v1/product/delete-product/${productId}`); // Truyền id vào URL
};

export {
  ApiGetProductById,
  ApiGetAllProduct,
  ApiCreateNewProduct,
  ApiUpdateProduct,
  ApiDeleteProduct,
};
