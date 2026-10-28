import { useMemo, useState } from "react";
import DisenoPagina from "../components/DisenoPagina.jsx";
import Buscador from "../components/Buscador.jsx";
import BuscadorApi from "../components/BuscadorApi.jsx";
import ListaCocteles from "../components/ListaCocteles.jsx";
import DetalleCoctel from "../components/DetalleCoctel.jsx";
import useFetch from "../hooks/useFetch.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import useDebounce from "../hooks/useDebounce.js";
import { adaptarCoctel } from "../utils/adaptar.js";

const BASE = "https://www.thecocktaildb.com/api/json/v1/1";
const URLS_CLASICOS = ["Mojito", "Margarita", "Old Fashioned", "Daiquiri", "Negroni", "Dry Martini", "Whiskey Sour", "Manhattan", "Bloody Mary", "Pina Colada"].map((nombre) => `${BASE}/search.php?s=${encodeURIComponent(nombre)}`);

export default function CoctelesPage({ favoritos, setFavoritos }) {
  const { datos, cargando, error } = useFetch(URLS_CLASICOS);
  const [coctelesAgregados, setCoctelesAgregados] = useLocalStorage("coctelaria-catalogo-extra", []);
  const [busqueda, setBusqueda] = useState("");
  const [consultaApi, setConsultaApi] = useState("");
  const [resultadosApi, setResultadosApi] = useState([]);
  const [buscandoApi, setBuscandoApi] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const [detalle, setDetalle] = useState(null);
  const busquedaDebounced = useDebounce(busqueda, 400);

  const clasicos = useMemo(() => {
    const unicos = new Map();
    datos.forEach((drink) => { const item = adaptarCoctel(drink); unicos.set(item.id, item); });
    return [...unicos.values()];
  }, [datos]);
  const catalogo = useMemo(() => {
    const unicos = new Map();
    [...clasicos, ...coctelesAgregados].forEach((item) => unicos.set(item.id, item));
    return [...unicos.values()];
  }, [clasicos, coctelesAgregados]);
  const filtrados = useMemo(() => catalogo.filter((item) => item.nombre.toLowerCase().includes(busquedaDebounced.trim().toLowerCase())), [catalogo, busquedaDebounced]);

  const alternarFavorito = (id) => setFavoritos((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  async function buscarEnApi(evento) {
    evento.preventDefault();
    const termino = consultaApi.trim();
    if (!termino) return;
    setBuscandoApi(true); setErrorApi(""); setResultadosApi([]);
    try {
      const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(termino)}`);
      if (!res.ok) throw new Error("No se pudo consultar TheCocktailDB.");
      const json = await res.json();
      setResultadosApi((json.drinks || []).map(adaptarCoctel));
      if (!json.drinks) setErrorApi("No encontramos cocteles con ese nombre.");
    } catch (err) { setErrorApi(err.message); }
    finally { setBuscandoApi(false); }
  }

  function agregarAlCatalogo(coctel) {
    if (catalogo.some((item) => item.id === coctel.id)) { setErrorApi(`${coctel.nombre} ya esta en el catalogo.`); return; }
    setCoctelesAgregados((actuales) => [...actuales, coctel]);
    setErrorApi(`${coctel.nombre} se agrego al catalogo.`);
  }

  if (cargando) return <DisenoPagina totalFavoritos={favoritos.length} totalCocteles={0}><p className="estado-app">Preparando la barra... Cargando los clasicos.</p></DisenoPagina>;
  if (error) return <DisenoPagina totalFavoritos={favoritos.length}><p className="estado-app error">No pudimos conectar con TheCocktailDB: {error}</p></DisenoPagina>;

  return (
    <DisenoPagina totalFavoritos={favoritos.length} totalCocteles={catalogo.length}>
      <BuscadorApi valor={consultaApi} onCambiar={setConsultaApi} onBuscar={buscarEnApi} buscando={buscandoApi} />
      {errorApi && <p className="aviso">{errorApi}</p>}
      {resultadosApi.length > 0 && <section className="resultados-api"><div className="seccion-titulo"><h2>Resultados de TheCocktailDB</h2><button className="texto-boton" onClick={() => setResultadosApi([])}>Cerrar resultados ×</button></div><div className="lista-cocteles">{resultadosApi.map((item) => <article className="resultado-api" key={item.id}>{item.imagen && <img src={item.imagen} alt={item.nombre} />}<div><h3>{item.nombre}</h3><p>{item.categoria} · {item.tipo}</p><button className="boton-agregar" disabled={catalogo.some((x) => x.id === item.id)} onClick={() => agregarAlCatalogo(item)}>+ Agregar al catálogo</button></div></article>)}</div></section>}
      <section className="catalogo"><div className="seccion-titulo"><div><p className="etiqueta">TU COLECCION</p><h2>Catalogo de cocteles</h2></div><span className="contador">{catalogo.length} cocteles</span></div><div className="controles-catalogo"><Buscador valor={busqueda} onBuscar={setBusqueda} onLimpiar={() => setBusqueda("")} /></div><ListaCocteles cocteles={filtrados} favoritos={favoritos} onAlternarFavorito={alternarFavorito} onVerDetalle={setDetalle} /></section>
      <DetalleCoctel coctel={detalle} onCerrar={() => setDetalle(null)} />
    </DisenoPagina>
  );
}
