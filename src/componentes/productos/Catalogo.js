import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import EstadoDatos from "../../enums/EstadoDatos";
import ProductosServicios from "../../servicios/ProductosServicios";
import TarjetaProducto from "./TarjetaProducto";

const Catalogo = () => {
	const query = useLocation();
	const [estado, setEstado] = useState(EstadoDatos.LISTO);
	const [productos, setProductos] = useState([]);
	const [criterio, setCriterio] = useState("");

	const cargarProductos = async (categoria="") => {
		setEstado(EstadoDatos.CARGANDO);
		try {
			let resultado;
			if (criterio !== "") {
				resultado = await ProductosServicios.filtrarProductosDisponibles(criterio);
			}
			else if (categoria !== "") {
				resultado = await ProductosServicios.filtrarProductosDisponibles(categoria);
			}
			else {
				resultado = await ProductosServicios.listarProductosDisponibles();
			}
			if (resultado.data.length === 0) {
				setEstado(EstadoDatos.VACIO);
			}
			else {
				setProductos(resultado.data);
				console.log(resultado.data);
				setEstado(EstadoDatos.LISTO);
			}
		} catch (error) {
			setEstado(EstadoDatos.ERROR);
			console.log(error);
		}
	}

	const cambiarCriterio = (event) => {
		setCriterio(event.target.value);
	}

	const buscarProductos = (event) => {
		event.preventDefault();
		cargarProductos();
	}

	useEffect(() => {
		const catBuscar = query.search.replace("?q=", "");
		cargarProductos(catBuscar);
	}, [])

	return (
		<main id="catalogo" className="container-fluid">
			<form className="mb-2">
				<div className="d-flex">
					<label className="form-label me-2" htmlFor="criterio">Buscar producto</label> 
					<input className="form-control form-control-sm" style={{maxWidth:"300px"}} onChange={cambiarCriterio} value={criterio} type="text" id="criterio" name="criterio" />
					<button onClick={buscarProductos} className="btn btn-sm btn-primary"><i className="bi bi-search" /></button>
				</div>
			</form>
			<div className="row mb-2">
				{
					estado===EstadoDatos.CARGANDO ? (<div>Cargando...</div>) 
				: 
					estado===EstadoDatos.VACIO ? (<div>No hay datos</div>) 
				:
					productos.map((producto) => (
						(<TarjetaProducto key={producto._id} producto={producto}/>)
					))
				}
			</div>
		</main>
	);
}

export default Catalogo;