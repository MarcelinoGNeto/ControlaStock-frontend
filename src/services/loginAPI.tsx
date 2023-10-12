import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER;
const loginAPI = axios.create({ baseURL })

async function postLogin(dados: object,) {
  try {
    const { data } = await loginAPI.post(`/login`, dados)

    if(data){
      localStorage.setItem("email", data.email)
      localStorage.setItem("password", data.password)
      localStorage.setItem("token", data.token)

      return true
    }

    return

  }catch(error) {
    throw error
  }
}

function usuarioAutenticado() {
  return localStorage.getItem("token") != undefined ? true : false;
}

async function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("email")
  localStorage.removeItem("password")
}


export { postLogin, usuarioAutenticado, logout };
