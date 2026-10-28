export function adaptarCoctel(coctel) {
  const ingredientes = [];

  for (let i = 1; i <= 15; i += 1) {
    const ingrediente = coctel[`strIngredient${i}`]?.trim();
    const medida = coctel[`strMeasure${i}`]?.trim();

    if (ingrediente) {
      ingredientes.push({
        nombre: ingrediente,
        medida: medida || "",
      });
    }
  }

  return {
    id: String(coctel.idDrink),
    nombre: coctel.strDrink || "Cóctel sin nombre",
    categoria: coctel.strCategory || "Cóctel",
    tipo: coctel.strAlcoholic || "No especificado",
    vaso: coctel.strGlass || "No especificado",
    instrucciones: coctel.strInstructionsES || coctel.strInstructions || "No hay instrucciones disponibles.",
    imagen: coctel.strDrinkThumb || "",
    ingredientes,
    origen: coctel.strIBA || "Clásico internacional",
  };
}

export function adaptarResumen(coctel) {
  return {
    id: String(coctel.idDrink),
    nombre: coctel.strDrink || "Cóctel sin nombre",
    imagen: coctel.strDrinkThumb || "",
    categoria: coctel.strCategory || "Cóctel",
    tipo: coctel.strAlcoholic || "No especificado",
    vaso: coctel.strGlass || "No especificado",
    instrucciones: coctel.strInstructionsES || coctel.strInstructions || "",
    ingredientes: [],
    origen: coctel.strIBA || "Clásico internacional",
  };
}