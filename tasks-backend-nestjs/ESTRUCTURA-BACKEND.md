# Estructura del Backend - NestJS con Middlewares

Este proyecto ha sido reestructurado siguiendo las mejores prácticas de NestJS y organizando el código de manera modular y escalable.

## 📁 Estructura de Directorios

```
src/
├── 📂 app.module.ts              # Módulo principal de la aplicación
├── 📂 main.ts                    # Punto de entrada de la aplicación
├── 📂 auth/                      # Módulo de autenticación
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto/                      # Data Transfer Objects
│   ├── guards/                   # Guards de autenticación
│   └── strategies/               # Estrategias de Passport
├── 📂 tareas/                    # Módulo de tareas
│   ├── tareas.module.ts
│   ├── tareas.service.ts
│   └── dto/
├── 📂 prisma/                    # Configuración de Prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── 📂 common/                    # Componentes compartidos
│   ├── decorators/               # Decoradores personalizados
│   ├── filters/                  # Filtros de excepción
│   ├── middlewares/              # Middlewares globales
│   └── pipes/                    # Pipes de validación
├── 📂 config/                    # Configuración de la aplicación
│   └── app.config.ts
├── 📂 controllers/               # Controladores centralizados
│   ├── auth.controller.ts
│   └── tareas.controller.ts
├── 📂 libs/                      # Librerías y utilidades
│   ├── password.utils.ts
│   ├── date.utils.ts
│   └── validation.utils.ts
├── 📂 middlewares/               # Middlewares específicos
│   ├── auth.middleware.ts
│   └── validate-json.middleware.ts
├── 📂 models/                    # Interfaces y tipos
│   ├── user.model.ts
│   └── task.model.ts
├── 📂 routes/                    # Configuración de rutas
│   └── routes.module.ts
└── 📂 schemas/                   # Esquemas de validación
    ├── auth.schema.ts
    └── task.schema.ts
```

## 🔧 Middlewares Implementados

### 1. Middlewares Globales (common/middlewares)
- **LoggerMiddleware**: Registra todas las peticiones HTTP
- **SecurityMiddleware**: Añade headers de seguridad
- **RateLimitMiddleware**: Limita la cantidad de peticiones por IP

### 2. Middlewares Específicos (middlewares)
- **AuthMiddleware**: Validación de tokens JWT
- **ValidateJsonMiddleware**: Validación de formato JSON

### 3. CORS Nativo
- **NestJS CORS**: Manejo nativo de políticas CORS con soporte completo para preflight

## 🛡️ Seguridad

### Headers de Seguridad
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy`

### Rate Limiting
- Límite: 100 peticiones por ventana de 15 minutos
- Por IP
- Headers informativos incluidos

## 🔍 Filtros y Pipes

### Filtros
- **AllExceptionsFilter**: Manejo global de excepciones con logging

### Pipes
- **ValidationPipe**: Validación de DTOs con class-validator

## 🎯 Decoradores Personalizados

- **@CurrentUser()**: Extrae el usuario actual de la petición
- **@Roles()**: Define roles requeridos para endpoints

## 📝 Configuración

La configuración se centraliza en `config/app.config.ts` y utiliza variables de entorno:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="24h"
```

## 🚀 Uso

### Iniciar el servidor
```bash
npm run start:dev
```

### Acceso a la API
- Base URL: `http://localhost:4000`
- Endpoints de auth: `/auth/*`
- Endpoints de tareas: `/tareas/*`

## 📊 Logging

Todas las peticiones se registran automáticamente con:
- Método HTTP
- URL
- Código de estado
- User Agent
- IP del cliente
- Timestamp

## 🔄 Flujo de Petición

1. **NestJS CORS** → Maneja peticiones OPTIONS y CORS preflight
2. **SecurityMiddleware** → Añade headers de seguridad
3. **LoggerMiddleware** → Registra la petición
4. **RateLimitMiddleware** → Verifica límites
5. **ValidationPipe** → Valida DTOs
6. **Guards** → Verificación de autenticización/autorización
7. **Controller** → Procesa la lógica
8. **AllExceptionsFilter** → Maneja errores

## 🛠️ Utilidades Disponibles

### PasswordUtils
- Hash de contraseñas
- Comparación de contraseñas

### DateUtils  
- Formateo de fechas en español
- Verificación de expiración
- Suma de días/horas

### ValidationUtils
- Validación de email
- Validación de contraseñas
- Sanitización de strings
- Validación de usernames

## 🐛 Solución de Problemas

### Error OPTIONS 404
Si aparecen errores como `Cannot OPTIONS /auth/verify-token`, esto significa que las peticiones CORS preflight no se están manejando correctamente. La solución implementada incluye:

1. **CORS Nativo de NestJS**: Configurado en `main.ts` con soporte completo para preflight
2. **OptionsController**: Controlador de respaldo para manejar peticiones OPTIONS
3. **Headers CORS apropiados**: Incluidos en la configuración

### Error Cannot POST 404
Si aparecen errores como `Cannot POST /auth/login`, esto puede deberse a:

1. **Servidor reiniciándose**: Esperar a que termine la compilación
2. **Prefijo de rutas incorrecto**: Verificar que las URLs coincidan
3. **Controladores no registrados**: Verificar que los módulos exporten los controladores correctos

**Solución**: Eliminar prefijos globales innecesarios y usar las rutas directas (`/auth/*`, `/tareas/*`)

### Configuración CORS
```typescript
app.enableCors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
});
```

### Verificar Estado del Servidor
Para verificar que el servidor está funcionando correctamente:

```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:4000/auth/login" -Method POST -ContentType "application/json" -Body '{"emailOrUsername":"test","password":"test"}'

# Debe devolver error 401 (credenciales inválidas) si funciona correctamente
```

Esta estructura proporciona una base sólida, escalable y mantenible para el desarrollo del backend con NestJS.
