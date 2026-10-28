import { useEffect, useState } from "react";

export default function useDebounce(valor, demora = 400) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorDebounced(valor);
    }, demora);

    return () => clearTimeout(temporizador);
  }, [valor, demora]);

  return valorDebounced;
}