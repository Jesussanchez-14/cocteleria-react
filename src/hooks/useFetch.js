import { useEffect, useState } from "react";

export default function useFetch(urls) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function obtenerDatos() {
      setCargando(true);
      setError("");

      try {
        const listaUrls = Array.isArray(urls) ? urls : [urls];
        const respuestas = await Promise.all(
          listaUrls.map(async (url) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error de red");
            return res.json();
          })
        );

        const cocteles = respuestas.flatMap((respuesta) => respuesta.drinks || []);
        if (!cancelado) setDatos(cocteles);
      } catch (err) {
        if (!cancelado) setError(err.message || "No se pudieron cargar los cocteles.");
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    obtenerDatos();

    return () => {
      cancelado = true;
    };
  }, [urls]);

  return { datos, cargando, error };
}