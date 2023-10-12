import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER;
const produtosAPI = axios.create({ baseURL })

async function getProdutos() {
  try {
    const response = await produtosAPI.get("/produtos");
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getProdutoPorId(id: string) {
  try {
    const response = await produtosAPI.get(`/produtos/${id}`);
    return response.data;
  }catch(error) {
    throw error
  }
}

async function postProdutos(data: object) {
  try {
    await produtosAPI.post(`/produtos`, data)
  }catch(error) {
    throw error
  }
}

async function updateProdutos(id: string, data: object) {
  try {
    await produtosAPI.put(`/produtos/${id}`, data)
  }catch(error) {
    throw error
  }
}

async function deleteProdutos(id: string) {
  try {
    await produtosAPI.delete(`/produtos/${id}`)
    await getProdutos();
  }catch(error) {
    throw error
  }
}


export { getProdutos, postProdutos, updateProdutos, deleteProdutos, getProdutoPorId };
