import axios from "axios";

//const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER;
const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER_PROD;
const saidasAPI = axios.create({ baseURL });

async function getSaidas() {
  try {
    const response = await saidasAPI.get("/saidas");
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function postSaidas(data: object) {
  try {
    await saidasAPI.post(`/saidas`, data)
  }catch(error) {
    throw error
  }
}

async function updateSaidas(id: string) {
  try {
    await saidasAPI.put(`/saidas/${id}`)
    //await getProdutos();
  }catch(error) {
    throw error
  }
}

async function deleteSaidas(id: string) {
  try {
    await saidasAPI.delete(`/saidas/${id}`)
    await getSaidas();
  }catch(error) {
    throw error
  }
}


export { getSaidas, postSaidas, updateSaidas, deleteSaidas };
