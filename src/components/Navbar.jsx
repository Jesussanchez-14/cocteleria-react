import { NavLink } from "react-router-dom";
import { useTema } from "../context/TemaContext.jsx";

export default function Navbar() {
  const { tema, alternarTema } = useTema();
  const claseActiva = ({ isActive }) => isActive ? "nav-enlace activo" : "nav-enlace";

  return (
    <nav className="navbar" aria-label="Navegacion principal">
      <div className="navbar-enlaces">
        <NavLink to="/" end className={claseActiva}>Inicio</NavLink>
        <NavLink to="/cocteles" className={claseActiva}>Cocteles</NavLink>
        <NavLink to="/favoritos" className={claseActiva}>Favoritos</NavLink>
        <NavLink to="/mis-cocteles" className={claseActiva}>Mis creaciones</NavLink>
      </div>
      <button type="button" className="boton-tema" onClick={alternarTema}>
        {tema === "claro" ? "☾ Tema oscuro" : "☀ Tema claro"}
      </button>
    </nav>
  );
}
