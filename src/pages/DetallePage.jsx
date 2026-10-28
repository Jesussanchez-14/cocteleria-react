import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DisenoPagina from "../components/DisenoPagina.jsx";
import DetalleCoctel from "../components/DetalleCoctel.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { adaptarCoctel } from "../utils/adaptar.js";

export default function DetallePage({ favoritos }) {
  const { id } = useParams();
  const navegar = useNavigate();
  const [coctel, setCoctel] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [propios] = useLocalStorage("coctelaria-mis-cocteles", []);
  useEffect(() => {
    let cancelado = false;
    async function cargar() {
      setCargando(true); setError("");
      const propio = propios.find((item) => item.id === id);
      if (propio) { setCoctel(propio); setCargando(false); return; }
      try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Error al consultar la receta.");
        const json = await res.json();
        if (!json.drinks?.[0]) throw new Error("No encontramos ese coctel.");
        if (!cancelado) setCoctel(adaptarCoctel(json.drinks[0]));
      } catch (err) { if (!cancelado) setError(err.message); }
      finally { if (!cancelado) setCargando(false); }
    }
    cargar();
    return () => { cancelado = true; };
  }, [id, propios]);
  return <DisenoPagina totalFavoritos={favoritos.length}><section className="catalogo"><Link to="/cocteles">← Volver al catalogo</Link>{cargando ? <p className="estado-app">Cargando receta...</p> : error ? <p className="aviso">{error}</p> : <DetalleCoctel coctel={coctel} onCerrar={() => navegar("/cocteles")} />}</section></DisenoPagina>;
}
