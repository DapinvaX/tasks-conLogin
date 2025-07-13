# 📝 Task Management App - Aplicación Full Stack

## 📋 Descripción del Proyecto

Una aplicación completa de gestión de tareas desarrollada con **Angular** (frontend) y **NestJS** (backend), utilizando **MySQL** como base de datos con **Prisma ORM**. La aplicación permite crear, leer, actualizar y eliminar tareas con una interfaz moderna y responsive.

---

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico
- **Frontend**: Angular 19 + Angular Material + TypeScript
- **Backend**: NestJS + TypeScript + Prisma ORM
- **Base de Datos**: MySQL 8.0
- **Herramientas**: VS Code Tasks, Docker ready, ESLint

---

## 🎯 Backend (NestJS)

### 📊 Características Implementadas

#### ✅ **API REST Completa**
- **Framework**: NestJS 11.0.1 con TypeScript
- **Arquitectura**: Modular con controllers, services y DTOs
- **Validaciones**: Class-validator para validación de datos
- **Transformación**: Class-transformer para mapeo de objetos

#### ✅ **Endpoints Disponibles**
```http
GET    /tareas          # Obtener todas las tareas
POST   /tareas          # Crear nueva tarea
GET    /tareas/:id      # Obtener tarea específica
PATCH  /tareas/:id      # Actualizar tarea
DELETE /tareas/:id      # Eliminar tarea
```

#### ✅ **Modelo de Datos (DTOs)**
```typescript
// CreateTareaDto
{
  titulo: string (max 75 chars, required)
  descripcion?: string (max 200 chars, optional)
  fecha_fin?: string (ISO date, optional)
  completada?: boolean (default: false)
}

// UpdateTareaDto (Partial de CreateTareaDto)
```

#### ✅ **Configuración y Seguridad**
- **CORS**: Habilitado para desarrollo local (puerto 4200)
- **Validación Global**: Pipes de validación configurados
- **Variables de Entorno**: Configuración con dotenv
- **Transformación**: Whitelist y transform habilitados

#### ✅ **Dependencias Principales**
```json
{
  "@nestjs/core": "^11.0.1",
  "@nestjs/common": "^11.0.1",
  "@nestjs/config": "^4.0.2",
  "@prisma/client": "^6.11.1",
  "class-validator": "^0.14.2",
  "class-transformer": "^0.5.1"
}
```

---

## 🎨 Frontend (Angular)

### 📱 Características Implementadas

#### ✅ **Aplicación Single Page (SPA)**
- **Framework**: Angular 19.2.0 con TypeScript
- **Routing**: Lazy loading components
- **UI Framework**: Angular Material 19.2.19
- **Forms**: Reactive Forms con validaciones

#### ✅ **Componentes Desarrollados**

##### 1. **NavBar Component**
- Tema claro/oscuro con persistencia en localStorage
- Navegación responsive
- Logo y branding de la aplicación

##### 2. **Home Page Component**
- Dashboard principal con lista completa de tareas
- Estados de carga, error y lista vacía
- Botón "Nueva Tarea" con navegación

##### 3. **Lista Tareas Component**
- Display de todas las tareas del backend
- Integración con tarea-card component
- Manejo de estados (loading, error, empty)

##### 4. **Tarea Card Component**
- **Modo Visualización**: Información de solo lectura
- **Modo Edición**: Formularios reactivos editables
- **Checkbox**: Para cambiar estado de completado
- **Botones**: Editar, Guardar, Cancelar, Eliminar
- **Validaciones**: Formularios reactivos con mensajes de error

##### 5. **Form Tarea Component**
- Formulario para crear nuevas tareas
- Validaciones en tiempo real
- Campos: título, descripción, fecha límite

##### 6. **Nueva Tarea Page**
- Página dedicada para creación de tareas
- Integra form-tarea component
- Navegación de regreso al home

#### ✅ **Servicios Implementados**

##### 1. **Tareas Service**
```typescript
// Métodos HTTP implementados
getTareas(): Observable<Tarea[]>
getTarea(id: number): Observable<Tarea>
createTarea(tarea: Tarea): Observable<Tarea>
updateTarea(id: number, tarea: Partial<Tarea>): Observable<Tarea>
deleteTarea(id: number): Observable<void>
```

##### 2. **Theme Service**
- Gestión de tema claro/oscuro
- Persistencia en localStorage
- Aplicación automática de temas

#### ✅ **Routing Configurado**
```typescript
Routes:
'/' → HomePageComponent (lazy load)
'/nueva-tarea' → NuevaTareaComponent (lazy load)
'/**' → redirect to '/'
```

#### ✅ **Dependencias Principales**
```json
{
  "@angular/core": "^19.2.0",
  "@angular/material": "^19.2.19",
  "@angular/cdk": "^19.2.19",
  "@angular/forms": "^19.2.0",
  "@angular/router": "^19.2.0"
}
```

