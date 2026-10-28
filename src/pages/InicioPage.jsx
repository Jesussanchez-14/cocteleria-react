import { Link } from "react-router-dom";
import DisenoPagina from "../components/DisenoPagina.jsx";

export default function InicioPage({ favoritos, totalCocteles }) {
  return (
    <DisenoPagina totalFavoritos={favoritos.length} totalCocteles={totalCocteles}>
      <section className="hero">
        <p className="etiqueta">EL ARTE DE LA MIXOLOGÍA</p>
        <h2>Clásicos que nunca pasan de moda.</h2>
        <p>Explora recetas, descubre nuevos sabores y crea tu propia colección de bar.</p>
        <Link className="boton-principal enlace-cta" to="/cocteles">Explorar cócteles</Link>
      </section>
      <section className="bloque-inicio">
        <p className="etiqueta">TU ESPACIO DE MIXOLOGÍA</p>
        <h2>Descubre, guarda y crea.</h2>
        <p>Consulta recetas, guarda tus favoritas y añade tus propias creaciones a tu catálogo personal.</p>
        <div className="enlaces-inicio">
          <Link to="/favoritos">Ver mis favoritos →</Link>
          <Link to="/mis-cocteles">Crear un cóctel →</Link>
        </div>
      </section>
    </DisenoPagina>
  );
}
