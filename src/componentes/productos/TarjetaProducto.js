const TarjetaProducto = ({ producto }) => {
    return (
        <div className="col-3 mb-2">
            <div className="card">
                <h6 className="card-header text-primary">{producto.nombre}</h6>
                <div className="card-body row">
                    <img src="" alt="producto" />
                    <h4 className="card-text">${producto.precio}</h4>
                    <p className="mb-auto" style={{fontSize:"12px"}}>Categorías:<br/>{producto.categorias.toString()}</p>
                    <button className="btn btn-primary">Añadir a carrito</button>
                </div>
            </div>
        </div>
    )
}

export default TarjetaProducto;