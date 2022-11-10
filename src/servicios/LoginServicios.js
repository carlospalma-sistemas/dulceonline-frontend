import axios from "axios";

const LoginServicios = {}
const URL = "http://localhost:8080/api/login/";
    
LoginServicios.login = (credenciales) => {
    return axios.post(URL, credenciales);
}

export default LoginServicios;