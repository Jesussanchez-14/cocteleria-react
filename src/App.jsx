import { BrowserRouter, Route, Routes } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { TemaProvider } from "./context/TemaContext.jsx";
import InicioPage from "./pages/InicioPage.jsx";
import CoctelesPage from "./pages/CoctelesPage.jsx";
import FavoritosPage from "./pages/FavoritosPage.jsx";
import MisCoctelesPage from "./pages/MisCoctelesPage.jsx";
import DetallePage from "./pages/DetallePage.jsx";
import NoEncontradoPage from "./pages/NoEncontradoPage.jsx";

function Aplicacion() {
  const [favoritos, setFavoritos] = useLocalStorage("coctelaria-favoritos", []);
  return <Routes>
    <Route path="/" element={<InicioPage favoritos={favoritos} totalCocteles={0} />} />
    <Route path="/cocteles" element={<CoctelesPage favoritos={favoritos} setFavoritos={setFavoritos} />} />
    <Route path="/favoritos" element={<FavoritosPage favoritos={favoritos} setFavoritos={setFavoritos} />} />
    <Route path="/mis-cocteles" element={<MisCoctelesPage favoritos={favoritos} />} />
    <Route path="/cocteles/:id" element={<DetallePage favoritos={favoritos} />} />
    <Route path="*" element={<NoEncontradoPage favoritos={favoritos} />} />
  </Routes>;
}

export default function App() {
  return <BrowserRouter><TemaProvider><Aplicacion /></TemaProvider></BrowserRouter>;
}
