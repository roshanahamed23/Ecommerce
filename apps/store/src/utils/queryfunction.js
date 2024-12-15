import axios from "axios"

export const productfetch = async({queryKey})=>{
    const [_key,{category}]=queryKey;
    const result = await axios.post('/api/product',{
        category,limit:6
    });
    return result.data;
}