import axios from "axios";

const ProductosServicios = {}
const URL = "http://localhost:8080/api/productos/";
    
ProductosServicios.listarProductos = () => {
    return axios.get(URL);
}

ProductosServicios.listarProductosDisponibles = () => {
    return axios.get(URL+"?disp=true");
}

ProductosServicios.filtrarProductos = (criterio) => {
    return axios.get(URL+"?q="+criterio);
}

ProductosServicios.filtrarProductosDisponibles = (criterio) => {
    return axios.get(URL+"?q="+criterio+"&disp=true");
}

ProductosServicios.cargarProducto = (id) => {
    return axios.get(URL + id);
}

ProductosServicios.guardarProducto = (producto) => {
    return axios.post(URL, producto);
}

ProductosServicios.modificarProducto = (id, producto) => {
    return axios.put(URL + id, producto);
}

ProductosServicios.borrarProducto = (id) => {
    return axios.delete(URL + id);
}

export default ProductosServicios;