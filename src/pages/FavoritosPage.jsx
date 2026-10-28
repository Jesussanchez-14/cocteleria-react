import { useMemo, useState } from "react";
import DisenoPagina from "../components/DisenoPagina.jsx";
import Buscador from "../components/Buscador.jsx";
import ListaCocteles from "../components/ListaCocteles.jsx";
import DetalleCoctel from "../components/DetalleCoctel.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";
import useFetch from "../hooks/useFetch.js";
import { adaptarCoctel } from "../utils/adaptar.js";

const URLS = ["Mojito", "Margarita", "Old Fashioned", "Daiquiri", "Negroni", "Dry Martini", "Whiskey Sour", "Manhattan", "Bloody Mary", "Pina Colada"].map((n) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(n)}`);
export default function FavoritosPage({ favoritos, setFavoritos }) {
  const { datos, cargando, error } = useFetch(URLS);
  const [extras] = useLocalStorage("coctelaria-catalogo-extra", []);
  const [busqueda, setBusqueda] = useState("");
  const [detalle, setDetalle] = useState(null);
  const catalogo = useMemo(() => [...datos.map(adaptarCoctel), ...extras], [datos, extras]);
  const lista = useMemo(() => catalogo.filter((c) => favoritos.includes(c.id) && c.nombre.toLowerCase().includes(busqueda.toLowerCase())), [catalogo, favoritos, busqueda]);
  const alternar = (id) => setFavoritos((prev) => prev.filter((x) => x !== id));
  return <DisenoPagina totalFavoritos={favoritos.length} totalCocteles={catalogo.length}><section className="catalogo"><div className="seccion-titulo"><div><p className="etiqueta">TU SELECCIÓN</p><h2>Mis favoritos</h2></div></div><Buscador valor={busqueda} onBuscar={setBusqueda} onLimpiar={() => setBusqueda("")} />{cargando ? <p className="estado-app">Cargando favoritos...</p> : error ? <p className="aviso">No se pudieron cargar los favoritos: {error}</p> : <ListaCocteles cocteles={lista} favoritos={favoritos} onAlternarFavorito={alternar} onVerDetalle={setDetalle} />}</section><DetalleCoctel coctel={detalle} onCerrar={() => setDetalle(null)} /></DisenoPagina>;
}
