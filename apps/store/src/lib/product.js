import axios from 'axios';
export const getProduct = async (id) => {
     const response = await axios.get(`/api/product?id=${id}`);
     return response.data;
}