---

## 🗄️ Base de Datos (MySQL)

### 📊 Configuración y Esquema

#### ✅ **Configuración de Conexión**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=tasks_db
DATABASE_URL="mysql://root:1234@localhost:3306/tasks_db"
```

#### ✅ **Esquema Prisma**
```prisma
model Tarea {
  id             Int       @id @default(autoincrement())
  titulo         String    @db.VarChar(75)
  descripcion    String?   @db.VarChar(200)
  fecha_creacion DateTime  @db.Date
  fecha_fin      DateTime? @db.Date
  completada     Boolean   @default(false)

  @@map("tareas")
}
```

#### ✅ **Estructura de Tabla MySQL**
```sql
CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(75) NOT NULL,
    descripcion VARCHAR(200),
    fecha_creacion DATE NOT NULL DEFAULT (CURRENT_DATE),
    fecha_fin DATE,
    completada BOOLEAN NOT NULL DEFAULT FALSE
);
```

#### ✅ **Datos de Prueba Incluidos**
- Script `create-database.sql` con estructura completa
- Script `seed-data.sql` con 3 tareas de ejemplo
- Migración Prisma configurada y lista

#### ✅ **Prisma ORM Features**
- **Client Generation**: Auto-generación de tipos TypeScript
- **Migrations**: Control de versiones de esquema
- **Type Safety**: Tipado fuerte en todas las consultas
- **Query Builder**: Sintaxis limpia y expresiva

---

## 🚀 Instalación y Ejecución

### 1. **Prerrequisitos**
```bash
# Software requerido
- Node.js 18+ 
- MySQL 8.0+
- Angular CLI: npm install -g @angular/cli
```

### 2. **Configuración de Base de Datos**
```sql
-- 1. Crear base de datos
CREATE DATABASE tasks_db;

-- 2. Ejecutar script de creación
mysql -u root -p tasks_db < tasks-backend-nestjs/db/create-database.sql
```

### 3. **Configuración Backend**
```bash
cd tasks-backend-nestjs

# Instalar dependencias
npm install

# Configurar Prisma
npx prisma generate
npx prisma db push

# Iniciar servidor de desarrollo
npm run start:dev

# ✅ Backend disponible en: http://localhost:4000
```

### 4. **Configuración Frontend**
```bash
cd tasks-frontend-angular

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve

# ✅ Frontend disponible en: http://localhost:4200
```

### 5. **VS Code Tasks Configuradas**
```json
{
  "Iniciar Backend (NestJS)": "cd tasks-backend-nestjs && npm run start:dev",
  "Iniciar Frontend (Angular)": "cd tasks-frontend-angular && ng serve",
  "Instalar dependencias Backend": "cd tasks-backend-nestjs && npm install",
  "Instalar dependencias Frontend": "cd tasks-frontend-angular && npm install"
}
```

---

## 🔒 Seguridad y Variables de Entorno

### ⚠️ **IMPORTANTE: Archivos .env**

**NUNCA subas archivos `.env` al repositorio** - contienen información sensible como:
- Credenciales de base de datos
- Claves JWT secretas
- URLs de conexión con passwords

### ✅ **Configuración Segura Implementada**

#### **Archivos .gitignore configurados:**
- `.gitignore` principal en la raíz
- `.gitignore` específico en backend y frontend
- Exclusión de todos los archivos `.env*` (excepto `.env.example`)

#### **Archivos de ejemplo incluidos:**
```bash
# Usar como plantilla para tu configuración local
tasks-backend-nestjs/.env.example  # Plantilla de variables backend
tasks-frontend-angular/.env.example # Plantilla de variables frontend
```

#### **Configuración inicial:**
```bash
# 1. Copia los archivos de ejemplo
cp tasks-backend-nestjs/.env.example tasks-backend-nestjs/.env
cp tasks-frontend-angular/.env.example tasks-frontend-angular/.env

