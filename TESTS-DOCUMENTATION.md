# Tests Unitarios - Proyecto Tasks con Login

Este documento describe los tests unitarios implementados para el proyecto de gestión de tareas con autenticación.

## Backend (NestJS)

### Tests Implementados

#### 1. AuthService Tests (`src/auth/auth.service.spec.ts`)
- **register()**: Prueba el registro de usuarios, validación de duplicados y hash de contraseñas
- **validateUser()**: Verificación de credenciales y comparación de contraseñas
- **login()**: Generación de tokens JWT y respuesta de autenticación
- **forgotPassword()**: Búsqueda de usuarios y retorno de preguntas de seguridad
- **verifySecurityAnswer()**: Validación de respuestas de seguridad
- **resetPassword()**: Actualización segura de contraseñas

#### 2. TareasService Tests (`src/tareas/tareas.service.spec.ts`)
- **create()**: Creación de tareas con validación de usuario
- **findAll()**: Listado de tareas filtrado por usuario
- **findOne()**: Búsqueda de tarea específica con autorización
- **update()**: Actualización de tareas con validación de permisos
- **remove()**: Eliminación de tareas con verificación de propiedad

#### 3. AuthController Tests (`src/auth/auth.controller.spec.ts`)
- **register**: Endpoint de registro con manejo de errores
- **login**: Endpoint de login con validación de credenciales
- **getProfile**: Obtención de perfil de usuario autenticado
- **forgotPassword**: Recuperación de contraseña
- **verifySecurityAnswer**: Verificación de respuestas de seguridad
- **resetPassword**: Restablecimiento de contraseña

#### 4. TareasController Tests (`src/tareas/tareas.controller.spec.ts`)
- **create**: Creación de tareas con autenticación
- **findAll**: Listado de tareas del usuario autenticado
- **findOne**: Obtención de tarea específica
- **update**: Actualización de tareas
- **remove**: Eliminación de tareas

### Ejecutar Tests del Backend

```bash
cd tasks-backend-nestjs

# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:cov

# Ejecutar tests e2e
npm run test:e2e
```

## Frontend (Angular)

### Tests Implementados

#### 1. AuthService Tests (`src/app/services/auth.service.spec.ts`)
- **register()**: Registro de usuarios con almacenamiento de tokens
- **login()**: Autenticación con manejo de localStorage
- **logout()**: Limpieza de datos de autenticación
- **getToken()**: Recuperación de tokens del storage
- **isAuthenticated()**: Verificación de estado de autenticación
- **getCurrentUser()**: Obtención de usuario actual
- **forgotPassword()**: Solicitud de recuperación de contraseña
- **verifySecurityAnswer()**: Verificación de respuestas de seguridad
- **resetPassword()**: Restablecimiento de contraseña

#### 2. TareasService Tests (`src/app/services/tareas.service.spec.ts`)
- **getTareas()**: Obtención de lista de tareas
- **getTarea()**: Obtención de tarea específica
- **crearTarea()**: Creación de nuevas tareas
- **actualizarTarea()**: Actualización de tareas existentes
- **eliminarTarea()**: Eliminación de tareas
- **cambiarEstadoTarea()**: Cambio de estado de completado

#### 3. ThemeService Tests (`src/app/services/theme.service.spec.ts`)
- **toggleTheme()**: Alternancia entre tema claro y oscuro
- **setDarkTheme()**: Establecimiento de tema con persistencia
- **applyTheme()**: Aplicación de atributos de tema al DOM
- **Initialization**: Carga de tema guardado al inicializar

#### 4. LoginComponent Tests (`src/app/pages/login/login.component.spec.ts`)
- **Form Validation**: Validación de campos requeridos y formatos
- **onSubmit()**: Proceso de login con manejo de errores
- **togglePasswordVisibility()**: Funcionalidad de mostrar/ocultar contraseña
- **onForgotPassword()**: Navegación a recuperación de contraseña
- **getErrorMessage()**: Generación de mensajes de error apropiados

#### 5. Integration Tests (`src/app/tests/integration.spec.ts`)
- **Authentication Flow**: Flujo completo de autenticación
- **Tasks Management Flow**: Gestión completa de tareas
- **Authentication Guard**: Verificación de guards de autenticación
- **Error Handling**: Manejo de errores en toda la aplicación

### Ejecutar Tests del Frontend

```bash
cd tasks-frontend-angular

# Ejecutar todos los tests
ng test

# Ejecutar tests en modo headless (para CI/CD)
ng test --watch=false --browsers=ChromeHeadless

# Ejecutar tests con coverage
ng test --code-coverage

# Ejecutar tests específicos
ng test --include="**/auth.service.spec.ts"
```

## Coverage Esperado

### Backend
- **Servicios**: >90% de cobertura en lógica de negocio
- **Controladores**: >85% de cobertura en endpoints
- **Guards y Middlewares**: >95% de cobertura

### Frontend
- **Servicios**: >90% de cobertura en métodos HTTP
- **Componentes**: >80% de cobertura en lógica de UI
- **Guards**: >95% de cobertura en lógica de autorización

## Mocking y Test Utilities

### Backend
- **Prisma**: Mocked para tests unitarios aislados
- **JWT**: Mocked para generación de tokens
- **bcrypt**: Mocked para hash de contraseñas

### Frontend
- **HttpClient**: Mocked con HttpTestingController
- **Router**: Mocked para navegación
- **LocalStorage**: Mocked para persistencia
- **Angular Material**: Mocked para componentes UI

## Mejores Prácticas Implementadas

1. **Aislamiento**: Cada test es independiente y no afecta a otros
2. **Mocking**: Dependencias externas están mockeadas apropiadamente
3. **Cobertura**: Tests cubren casos de éxito, error y edge cases
4. **Nomenclatura**: Nombres descriptivos siguiendo patrón "should... when..."
5. **Organización**: Tests agrupados por funcionalidad
6. **Cleanup**: Limpieza apropiada después de cada test

## Scripts de Automatización

### Package.json Scripts Agregados

**Backend:**
```json
{
  "scripts": {
    "test:unit": "jest --testPathPattern=spec.ts",
    "test:integration": "jest --testPathPattern=e2e-spec.ts",
    "test:coverage": "jest --coverage --coverageReporters=text-lcov",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

**Frontend:**
```json
{
  "scripts": {
    "test:unit": "ng test --include='**/*.spec.ts'",
    "test:ci": "ng test --watch=false --browsers=ChromeHeadless --code-coverage",
    "test:watch": "ng test --watch=true"
  }
}
```

Los tests proporcionan una base sólida para el desarrollo y mantenimiento del proyecto, asegurando la calidad del código y facilitando futuras refactorizaciones.
