
import { useState } from "react";
import DisenoPagina from "../components/DisenoPagina.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";

const formularioInicial = {
  nombre: "",
  categoria: "Creación propia",
  tipo: "Sin alcohol",
  vaso: "",
  instrucciones: "",
  ingredientesTexto: "",
};

export default function MisCoctelesPage({ favoritos }) {
  const [cocteles, setCocteles] = useLocalStorage(
    "coctelaria-mis-cocteles",
    []
  );

  const [formulario, setFormulario] = useState(formularioInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  }

  function guardarCoctel(evento) {
    evento.preventDefault();

    const ingredientes = formulario.ingredientesTexto
      .split(",")
      .map((nombre) => nombre.trim())
      .filter(Boolean);

    if (!formulario.nombre.trim()) {
      setMensaje("Escribe el nombre del cóctel.");
      return;
    }

    if (ingredientes.length === 0) {
      setMensaje("Agrega al menos un ingrediente.");
      return;
    }

    if (!formulario.instrucciones.trim()) {
      setMensaje("Escribe la preparación del cóctel.");
      return;
    }

    const datosCoctel = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria,
      tipo: formulario.tipo,
      vaso: formulario.vaso.trim(),
      instrucciones: formulario.instrucciones.trim(),
      imagen: "",
      ingredientes: ingredientes.map((nombre) => ({
        nombre,
        medida: "",
      })),
    };

    if (editandoId) {
      setCocteles((actuales) =>
        actuales.map((item) =>
          item.id === editandoId
            ? { ...item, ...datosCoctel }
            : item
        )
      );

      setMensaje("¡Cóctel actualizado correctamente!");
      setEditandoId(null);
    } else {
      const nuevo = {
        id: `propio-${Date.now()}`,
        ...datosCoctel,
      };

      setCocteles((actuales) => [...actuales, nuevo]);
      setMensaje("¡Tu cóctel se guardó correctamente!");
    }

    setFormulario(formularioInicial);
  }

  function editarCoctel(item) {
    setEditandoId(item.id);

    setFormulario({
      nombre: item.nombre || "",
      categoria: item.categoria || "Creación propia",
      tipo: item.tipo || "Sin alcohol",
      vaso: item.vaso || "",
      instrucciones: item.instrucciones || "",
      ingredientesTexto: (item.ingredientes || [])
        .map((ingrediente) => ingrediente.nombre)
        .join(", "),
    });

    setMensaje("Estás editando este cóctel.");
  }

  function eliminarCoctel(id) {
    setCocteles((actuales) =>
      actuales.filter((item) => item.id !== id)
    );

    if (editandoId === id) {
      cancelarEdicion();
    }

    setMensaje("Cóctel eliminado.");
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setFormulario(formularioInicial);
    setMensaje("");
  }

  return (
    <DisenoPagina
      totalFavoritos={favoritos.length}
      totalCocteles={cocteles.length}
    >
      <section className="catalogo">
        <p className="etiqueta">TU CREATIVIDAD</p>
        <h2>Mis creaciones</h2>

        <p className="ayuda">
          Registra y administra tus propias recetas.
          Se guardarán en este navegador.
        </p>

        <form className="form-coctel" onSubmit={guardarCoctel}>
          <label>
            Nombre del cóctel
            <input
              name="nombre"
              value={formulario.nombre}
              onChange={cambiarCampo}
              required
              maxLength="60"
              placeholder="Ej. Atardecer tropical"
            />
          </label>

          <label>
            Categoría
            <input
              name="categoria"
              value={formulario.categoria}
              onChange={cambiarCampo}
            />
          </label>

          <label>
            Tipo
            <select
              name="tipo"
              value={formulario.tipo}
              onChange={cambiarCampo}
            >
              <option>Sin alcohol</option>
              <option>Alcohólico</option>
              <option>Opcionalmente alcohólico</option>
            </select>
          </label>

          <label>
            Vaso
            <input
              name="vaso"
              value={formulario.vaso}
              onChange={cambiarCampo}
              placeholder="Ej. Copa alta"
            />
          </label>

          <label className="campo-ancho">
            Ingredientes separados por coma
            <input
              name="ingredientesTexto"
              value={formulario.ingredientesTexto}
              onChange={cambiarCampo}
              placeholder="Jugo de piña, limón, hielo"
              required
            />
          </label>

          <label className="campo-ancho">
            Preparación
            <textarea
              name="instrucciones"
              value={formulario.instrucciones}
              onChange={cambiarCampo}
              rows="3"
              placeholder="Describe cómo prepararlo..."
              required
            />
          </label>

          <button className="boton-principal" type="submit">
            {editandoId ? "Actualizar cóctel" : "Guardar cóctel"}
          </button>

          {editandoId && (
            <button
              type="button"
              className="boton-eliminar"
              onClick={cancelarEdicion}
            >
              Cancelar edición
            </button>
          )}
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <div className="mis-cocteles-lista">
          {cocteles.length === 0 ? (
            <p className="sin-resultados">
              Todavía no has creado cócteles.
            </p>
          ) : (
            cocteles.map((item) => (
              <article className="mi-coctel" key={item.id}>
                <div>
                  <h3>{item.nombre}</h3>
                  <p>
                    {item.categoria} · {item.tipo}
                  </p>
                </div>

                <button
                  type="button"
                  className="boton-principal"
                  onClick={() => editarCoctel(item)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="boton-eliminar"
                  onClick={() => eliminarCoctel(item.id)}
                >
                  Eliminar
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </DisenoPagina>
  );
}