# 2. Edita las variables con tus valores reales
# - Cambia las credenciales de base de datos
# - Genera un JWT_SECRET seguro
# - Ajusta las URLs según tu entorno
```

### 🛡️ **Mejores Prácticas Implementadas**
- ✅ Archivos `.env` excluidos del control de versiones
- ✅ Plantillas `.env.example` para nuevos desarrolladores
- ✅ Comentarios explicativos en variables sensibles
- ✅ Validación de variables de entorno en la aplicación

---

## � Funcionalidades de UI/UX

### ✅ **Características Visuales**
- **Material Design**: Componentes consistentes y modernos
- **Responsive Design**: Adaptable a móvil, tablet y desktop
- **Tema Claro/Oscuro**: Switch dinámico con persistencia
- **Animaciones**: Transiciones suaves y micro-interacciones
- **Loading States**: Spinners y skeleton loaders
- **Error Handling**: Mensajes de error claros y útiles

### ✅ **Interacciones Avanzadas**
- **Edición Inline**: Modificar tareas sin cambiar de página
- **Checkbox Interactivo**: Cambio de estado visual inmediato
- **Formularios Reactivos**: Validación en tiempo real
- **Confirmaciones**: Diálogos para acciones destructivas

---

## 📊 Métricas del Proyecto

### **Líneas de Código**
- **Backend**: ~500 líneas (TypeScript)
- **Frontend**: ~1200 líneas (TypeScript/HTML/CSS)
- **Base de Datos**: 2 scripts SQL + 1 esquema Prisma

### **Archivos Principales**
- **Backend**: 15+ archivos fuente
- **Frontend**: 25+ componentes y servicios
- **Configuración**: 10+ archivos de config

---

## 🔧 Herramientas de Desarrollo

### ✅ **Linting y Formateo**
- **ESLint**: Configurado para TypeScript
- **Prettier**: Formateo automático de código
- **Angular CLI**: Generación de componentes y servicios

### ✅ **Testing (Configurado)**
- **Jest**: Backend unit tests
- **Jasmine/Karma**: Frontend unit tests
- **E2E**: Configuración lista para tests end-to-end

### ✅ **DevOps Ready**
- **Docker**: Dockerfile configurado para backend
- **Environment**: Variables de entorno para todos los ambientes
- **Scripts NPM**: Comandos de build, dev y producción

---

## 🚧 Funcionalidades Implementadas vs Pendientes

### ✅ **Completado**
- [x] CRUD completo de tareas
- [x] Frontend responsive con Angular Material
- [x] Backend REST API con NestJS
- [x] Base de datos MySQL con Prisma
- [x] Tema claro/oscuro
- [x] Validaciones frontend y backend
- [x] Edición inline de tareas
- [x] Estados de carga y error
- [x] Routing y navegación
- [x] Dockerización del backend

### 🔄 **Próximas Mejoras**
- [ ] Sistema de autenticación (JWT)
- [ ] Filtros y búsqueda de tareas
- [ ] Categorías/etiquetas
- [ ] Notificaciones push
- [ ] Tests unitarios completos
- [ ] Deployment a producción
- [ ] PWA (Progressive Web App)
- [ ] Paginación de tareas
- [ ] Export/Import de datos

---

## 📁 Estructura Completa del Proyecto

```
tasks-sinLogin/
├── 📄 README.md
├── 📄 CAMBIOS-LISTA-TAREAS.md
├── 🔧 .vscode/
│   └── tasks.json
├── 🖥️ tasks-backend-nestjs/
│   ├── 📦 package.json
│   ├── 🔧 tsconfig.json
│   ├── 🔧 nest-cli.json
│   ├── 🔧 eslint.config.mjs
│   ├── 🐳 Dockerfile
│   ├── 🗄️ db/
│   │   ├── create-database.sql
│   │   └── seed-data.sql
│   ├── 🗄️ prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── 📂 src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── 🗄️ prisma/
│       └── 📂 tareas/
│           ├── tareas.controller.ts
│           ├── tareas.service.ts
│           ├── tareas.module.ts
│           └── dto/
└── 🌐 tasks-frontend-angular/
    ├── 📦 package.json
    ├── 🔧 angular.json
    ├── 🔧 tsconfig.json
    └── 📂 src/
        ├── main.ts
        ├── index.html
        ├── styles.css
        └── 📂 app/
            ├── app.component.ts
            ├── app.routes.ts
            ├── 📂 components/
            │   ├── navbar/
            │   ├── lista-tareas/
            │   ├── tarea-card/
            │   └── form-tarea/
            ├── 📂 pages/
            │   ├── home-page/
            │   └── nueva-tarea/
            ├── 📂 services/
            │   ├── tareas.service.ts
            │   └── theme.service.ts
            ├── 📂 models/
            │   └── tarea.model.ts
            └── 📂 environments/
```

---

## 🎯 Casos de Uso Soportados

1. **📝 Gestión Básica**
   - Crear nuevas tareas con título, descripción y fecha límite
   - Ver lista completa de tareas
   - Marcar tareas como completadas/pendientes
   - Eliminar tareas no deseadas

2. **✏️ Edición Avanzada**
   - Editar tareas existentes inline
   - Modificar cualquier campo de la tarea
   - Validación en tiempo real
   - Cancelar ediciones sin guardar

3. **🎨 Experiencia de Usuario**
   - Cambiar entre tema claro y oscuro
   - Navegación fluida entre páginas
   - Feedback visual para todas las acciones
   - Manejo elegante de errores

4. **📱 Responsive Design**
   - Uso en dispositivos móviles
   - Adaptación automática a diferentes pantallas
   - Touch-friendly en dispositivos táctiles

---

*Desarrollado con ❤️ usando Angular + NestJS + MySQL*
