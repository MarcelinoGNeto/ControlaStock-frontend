import axios from "axios";

const produtosAPI = axios.create({baseURL: "http://localhost:3000"})

async function getProdutos(): Promise<any> {
  try {
    const response = await produtosAPI.get("/produtos");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getProdutos };
