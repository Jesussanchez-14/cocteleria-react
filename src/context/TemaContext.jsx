import { createContext, useContext, useMemo, useState } from "react";

const TemaContext = createContext(null);

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => localStorage.getItem("coctelaria-tema") || "claro");

  function alternarTema() {
    setTema((actual) => {
      const nuevo = actual === "claro" ? "oscuro" : "claro";
      localStorage.setItem("coctelaria-tema", nuevo);
      return nuevo;
    });
  }

  const valor = useMemo(() => ({ tema, alternarTema }), [tema]);
  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

export function useTema() {
  const contexto = useContext(TemaContext);
  if (!contexto) throw new Error("useTema debe utilizarse dentro de TemaProvider");
  return contexto;
}
