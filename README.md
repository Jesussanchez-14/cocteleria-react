# Coctelaria React

Aplicación frontend educativa para explorar cócteles, buscar recetas en TheCocktailDB, guardar favoritos y registrar creaciones propias.

## Requisitos
- Node.js y npm

## Ejecutar
```bash
npm install
npm run dev
```

Para comprobar la compilación:
```bash
npm run build
```

## API pública
TheCocktailDB: `https://www.thecocktaildb.com/api/json/v1/1`

## Vistas
- `/` Inicio
- `/cocteles` Catálogo y buscador de recetas
- `/favoritos` Cócteles favoritos
- `/mis-cocteles` Crear y eliminar recetas propias
- `/cocteles/:id` Detalle dinámico
- Cualquier otra dirección muestra la página 404

## Persistencia
Los favoritos, el tema visual y las creaciones propias se guardan en `localStorage`. No se utiliza backend ni base de datos.
