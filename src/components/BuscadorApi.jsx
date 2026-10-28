export default function BuscadorApi({ valor, onCambiar, onBuscar, buscando }) {
  return (
    <form className="buscador-api" onSubmit={onBuscar}>
      <div>
        <p className="etiqueta">AMPLIA TU COLECCION</p>
        <h2>Descubre otros cocteles</h2>
        <p className="ayuda">Busca en TheCocktailDB y agrega los que quieras a tu catalogo.</p>
      </div>
      <div className="fila-api">
        <input value={valor} onChange={(e) => onCambiar(e.target.value)} placeholder="Ej. Cosmopolitan, Daiquiri..." aria-label="Buscar coctel en TheCocktailDB" />
        <button className="boton-principal" disabled={buscando || !valor.trim()}>{buscando ? "Buscando..." : "Buscar en la API"}</button>
      </div>
    </form>
  );
}