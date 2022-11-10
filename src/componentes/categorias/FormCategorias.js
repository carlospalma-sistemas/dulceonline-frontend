import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriasServicios from "../../servicios/CategoriasServicios";

const FormCategorias = () => {
    const navigateTo = useNavigate();
    const { id } = useParams(); 
    const [ nombre, setNombre ] = useState("");
    const [ imagen, setImagen ] = useState("");
    const [ hab, setHab ] = useState(false);
    const publicImgsURL = process.env.PUBLIC_URL+"/imgs/";

    const cargarCategoria = async() => {
        if (id!=null) {
            try {
                const respuesta = await CategoriasServicios.cargarCategoria(id);
                if (respuesta.data != null) {
                    setNombre(respuesta.data.nombre);
                    setImagen(respuesta.data.imagen);
                    setHab(respuesta.data.hab);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const guardarCategoria = async (event) => {
        event.preventDefault();
        const categoria = {
            nombre: nombre,
            imagen: imagen,
            hab: hab
        }
        console.log(categoria);
        try {
            if (id==null) {
                await CategoriasServicios.guardarCategoria(categoria);
            }
            else {
                await CategoriasServicios.modificarCategoria(id, categoria);
            }
            navigateTo("/categorias");
        } catch (error) {
            console.log(error);
        }
    }

    const cambiarNombre = (event) => {
        setNombre(event.target.value);
    }

    const cambiarImagen = (event) => {
        setImagen(event.target.value);
    }

    const cambiarHab = (event) => {
        setHab(event.target.checked);
    }

    useEffect(() => {
        cargarCategoria();
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <h3>{id==null ? "Nueva" : "Editar"} categoría</h3>
                    <form onSubmit={guardarCategoria}>
                        <div className="row mb-2">
                            <label className="form-control-sm col-3" htmlFor="nombre">Ingrese nombre</label>
                            <div className="col-9">
                                <input className="form-control form-control-sm" type="text" onChange={cambiarNombre} value={nombre} name="nombre" id="nombre" required/>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <label className="form-control-sm col-3" htmlFor="imagen">Ingrese imagen</label>
                            <div className="col-9">
                                <input className="form-control form-control-sm" type="text" onChange={cambiarImagen} value={imagen} name="imagen" id="imagen" required/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <input className="form-check-input mt-2 me-2" type="checkbox" onChange={cambiarHab} checked={hab} name="hab" id="hab" />
                            <label className="form-control-sm col-3" htmlFor="hab">Habilitado</label>
                        </div>
                        <div className="mb-2">
                            <button className="btn btn-sm btn-primary me-2" name="guardar" id="guardar">Guardar</button>
                            <a href="/categorias" className="btn btn-sm btn-light" name="guardar" id="guardar">Cancelar</a>
                        </div>
                    </form>
                </div>
                <div className="col-3">
                    <img src={publicImgsURL+imagen} alt="Ingrese imagen de carpeta pública" width="100%"/>                    
                </div>
            </div>
        </div>
    )
}

export default FormCategorias;