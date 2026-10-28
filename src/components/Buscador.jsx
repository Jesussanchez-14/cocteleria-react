export default function Buscador({ valor, onBuscar, onLimpiar }) {
  return (
    <div className="buscador">
      <span className="buscador-icono">⌕</span>
      <input
        type="search"
        value={valor}
        onChange={(evento) => onBuscar(evento.target.value)}
        placeholder="Buscar en mi catalogo..."
        aria-label="Buscar coctel por nombre"
      />
      {valor && <button type="button" className="boton-limpiar" onClick={onLimpiar} aria-label="Limpiar busqueda">×</button>}
    </div>
  );
}