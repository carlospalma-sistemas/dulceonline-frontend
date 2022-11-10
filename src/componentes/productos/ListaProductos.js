import { useEffect, useState } from "react";
import ProductosServicios from "../../servicios/ProductosServicios";
import EstadoDatos from "../../enums/EstadoDatos";

const ListaProductos = () => {
	const [productos, setProductos] = useState([]);
	const [estado, setEstado] = useState(EstadoDatos.LISTO);
	const [idProductoBorrar, setIdProductoBorrar] = useState("");
	const [nombreProductoBorrar, setNombreProductoBorrar] = useState("");
	const [criterio, setCriterio] = useState("");

	const cargarProductos = async() => {
		setEstado(EstadoDatos.CARGANDO);
		try {
			let resultado;
			if (criterio === "") {
				resultado = await ProductosServicios.listarProductos();
			} 
			else {
				resultado = await ProductosServicios.filtrarProductos(criterio);
			}
			if (resultado.data.length === 0) {
				setEstado(EstadoDatos.VACIO);
			}
			else {
				setProductos(resultado.data);
				setEstado(EstadoDatos.OK)
			}
		} catch (error) {
			setEstado(EstadoDatos.ERROR);
			console.log(error);
		}
	}

	const confirmarBorrado = (id, nombre) => {
		setIdProductoBorrar(id);
		setNombreProductoBorrar(nombre);
	}

	const borrarProducto = async () => {
		try {
			const resultado = await ProductosServicios.borrarProducto(idProductoBorrar);
			cargarProductos();
		} catch (error) {
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

	useEffect(()=>{
		cargarProductos();
	}, [])

	return (
		<div className="container">
			<h3>Lista de productos <a className="btn btn-sm btn-primary" href="/productos/form"><i className="bi bi-plus-square" /> Nuevo producto</a></h3>
			<form>
				<div className="d-flex">
					<input className="form-control form-control-sm" style={{maxWidth:"300px"}} onChange={cambiarCriterio} value={criterio} type="text" id="criterio" name="criterio" />
					<button onClick={buscarProductos} className="btn btn-sm btn-primary"><i className="bi bi-search" /></button>
				</div>
			</form>
			<table className="table table-sm">
				<thead>
					<tr>
						<th>Producto</th>
						<th>Marca</th>
						<th>Precio</th>
						<th>Categorías</th>
						<th>Disponible</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{
						estado === EstadoDatos.CARGANDO ? (
							<tr><td colSpan="4">Cargando...</td></tr>
						) :
							estado === EstadoDatos.VACIO ? (
								<tr><td colSpan="4">No hay datos</td></tr>
							) :
								estado === EstadoDatos.ERROR ? (
									<tr><td colSpan="4">Ocurrió un error, intente más tarde.</td></tr>
								) :
									productos.map((producto) => (
										<tr key={producto._id}>
											<td>{producto.nombre}</td>
											<td>{producto.marca}</td>
											<td>${producto.precio}</td>
											<td>{producto.categorias.toString().replace(/,/g , ", ")}</td>
											<td>{producto.disp ? "Si" : "No"}</td>
											<td>
												<a href={"/productos/form/" + producto._id} className="btn btn-sm btn-success me-1"><i className="bi bi-pencil" /> Editar</a>
												<button onClick={()=>confirmarBorrado(producto._id, producto.nombre)} className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#modalBorrar"><i className="bi bi-trash" /> Borrar</button>
											</td>
										</tr>
									))
					}
				</tbody>
			</table>

			<div className="modal fade" id="modalBorrar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">Borrar producto</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							Desea borrar el producto {nombreProductoBorrar}?
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
							<button onClick={borrarProducto} type="button" className="btn btn-danger" data-bs-dismiss="modal">Borrar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListaProductos;