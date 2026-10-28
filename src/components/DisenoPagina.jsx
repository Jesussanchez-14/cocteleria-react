import Encabezado from "./Encabezado.jsx";
import Navbar from "./Navbar.jsx";
import { useTema } from "../context/TemaContext.jsx";

export default function DisenoPagina({ children, totalFavoritos = 0, totalCocteles = 0 }) {
  const { tema } = useTema();
  return (
    <main className={`app-shell tema-${tema}`}>
      <Encabezado titulo="Coctelaria" totalFavoritos={totalFavoritos} totalCocteles={totalCocteles} />
      <Navbar />
      {children}
      <footer>Coctelaria · Proyecto React · Juan De Jesus Sanchez Santana</footer>
    </main>
  );
}
