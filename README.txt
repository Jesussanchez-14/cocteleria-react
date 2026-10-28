COCTELARIA - PROYECTO REACT

REQUISITOS
- Node.js instalado
- Conexión a internet para consultar TheCocktailDB

INSTALACIÓN
1. Descomprime el ZIP.
2. Abre la carpeta coctelaria-react en Visual Studio Code.
3. Abre Terminal > Nueva terminal.
4. Ejecuta: npm install
5. Ejecuta: npm run dev
6. Abre la dirección local indicada por Vite.

FUNCIONES
- Catálogo inicial con 10 cócteles clásicos consultados a TheCocktailDB.
- Buscador local con debounce de 400 ms.
- Favoritos guardados en localStorage.
- Búsqueda de cócteles adicionales en TheCocktailDB.
- Botón para añadir resultados al catálogo.
- Vista de detalle con ingredientes, medidas, vaso e instrucciones.
- Estados de carga, error y sin resultados.

NOTAS
- Se usa la clave pública de prueba "1" de TheCocktailDB, apropiada para aprendizaje.
- La API no ofrece un endpoint gratuito para crear cócteles en su base de datos.
  "Agregar al catálogo" añade el resultado a la colección local de esta aplicación.
- Los cócteles añadidos localmente se mantienen en localStorage en este proyecto.
- Este proyecto es una demostración educativa de recetas. Consume bebidas alcohólicas
  solo si eres mayor de edad y de forma responsable.

ESTRUCTURA DIDÁCTICA
- componentes: encabezado, tarjetas, lista y buscador
- hooks: useFetch, useLocalStorage y useDebounce
- utils: adaptar los datos originales de la API al modelo de la aplicación
