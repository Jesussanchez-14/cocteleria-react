import { Link } from "react-router-dom";

export default function DetalleCoctel({ coctel, onCerrar }) {
  if (!coctel) return null;

  return (
    <div className="modal-fondo" role="presentation" onClick={onCerrar}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={`Receta de ${coctel.nombre}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
        <div className="detalle-grid">
          {coctel.imagen && <img className="detalle-imagen" src={coctel.imagen} alt={coctel.nombre} />}
          <div>
            <p className="etiqueta">RECETA DEL BAR</p>
            <h2>{coctel.nombre}</h2>
            <p className="detalle-meta">{coctel.categoria} · {coctel.tipo}</p>
            <p><strong>Vaso:</strong> {coctel.vaso || "No especificado"}</p>
            <h3>Ingredientes</h3>
            {coctel.ingredientes?.length ? (
              <ul>{coctel.ingredientes.map((item, i) => <li key={`${item.nombre}-${i}`}>{item.medida} {item.nombre}</li>)}</ul>
            ) : <p>Consulta la receta completa en la ficha de TheCocktailDB.</p>}
            <h3>Preparacion</h3>
            <p className="instrucciones">{coctel.instrucciones || "No hay instrucciones disponibles."}</p>
          </div>
        </div>
        <p className="atribucion">Datos e imagenes: TheCocktailDB.</p>
        <Link className="enlace-detalle" to={`/cocteles/${coctel.id}`}>Abrir pagina de detalle →</Link>
      </section>
    </div>
  );
}