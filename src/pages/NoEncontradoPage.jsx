import { Link } from "react-router-dom";
import DisenoPagina from "../components/DisenoPagina.jsx";
export default function NoEncontradoPage({ favoritos }) {
  return <DisenoPagina totalFavoritos={favoritos.length}><section className="sin-resultados"><span>🍸</span><h2>404 · Página no encontrada</h2><p>La dirección que buscas no existe en nuestra coctelería.</p><Link className="boton-principal enlace-cta" to="/">Volver al inicio</Link></section></DisenoPagina>;
}
