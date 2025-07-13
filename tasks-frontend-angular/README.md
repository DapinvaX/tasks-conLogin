# TasksFrontendAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno desde un archivo `.env` para configurar las URLs de la API.

### Configuración inicial

1. Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus configuraciones:
   ```env
   API_URL_LOCAL=http://localhost:4000/tareas
   API_URL=https://tu-api-url-de-produccion.com/tareas
   APP_ENVIRONMENT=development
   ```

### Cómo funciona

- Los archivos de entorno TypeScript (`environment.ts` y `environment.prod.ts`) se generan automáticamente desde el archivo `.env`
- Esto se hace mediante scripts de Node.js (`generate-env.js` y `generate-env-prod.js`)
- Los scripts se ejecutan automáticamente antes de `start` y `build`

### Comandos disponibles

```bash
# Desarrollo (genera environment.ts y sirve la app)
npm run start
# o alternativamente
npm run dev

# Producción (genera environment.prod.ts y construye)
npm run build
# o alternativamente  
npm run build:prod
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
