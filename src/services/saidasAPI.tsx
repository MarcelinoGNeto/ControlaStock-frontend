import axios from "axios";

const saidasAPI = axios.create({baseURL: "http://localhost:3000"})

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
