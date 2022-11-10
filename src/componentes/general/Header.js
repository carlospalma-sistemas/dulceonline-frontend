import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-sm.png";
import EstadoLogin from "../../enums/EstadoLogin";
import { ContextoUsuario } from "./ContextoUsuario";

const Header = () => {
    const navigateTo = useNavigate();
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const revisarSesion = () => {
        if (sessionStorage.getItem("estadologin") != null) {
            const usuarioSesion = {
                nombres: sessionStorage.getItem("nombres"),
                estadologin: parseInt(sessionStorage.getItem("estadologin"))
            }
            console.log(usuarioSesion);
            setUsuario(usuarioSesion);
        }
        else {
            setUsuario({nombres: "", estadologin: EstadoLogin.NO_LOGUEADO});
        }
    }

    const cerrarSesion = () => {
        sessionStorage.clear();
        revisarSesion();
        navigateTo("/");
    }

    useEffect(() => {
        revisarSesion();
    }, [])

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary mb-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="logo" width="120" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    usuario.estadologin === EstadoLogin.NO_LOGUEADO ? (
                        <>
                            <div className="collapse navbar-collapse" id="menu">
                                <div className="navbar-nav" style={{ fontWeight: 700 }}>
                                    <a className="nav-link text-light" href="/categorias-mosaico">Categorías</a>
                                    <a className="nav-link text-light" href="/">Productos</a>
                                </div>
                            </div>
                            <div className="col-md-3 text-end">
                                <a href="/login" type="button" className="btn btn-sm btn-light me-2">Ingresar</a>
                                <button type="button" className="btn btn-sm btn-warning">Registro</button>
                            </div>
                        </>
                    ) :
                    usuario.estadologin === EstadoLogin.ADMIN ? (
                            <>
                                <div className="collapse navbar-collapse" id="menu">
                                    <div className="navbar-nav" style={{ fontWeight: 700 }}>
                                        <a className="nav-link text-light" href="/categorias">Categorías</a>
                                        <a className="nav-link text-light" href="/productos">Productos</a>
                                        <a className="nav-link text-light" href="/clientes">Clientes</a>
                                    </div>
                                </div>
                                <div className="col-md-4 text-end text-light">
                                    {usuario.nombres}
                                    <button onClick={cerrarSesion} type="button" className="btn btn-sm btn-warning ms-2">Cerrar sesion</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="collapse navbar-collapse" id="menu">
                                    <div className="navbar-nav" style={{ fontWeight: 700 }}>
                                        <a className="nav-link text-light" href="/categorias-mosaico">Categorías</a>
                                        <a className="nav-link text-light" href="/">Productos</a>
                                        <a className="nav-link text-light" href="/carrito">Carrito</a>
                                    </div>
                                </div>
                                <div className="col-md-4 text-end text-light">
                                    {usuario.nombres}
                                    <button onClick={cerrarSesion} type="button" className="btn btn-sm btn-warning">Cerrar sesion</button>
                                </div>
                            </>
                        )
                }
            </div>
        </nav>
    )
}

export default Header;