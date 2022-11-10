import { useEffect, useState } from "react";
import CategoriasServicios from "../../servicios/CategoriasServicios";
import EstadoDatos from "../../enums/EstadoDatos";

const ListaCategorias = () => {
	const [categorias, setCategorias] = useState([]);
	const [estado, setEstado] = useState(EstadoDatos.LISTO);
	const [idCategoriaBorrar, setIdCategoriaBorrar] = useState("");
	const [nombreCategoriaBorrar, setNombreCategoriaBorrar] = useState("");

	const cargarCategorias = async () => {
		setEstado(EstadoDatos.CARGANDO);
		try {
			const resultado = await CategoriasServicios.listarCategorias();
			if (resultado.data.length === 0) {
				setEstado(EstadoDatos.VACIO);
			}
			else {
				setCategorias(resultado.data);
				setEstado(EstadoDatos.OK)
			}
		} catch (error) {
			setEstado(EstadoDatos.ERROR);
			console.log(error);
		}
	}

	const confirmarBorrado = (id, nombre) => {
		setIdCategoriaBorrar(id);
		setNombreCategoriaBorrar(nombre);
	}

	const borrarCategoria = async () => {
		try {
			const resultado = await CategoriasServicios.borrarCategoria(idCategoriaBorrar);
			cargarCategorias();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		cargarCategorias();
	}, []);

	return (
		<div className="container">
			<h3>Lista de categorías <a className="btn btn-sm btn-primary" href="/categorias/form"><i className="bi bi-plus-square" /> Nueva categoría</a></h3>
			<table className="table table-sm">
				<thead>
					<tr>
						<th>Categoría</th>
						<th>Imagen</th>
						<th>Habilitado</th>
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
									categorias.map((categoria) => (
										<tr key={categoria._id}>
											<td>{categoria.nombre}</td>
											<td>{categoria.imagen}</td>
											<td>{categoria.hab ? "Si" : "No"}</td>
											<td>
												<a href={"/categorias/form/" + categoria._id} className="btn btn-sm btn-success me-1"><i className="bi bi-pencil" /> Editar</a>
												<button onClick={()=>confirmarBorrado(categoria._id, categoria.nombre)} className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#modalBorrar"><i className="bi bi-trash" /> Borrar</button>
											</td>
										</tr>
									))
					}
				</tbody>
			</table>

			<div class="modal fade" id="modalBorrar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="staticBackdropLabel">Borrar categoría</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							Desea borrar la categoría {nombreCategoriaBorrar}?
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
							<button onClick={borrarCategoria} type="button" class="btn btn-danger" data-bs-dismiss="modal">Borrar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListaCategorias;