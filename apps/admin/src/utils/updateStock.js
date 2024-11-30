import axios from 'axios';
export const updateStock = async ({ id, stock }) => {
  const result = await axios.put('/api/inventory', { product_id: id, stock });
  return result.data;
};
