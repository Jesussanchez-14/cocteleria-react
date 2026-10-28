import { memo } from "react";

function TarjetaCoctel({ coctel, esFavorito, onAlternarFavorito, onVerDetalle }) {
  return (
    <article className="tarjeta">
      <button
        className={`boton-favorito ${esFavorito ? "seleccionado" : ""}`}
        onClick={() => onAlternarFavorito(coctel.id)}
        aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {esFavorito ? "★" : "☆"}
      </button>
      <button className="imagen-coctel" onClick={() => onVerDetalle(coctel)} aria-label={`Ver receta de ${coctel.nombre}`}>
        {coctel.imagen ? <img src={coctel.imagen} alt={coctel.nombre} loading="lazy" /> : <span>🍸</span>}
      </button>
      <div className="tarjeta-info">
        <p className="tarjeta-categoria">{coctel.categoria || "Cóctel clásico"}</p>
        <h3>{coctel.nombre}</h3>
        <p>{coctel.tipo || "Receta de bar"}</p>
        <button className="enlace-detalle" onClick={() => onVerDetalle(coctel)}>Ver receta →</button>
      </div>
    </article>
  );
}

export default memo(TarjetaCoctel);