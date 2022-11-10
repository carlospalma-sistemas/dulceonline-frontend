import axios from "axios";

const CategoriasServicios = {}
const URL = "http://localhost:8080/api/categorias/";
    
CategoriasServicios.listarCategorias = () => {
    return axios.get(URL);
}

CategoriasServicios.listarCategoriasHabilitadas = () => {
    return axios.get(URL + "?hab=true");
}

CategoriasServicios.cargarCategoria = (id) => {
    return axios.get(URL + id);
}

CategoriasServicios.guardarCategoria = (categoria) => {
    return axios.post(URL, categoria);
}

CategoriasServicios.modificarCategoria = (id, categoria) => {
    return axios.put(URL + id, categoria);
}

CategoriasServicios.borrarCategoria = (id) => {
    return axios.delete(URL + id);
}

export default CategoriasServicios;