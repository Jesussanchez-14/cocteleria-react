import TarjetaCoctel from "./TarjetaCoctel.jsx";

export default function ListaCocteles({ cocteles, favoritos, onAlternarFavorito, onVerDetalle }) {
  if (cocteles.length === 0) {
    return <div className="sin-resultados"><span>🍹</span><h3>Sin resultados</h3><p>Prueba con otro nombre o busca un coctel en TheCocktailDB.</p></div>;
  }

  return (
    <section className="lista-cocteles">
      {cocteles.map((coctel) => (
        <TarjetaCoctel
          key={coctel.id}
          coctel={coctel}
          esFavorito={favoritos.includes(coctel.id)}
          onAlternarFavorito={onAlternarFavorito}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </section>
  );
}