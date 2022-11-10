import { useEffect } from "react";
import { useState } from "react";
import EstadoDatos from "../../enums/EstadoDatos";
import CategoriasServicios from "../../servicios/CategoriasServicios";
const publicImgsURL = process.env.PUBLIC_URL+"/imgs/";

const MosaicoCategorias = () => {
    const [estado, setEstado] = useState(EstadoDatos.CARGANDO);
    const [categorias, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        setEstado(EstadoDatos.CARGANDO);
		try {
			const resultado = await CategoriasServicios.listarCategoriasHabilitadas();
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

    useEffect(()=> {
        cargarCategorias();
    }, [])

    return (
        <main id="catalogo" className="container-fluid">
            <div className="row mb-2">
				{
					estado===EstadoDatos.CARGANDO ? (<div>Cargando...</div>) 
				: 
					estado===EstadoDatos.VACIO ? (<div>No hay datos</div>) 
				:
					categorias.map((categoria) => (
						<div className="col-2">
                            <a href={"/?q="+categoria.nombre}>
                                <img src={publicImgsURL+categoria.imagen} alt="Ingrese imagen de carpeta pública" width="100%"/>
                            </a>
                        </div>
					))
				}
			</div>
        </main>
    )
}

export default MosaicoCategorias;