import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EstadoDatos from "../../enums/EstadoDatos";
import CategoriasServicios from "../../servicios/CategoriasServicios";
import ProductosServicios from "../../servicios/ProductosServicios";

const FormProductos = () => {
    const navigateTo = useNavigate();
    const { id } = useParams(); 
    const [ listaCategorias, setListaCategorias ] = useState([]);
    const [ estado, setEstado ] = useState(EstadoDatos.LISTO);
    
    const [ nombre, setNombre ] = useState("");
    const [ marca, setMarca ] = useState("");
    const [ precio, setPrecio ] = useState("");
    const [ categorias, setCategorias ] = useState([]);
    const [ imagen, setImagen ] = useState("");
    const [ disp, setDisp ] = useState(false);
    const publicImgsURL = process.env.PUBLIC_URL+"/imgs/";

    const cargarProducto = async() => {
        if (id!=null) {
            try {
                const respuesta = await ProductosServicios.cargarProducto(id);
                if (respuesta.data != null) {
                    setNombre(respuesta.data.nombre);
                    setMarca(respuesta.data.marca);
                    setPrecio(respuesta.data.precio);
                    setCategorias(respuesta.data.categorias);
                    setImagen(respuesta.data.imagen);
                    setDisp(respuesta.data.disp);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

	const cargarListaCategorias = async () => {
		setEstado(EstadoDatos.CARGANDO);
		try {
			const resultado = await CategoriasServicios.listarCategoriasHabilitadas();
			if (resultado.data.length === 0) {
				setEstado(EstadoDatos.VACIO);
			}
			else {
				setListaCategorias(resultado.data);
				setEstado(EstadoDatos.OK)
			}
		} catch (error) {
			setEstado(EstadoDatos.ERROR);
			console.log(error);
		}
	}

    const guardarProducto = async (event) => {
        event.preventDefault();
        if (categorias.length === 0) {
            throw new Error("No hay categorías disponibles");
        }
        const producto = {
            nombre: nombre,
            marca: marca,
            precio: precio,
            categorias: categorias,
            imagen: imagen,
            disp: disp
        }
        console.log(producto);
        try {
            if (id==null) {
                await ProductosServicios.guardarProducto(producto);
            }
            else {
                await ProductosServicios.modificarProducto(id, producto);
            }
            navigateTo("/productos");
        } catch (error) {
            console.log(error);
        }
    }

    const cambiarNombre = (event) => {
        setNombre(event.target.value);
    }

    const cambiarMarca = (event) => {
        setMarca(event.target.value);
    }

    const cambiarPrecio = (event) => {
        setPrecio(event.target.value);
    }

    const cambiarCategorias = (event) => {
        var options = Array.from(event.target.selectedOptions, option => option.value);
        setCategorias(options);
    }

    const cambiarImagen = (event) => {
        setImagen(event.target.value);
    }

    const cambiarDisp = (event) => {
        setDisp(event.target.checked);
    }

    useEffect(() => {
        cargarListaCategorias();
        cargarProducto();
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <h3>{id==null ? "Nuevo" : "Editar"} producto</h3>
                    <form onSubmit={guardarProducto}>
                        <div className="row mb-2">
                            <label className="form-control-sm col-3" htmlFor="nombre">Ingrese nombre</label>
                            <div className="col-9">
                                <input className="form-control form-control-sm" type="text" onChange={cambiarNombre} value={nombre} name="nombre" id="nombre" required/>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <label className="form-control-sm col-3" htmlFor="marca">Ingrese marca</label>
                            <div className="col-9">
                                <input className="form-control form-control-sm" type="text" onChange={cambiarMarca} value={marca} name="marca" id="marca" required/>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <label className="form-control-sm col-3" htmlFor="precio">Ingrese precio</label>
                            <div className="col-9">
                                <input className="form-control form-control-sm" type="number" onChange={cambiarPrecio} value={precio} name="precio" id="precio" required/>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <label className="form-control-sm col-3" htmlFor="categorias">Seleccione categorias<br/><p className="text-primary" style={{fontSize:"12px"}}>*Ctrl o Shift seleccione varias</p></label>
                            <div className="col-9">
                                { 
                                    estado === EstadoDatos.CARGANDO ? (<div>Cargando, por favor espere...</div>) :
                                    estado === EstadoDatos.VACIO ? (<div>No hay categorías habilitadas</div>) : (
                                        <select className="form-select form-select-sm" multiple={true} size="5" onChange={cambiarCategorias} value={categorias} name="categorias" id="categorias" required>
                                            {
                                                listaCategorias.map((categoria) => (
                                                    <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
                                                ))
                                            }
                                        </select>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row mb-2">
                            <label className="form-control-sm col-3" htmlFor="imagen">Ingrese imagen</label>
                            <div className="col-9">
                                <input className="form-control form-control-sm" type="text" onChange={cambiarImagen} value={imagen} name="imagen" id="imagen" required/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <input className="form-check-input mt-2 me-2" type="checkbox" onChange={cambiarDisp} checked={disp} name="disp" id="disp" />
                            <label className="form-control-sm col-3" htmlFor="disp">Disponible</label>
                        </div>
                        <div className="mb-2">
                            <button className="btn btn-sm btn-primary me-2" name="guardar" id="guardar">Guardar</button>
                            <a href="/Productos" className="btn btn-sm btn-light" name="guardar" id="guardar">Cancelar</a>
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

export default FormProductos;