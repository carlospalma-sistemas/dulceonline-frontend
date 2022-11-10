import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "./componentes/productos/Catalogo";
import ListaCategorias from "./componentes/categorias/ListaCategorias";
import ListaProductos from "./componentes/productos/ListaProductos";
import Header from "./componentes/general/Header";
import FormCategorias from "./componentes/categorias/FormCategorias";
import FormProductos from "./componentes/productos/FormProductos";
import Login from "./componentes/general/Login";
import MosaicoCategorias from "./componentes/categorias/MosaicoCategorias";
import Dashboard from "./componentes/general/Dashboard";
import { ContextoUsuario } from "./componentes/general/ContextoUsuario";
import { useState } from "react";

const App = () => {
  const [usuario, setUsuario] = useState({nombres: "", estadologin: 0});

  return (
    <>
      <BrowserRouter>
        <ContextoUsuario.Provider value={{usuario, setUsuario}}>
          <Header />
          <Routes>
            <Route path="/" element={<Catalogo />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/categorias-mosaico" element={<MosaicoCategorias />} exact />
            <Route path="/categorias" element={<ListaCategorias />} exact />
            <Route path="/categorias/form" element={<FormCategorias />} exact />
            <Route path="/categorias/form/:id" element={<FormCategorias />} exact />
            <Route path="/productos" element={<ListaProductos />} exact />
            <Route path="/productos/form" element={<FormProductos />} exact />
            <Route path="/productos/form/:id" element={<FormProductos />} exact />
          </Routes>
        </ContextoUsuario.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
