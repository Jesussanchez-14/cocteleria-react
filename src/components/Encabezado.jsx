export default function Encabezado({ titulo, totalFavoritos, totalCocteles }) {
  return (
    <header className="encabezado">
      <div className="marca">
        <div className="marca-icono">✦</div>
        <div>
          <p className="sobre-titulo">COCTELERIA · CULTURA · RECETAS</p>
          <h1>{titulo}</h1>
          <p className="subtitulo">Un catalogo para descubrir clasicos de bar</p>
        </div>
      </div>
      <div className="estadisticas">
        <div className="estadistica"><strong>{totalCocteles}</strong><span>En catalogo</span></div>
        <div className="estadistica"><strong>★ {totalFavoritos}</strong><span>Favoritos</span></div>
      </div>
    </header>
  );
}