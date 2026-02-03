# 🎨 Guía de Estilos NASTE - Arquitectura SCSS 7-1

## 📚 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Estructura 7-1](#estructura-7-1)
3. [Colores y Variables](#colores-y-variables)
4. [Mixins y Funciones](#mixins-y-funciones)
5. [Componentes](#componentes)
6. [Layout](#layout)
7. [Páginas](#páginas)
8. [Utilidades](#utilidades)
9. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🌟 Introducción

Esta guía de estilos documenta la arquitectura SCSS 7-1 implementada para el proyecto NASTE. El diseño utiliza un tema oscuro con efecto glassmorphism (vidrio esmerilado) y una paleta de colores elegante basada en verde sage, crema y coral.

### ¿Qué es la arquitectura 7-1?

Es un patrón de organización de archivos SCSS que divide los estilos en **7 carpetas** más **1 archivo principal** (`main.scss`):

```
styles/
├── abstracts/      # Variables, mixins, funciones (NO genera CSS)
├── base/           # Reset, tipografía, animaciones
├── components/     # Botones, cards, forms, etc.
├── layout/         # Grid, header, sidebar
├── pages/          # Estilos específicos de páginas
├── themes/         # Tema oscuro
├── utilities/      # Clases de utilidad
├── vendors/        # Librerías externas
└── main.scss       # Archivo principal que importa todo
```

---

## 📁 Estructura 7-1

### 1. **Abstracts** (Herramientas que NO generan CSS)

#### `_variables.scss`

Contiene todas las variables del proyecto: colores, espaciado, tipografía, etc.

**Colores principales:**

```scss
$primary-color: #8fa686; // Verde sage
$secondary-color: #f5e6c8; // Crema
$accent-color: #e8a889; // Coral
```

#### `_mixins.scss`

Mixins reutilizables para glassmorphism, flexbox, media queries, etc.

#### `_functions.scss`

Funciones de utilidad como `rem()` para convertir píxeles a rem.

---

### 2. **Base** (Estilos fundamentales)

- `_reset.scss`: Normalización CSS
- `_typography.scss`: Fuentes (Inter + Poppins), headings, párrafos
- `_animations.scss`: Keyframes (fadeIn, slideInUp, pulse, spin, shake)

---

### 3. **Components** (Componentes reutilizables)

- `_buttons.scss`: Botones con variantes y tamaños
- `_cards.scss`: Tarjetas con glassmorphism
- `_forms.scss`: Inputs, selects, checkboxes, switches
- `_badges.scss`: Insignias de estado (pending, paid, delivered, cancelled)
- `_tables.scss`: Tablas responsive con glassmorphism
- `_modals.scss`: Modales con overlay y animaciones

---

### 4. **Layout** (Estructura de la aplicación)

- `_grid.scss`: Sistema de grid y flexbox
- `_header.scss`: Navegación principal sticky
- `_sidebar.scss`: Navegación lateral colapsable

---

### 5. **Pages** (Estilos específicos de páginas)

- `_login.scss`: Página de login
- `_dashboard.scss`: Dashboard con estadísticas
- `_products.scss`: Página de productos
- `_invoices.scss`: Página de facturas

---

### 6. **Themes** (Temas)

- `_dark.scss`: Tema oscuro (por defecto)

---

### 7. **Utilities** (Clases de utilidad)

- `_helpers.scss`: Clases de spacing, display, width, etc.

---

### 8. **Vendors** (Librerías externas)

Importa estilos de terceros (ej: Bootstrap, Angular Material)

---

## 🎨 Colores y Variables

### Paleta de Colores NASTE

#### Colores Primarios

```scss
$primary-color: #8fa686; // Verde sage - Color principal
$primary-light: #a5bbaa; // Verde sage claro
$primary-dark: #6b8a6e; // Verde sage oscuro

$secondary-color: #f5e6c8; // Crema - Secundario
$secondary-light: #fff5e0; // Crema claro
$secondary-dark: #e5d6b8; // Crema oscuro

$accent-color: #e8a889; // Coral - Acento
$accent-light: #ffbea3; // Coral claro
$accent-dark: #d89779; // Coral oscuro
```

#### Colores de Estado

```scss
$success-color: #8fa686; // Verde (mismo que primary)
$warning-color: #f5d547; // Amarillo
$error-color: #e57373; // Rojo
```

#### Escala de Grises (Dark Theme)

```scss
$white: #ffffff;
$black: #000000;
$gray-100: #f5f5f5;
$gray-200: #e8e8e8;
$gray-300: #d1d1d1;
$gray-400: #b4b4b4;
$gray-500: #9aa1a9;
$gray-600: #6b7280;
$gray-700: #4b5563;
$gray-800: #374151;
$gray-900: #1f2937;
```

#### Backgrounds (Dark Theme)

```scss
$bg-primary: #1a1a1a; // Fondo principal
$bg-secondary: #242424; // Fondo secundario
$bg-tertiary: #2e2e2e; // Fondo terciario
$bg-elevated: #333333; // Elementos elevados
```

#### Glassmorphism

```scss
$glass-bg: rgba(255, 255, 255, 0.05);
$glass-border: rgba(255, 255, 255, 0.1);
$glass-blur: 12px;
```

### Espaciado

```scss
$spacing-xs: 0.25rem; // 4px
$spacing-sm: 0.5rem; // 8px
$spacing-md: 1rem; // 16px
$spacing-lg: 1.5rem; // 24px
$spacing-xl: 2rem; // 32px
$spacing-2xl: 3rem; // 48px
```

### Tipografía

```scss
$font-family-primary: 'Inter', sans-serif;
$font-family-secondary: 'Poppins', sans-serif;

$font-size-xs: 0.75rem; // 12px
$font-size-sm: 0.875rem; // 14px
$font-size-md: 1rem; // 16px
$font-size-lg: 1.125rem; // 18px
$font-size-xl: 1.25rem; // 20px
$font-size-2xl: 1.5rem; // 24px
$font-size-3xl: 2rem; // 32px
$font-size-4xl: 2.5rem; // 40px

$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### Breakpoints (Mobile-first)

```scss
$breakpoint-sm: 640px; // Móviles grandes
$breakpoint-md: 768px; // Tablets
$breakpoint-lg: 1024px; // Desktop
$breakpoint-xl: 1280px; // Desktop grande
```

---

## 🧰 Mixins y Funciones

### Glassmorphism Mixin

Crea el efecto de vidrio esmerilado característico del diseño NASTE.

```scss
@use '../abstracts' as *;

// Uso básico
.mi-elemento {
  @include glassmorphism(normal);
}

// Variantes de intensidad
.elemento-suave {
  @include glassmorphism(light); // Efecto suave
}

.elemento-normal {
  @include glassmorphism(normal); // Efecto medio
}

.elemento-intenso {
  @include glassmorphism(strong); // Efecto fuerte
}
```

**Resultado:**

- Fondo semi-transparente
- Efecto de desenfoque (backdrop-filter)
- Borde sutil
- Sombra suave

---

### Flexbox Mixins

#### `flex-center` - Centra elementos horizontal y verticalmente

```scss
.boton {
  @include flex-center;
  gap: $spacing-sm;
}
```

**Genera:**

```css
.boton {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
```

#### `flex-between` - Distribuye elementos en los extremos

```scss
.header {
  @include flex-between;
}
```

**Genera:**

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

#### `flex-column` - Columna con flexbox

```scss
.sidebar-nav {
  @include flex-column;
}
```

---

### Media Query Mixin (Mobile-first)

```scss
// Por defecto: estilos móviles
.card {
  padding: $spacing-md;

  // Desde tablets (768px)
  @include media-query(tablet) {
    padding: $spacing-lg;
  }

  // Desde desktop (1024px)
  @include media-query(desktop) {
    padding: $spacing-xl;
  }
}
```

**Opciones disponibles:**

- `mobile`: 640px
- `tablet`: 768px
- `desktop`: 1024px

---

### Focus Ring Mixin

Anillo de enfoque accesible para teclado.

```scss
.btn {
  &:focus-visible {
    @include focus-ring; // Color primario
  }
}

.btn-danger {
  &:focus-visible {
    @include focus-ring($error-color); // Color personalizado
  }
}
```

---

### Truncate Text Mixins

#### `truncate` - Trunca en una línea

```scss
.titulo {
  @include truncate;
}
```

#### `truncate-text($lines)` - Trunca en múltiples líneas

```scss
.descripcion {
  @include truncate-text(3); // Muestra 3 líneas máximo
}
```

---

### Custom Scrollbar Mixin

```scss
.lista-larga {
  @include custom-scrollbar(8px, $bg-secondary, $gray-600);
}
```

**Parámetros:**

1. `$width`: Ancho del scrollbar
2. `$track`: Color del track (fondo)
3. `$thumb`: Color del thumb (barra)

---

### Función `rem($px)`

Convierte píxeles a rem (responsive).

```scss
.elemento {
  padding: rem(24); // 1.5rem
  margin: rem(16); // 1rem
  font-size: rem(18); // 1.125rem
}
```

---

### Función `opacity($color, $amount)`

Añade opacidad a un color.

```scss
.overlay {
  background: opacity($primary-color, 0.2); // rgba(143, 166, 134, 0.2)
}
```

---

## 🧩 Componentes

### Botones

#### Botones Base

```html
<!-- Botón primario (verde sage) -->
<button class="btn btn-primary">Guardar Cambios</button>

<!-- Botón acento (coral) -->
<button class="btn btn-accent">Acción Importante</button>

<!-- Botón outline -->
<button class="btn btn-outline">Cancelar</button>

<!-- Botón ghost (glassmorphism) -->
<button class="btn btn-ghost">Sutil</button>
```

#### Tamaños

```html
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary btn-md">Mediano</button>
<button class="btn btn-primary btn-lg">Grande</button>
```

#### Estados

```html
<!-- Deshabilitado -->
<button class="btn btn-primary" disabled>Deshabilitado</button>

<!-- Loading (con spinner) -->
<button class="btn btn-primary btn-loading">Guardando...</button>

<!-- Ancho completo -->
<button class="btn btn-primary btn-full">Botón Completo</button>
```

#### Grupo de Botones

```html
<div class="btn-group">
  <button class="btn btn-primary">Aceptar</button>
  <button class="btn btn-outline">Cancelar</button>
</div>
```

---

### Cards (Tarjetas)

#### Card Básica

```html
<div class="card">
  <div class="card-header">
    <h3>Título de la Card</h3>
    <button class="btn btn-sm btn-ghost">⋯</button>
  </div>

  <div class="card-body">
    <p>Contenido de la card con glassmorphism automático.</p>
  </div>

  <div class="card-footer">
    <span class="text-muted">Hace 5 minutos</span>
    <button class="btn btn-sm btn-primary">Ver más</button>
  </div>
</div>
```

#### Card con Borde de Acento

```html
<div class="card card-accent">
  <!-- Borde coral a la izquierda -->
</div>

<div class="card card-primary">
  <!-- Borde verde sage a la izquierda -->
</div>
```

#### Card Compacta

```html
<div class="card card-compact">
  <!-- Menos padding -->
</div>
```

#### Card Sin Hover

```html
<div class="card card-static">
  <!-- No hace hover ni se eleva -->
</div>
```

---

### Forms (Formularios)

#### Input Básico

```html
<div class="form-group">
  <label class="form-label" for="nombre">Nombre del Producto</label>
  <input type="text" id="nombre" class="form-input" placeholder="Ej: Laptop HP" />
  <span class="form-hint">Ingresa un nombre descriptivo</span>
</div>
```

#### Input con Error

```html
<div class="form-group">
  <label class="form-label" for="email">Email</label>
  <input type="email" id="email" class="form-input error" value="correo-invalido" />
  <span class="form-error">El email no es válido</span>
</div>
```

#### Select

```html
<div class="form-group">
  <label class="form-label" for="categoria">Categoría</label>
  <select id="categoria" class="form-select">
    <option>Electrónica</option>
    <option>Ropa</option>
    <option>Alimentos</option>
  </select>
</div>
```

#### Textarea

```html
<div class="form-group">
  <label class="form-label" for="descripcion">Descripción</label>
  <textarea
    id="descripcion"
    class="form-textarea"
    placeholder="Escribe una descripción detallada..."
  ></textarea>
</div>
```

#### Checkbox Personalizado

```html
<label class="form-check-label">
  <input type="checkbox" class="form-checkbox" checked />
  <span>Acepto los términos y condiciones</span>
</label>
```

#### Radio Buttons

```html
<label class="form-check-label">
  <input type="radio" name="plan" class="form-radio" checked />
  <span>Plan Básico - $9.99/mes</span>
</label>

<label class="form-check-label">
  <input type="radio" name="plan" class="form-radio" />
  <span>Plan Premium - $19.99/mes</span>
</label>
```

#### Switch Toggle

```html
<label class="form-check-label">
  <input type="checkbox" class="form-switch" checked />
  <span>Notificaciones activadas</span>
</label>
```

#### Form con Glassmorphism

```html
<form class="form-glass">
  <!-- Todos los inputs tendrán glassmorphism -->
  <div class="form-group">
    <input type="text" class="form-input" placeholder="Usuario" />
  </div>
</form>
```

---

### Badges (Insignias de Estado)

```html
<!-- Estados de factura -->
<span class="badge badge-pending">Pendiente</span>
<span class="badge badge-paid">Pagado</span>
<span class="badge badge-delivered">Entregado</span>
<span class="badge badge-cancelled">Cancelado</span>

<!-- Badge con punto animado -->
<span class="badge badge-pending badge-dot">En Proceso</span>

<!-- Badge sólido -->
<span class="badge badge-solid badge-paid">Confirmado</span>

<!-- Badge grande -->
<span class="badge badge-lg badge-delivered">Entrega Completada</span>
```

**Colores de badges:**

- `badge-pending`: Amarillo (advertencia)
- `badge-paid`: Verde sage (éxito)
- `badge-delivered`: Coral (acento)
- `badge-cancelled`: Rojo (error)

---

### Tables (Tablas)

#### Tabla Básica

```html
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Laptop HP</td>
        <td class="table-cell-accent">$899.00</td>
        <td>15</td>
        <td><span class="badge badge-paid">Disponible</span></td>
      </tr>
      <tr class="selected">
        <td>Mouse Logitech</td>
        <td class="table-cell-accent">$29.99</td>
        <td>5</td>
        <td><span class="badge badge-pending">Bajo Stock</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Tabla Compacta

```html
<table class="table table-compact">
  <!-- Menos padding en celdas -->
</table>
```

#### Celda con Alineación

```html
<td class="table-cell-center">Centrado</td>
<td class="table-cell-right">Derecha</td>
<td class="table-cell-accent">Con acento</td>
```

---

### Modals (Modales)

```html
<div class="modal-overlay">
  <div class="modal-container">
    <div class="modal-header">
      <h3>Confirmar Acción</h3>
      <button class="modal-close">✕</button>
    </div>

    <div class="modal-body">
      <p>¿Estás seguro de que deseas eliminar este producto?</p>
    </div>

    <div class="modal-footer">
      <button class="btn btn-outline">Cancelar</button>
      <button class="btn btn-accent">Eliminar</button>
    </div>
  </div>
</div>
```

#### Tamaños de Modal

```html
<!-- Pequeño -->
<div class="modal-container modal-container-sm"></div>

<!-- Grande -->
<div class="modal-container modal-container-lg"></div>

<!-- Extra grande -->
<div class="modal-container modal-container-xl"></div>
```

#### Modal sin Padding en Body

```html
<div class="modal-container modal-no-padding">
  <div class="modal-body">
    <!-- Contenido custom sin padding -->
  </div>
</div>
```

---

## 📐 Layout

### Grid System

#### Contenedor

```html
<div class="container">
  <!-- Contenido centrado con max-width 1400px -->
</div>

<div class="container-fluid">
  <!-- Contenido con 100% de ancho -->
</div>
```

#### Grid de Columnas

```html
<!-- 2 columnas (1 en móvil) -->
<div class="grid grid-2">
  <div class="card">Columna 1</div>
  <div class="card">Columna 2</div>
</div>

<!-- 3 columnas (2 en tablet, 1 en móvil) -->
<div class="grid grid-3">
  <div class="card">Col 1</div>
  <div class="card">Col 2</div>
  <div class="card">Col 3</div>
</div>

<!-- 4 columnas (responsive automático) -->
<div class="grid grid-4">
  <div class="card">Col 1</div>
  <div class="card">Col 2</div>
  <div class="card">Col 3</div>
  <div class="card">Col 4</div>
</div>
```

#### Grid con Auto-fill

```html
<!-- Columnas automáticas (mínimo 280px cada una) -->
<div class="grid grid-auto">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <!-- Se ajusta automáticamente según el espacio -->
</div>
```

#### Gap (Espaciado entre elementos)

```html
<div class="grid grid-3 grid-gap-sm">
  <!-- Gap pequeño -->
  <div class="grid grid-3 grid-gap-md">
    <!-- Gap mediano -->
    <div class="grid grid-3 grid-gap-lg">
      <!-- Gap grande -->
      <div class="grid grid-3 grid-gap-xl"><!-- Gap extra grande --></div>
    </div>
  </div>
</div>
```

#### Flexbox Utilities

```html
<!-- Flex básico -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Flex centrado -->
<div class="flex-center">
  <div>Centrado</div>
</div>

<!-- Flex con space-between -->
<div class="flex-between">
  <div>Izquierda</div>
  <div>Derecha</div>
</div>

<!-- Flex columna -->
<div class="flex-column">
  <div>Arriba</div>
  <div>Abajo</div>
</div>

<!-- Flex responsive (columna en móvil) -->
<div class="flex-responsive">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

### Header (Navegación Principal)

```html
<header class="header">
  <div class="header-container">
    <!-- Logo -->
    <a href="/" class="header-logo">
      <img src="/logo.svg" alt="NASTE" />
      <span>NASTE</span>
    </a>

    <!-- Navegación (oculta en móvil) -->
    <nav class="header-nav">
      <a href="/dashboard" class="header-link active">Dashboard</a>
      <a href="/products" class="header-link">Productos</a>
      <a href="/invoices" class="header-link">Facturas</a>
    </nav>

    <!-- Acciones -->
    <div class="header-actions">
      <button class="btn btn-sm btn-ghost">🔔</button>
      <button class="btn btn-sm btn-primary">Mi Cuenta</button>
    </div>

    <!-- Toggle para móvil -->
    <button class="header-menu-toggle">☰</button>
  </div>
</header>

<!-- Menu móvil -->
<div class="header-mobile-menu">
  <nav class="header-nav">
    <a href="/dashboard" class="header-link active">Dashboard</a>
    <a href="/products" class="header-link">Productos</a>
    <a href="/invoices" class="header-link">Facturas</a>
  </nav>
</div>

<!-- Backdrop -->
<div class="header-backdrop"></div>
```

---

### Sidebar (Navegación Lateral)

```html
<aside class="sidebar">
  <!-- Header del sidebar -->
  <div class="sidebar-header">
    <div class="sidebar-logo">
      <img src="/logo.svg" alt="NASTE" />
      <span>NASTE</span>
    </div>
  </div>

  <!-- Navegación -->
  <nav class="sidebar-nav">
    <!-- Sección -->
    <div class="sidebar-section">
      <div class="sidebar-section-title">Principal</div>

      <a href="/dashboard" class="nav-item active">
        <span class="nav-icon">📊</span>
        <span class="nav-text">Dashboard</span>
        <span class="nav-badge">3</span>
      </a>

      <a href="/products" class="nav-item">
        <span class="nav-icon">📦</span>
        <span class="nav-text">Productos</span>
      </a>

      <a href="/invoices" class="nav-item">
        <span class="nav-icon">🧾</span>
        <span class="nav-text">Facturas</span>
      </a>
    </div>

    <!-- Otra sección -->
    <div class="sidebar-section">
      <div class="sidebar-section-title">Configuración</div>

      <a href="/settings" class="nav-item">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">Ajustes</span>
      </a>
    </div>
  </nav>
</aside>
```

#### Sidebar Colapsado

```html
<aside class="sidebar sidebar-collapsed">
  <!-- Solo muestra iconos -->
</aside>
```

---

## 📄 Páginas

### Página de Login

```html
<div class="login-page">
  <div class="login-container">
    <div class="login-header">
      <h1>Bienvenido a NASTE</h1>
      <p>Inicia sesión para continuar</p>
    </div>

    <form class="login-form">
      <div class="form-group">
        <label class="form-label" for="email">Email</label>
        <input type="email" id="email" class="form-input" placeholder="tu@email.com" />
      </div>

      <div class="form-group">
        <label class="form-label" for="password">Contraseña</label>
        <input type="password" id="password" class="form-input" placeholder="••••••••" />
      </div>

      <button type="submit" class="btn btn-primary btn-full">Iniciar Sesión</button>
    </form>

    <div class="login-divider">
      <span>o</span>
    </div>

    <div class="login-footer">
      <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
    </div>
  </div>
</div>
```

---

### Dashboard

```html
<div class="dashboard-page">
  <div class="dashboard-header">
    <h1>Dashboard</h1>
    <p>Resumen de tu negocio</p>
  </div>

  <!-- Estadísticas -->
  <div class="dashboard-stats">
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon">💰</div>
      </div>
      <div class="stat-value">$12,450</div>
      <div class="stat-label">Ventas del Mes</div>
      <div class="stat-change positive">↑ 12.5%</div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon">📦</div>
      </div>
      <div class="stat-value">248</div>
      <div class="stat-label">Productos</div>
      <div class="stat-change positive">↑ 8 nuevos</div>
    </div>
  </div>

  <!-- Contenido -->
  <div class="dashboard-content">
    <div class="dashboard-section">
      <h2>Facturas Recientes</h2>
      <!-- Tabla o lista -->
    </div>

    <div class="dashboard-section">
      <h2>Actividad</h2>
      <!-- Cards de actividad -->
    </div>
  </div>
</div>
```

---

### Productos

```html
<div class="products-page">
  <div class="products-header">
    <h1>Productos</h1>

    <div class="products-filters">
      <select class="form-select">
        <option>Todas las categorías</option>
        <option>Electrónica</option>
        <option>Ropa</option>
      </select>

      <button class="btn btn-primary">+ Nuevo Producto</button>
    </div>
  </div>

  <div class="products-grid">
    <div class="product-card">
      <img src="/product.jpg" alt="Producto" class="product-image" />

      <div class="product-body">
        <h3 class="product-title">Laptop HP Pavilion</h3>
        <p class="product-description">
          Laptop de alto rendimiento con procesador Intel Core i7
        </p>

        <div class="product-footer">
          <div class="product-price">$899.00</div>
          <div class="product-stock">Stock: 15</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### Facturas

```html
<div class="invoices-page">
  <div class="invoices-header">
    <h1>Facturas</h1>

    <div class="invoices-actions">
      <button class="btn btn-outline">Filtrar</button>
      <button class="btn btn-primary">+ Nueva Factura</button>
    </div>
  </div>

  <!-- Filtros -->
  <div class="invoices-filters">
    <div class="filter-row">
      <select class="form-select">
        <option>Todos los estados</option>
        <option>Pendiente</option>
        <option>Pagado</option>
      </select>

      <input type="date" class="form-input" />
    </div>
  </div>

  <!-- Lista de facturas -->
  <div class="invoices-list">
    <div class="invoice-item">
      <div class="invoice-info">
        <h3>Factura #001234</h3>
        <div class="invoice-meta">
          <span>Cliente: Juan Pérez</span>
          <span>Fecha: 20/01/2026</span>
          <span class="badge badge-paid">Pagado</span>
        </div>
      </div>

      <div class="invoice-amount">$1,245.00</div>

      <div class="invoice-actions">
        <button class="btn btn-sm btn-ghost">👁️</button>
        <button class="btn btn-sm btn-ghost">📄</button>
      </div>
    </div>
  </div>
</div>
```

---

## 🛠️ Utilidades

### Spacing (Margin y Padding)

```html
<!-- Margin -->
<div class="m-0">Sin margin</div>
<div class="m-xs">Margin extra pequeño (4px)</div>
<div class="m-sm">Margin pequeño (8px)</div>
<div class="m-md">Margin mediano (16px)</div>
<div class="m-lg">Margin grande (24px)</div>
<div class="m-xl">Margin extra grande (32px)</div>
<div class="m-2xl">Margin extra extra grande (48px)</div>

<!-- Margin direccional -->
<div class="mt-lg">Margin-top grande</div>
<div class="mr-md">Margin-right mediano</div>
<div class="mb-sm">Margin-bottom pequeño</div>
<div class="ml-xl">Margin-left extra grande</div>

<!-- Margin horizontal/vertical -->
<div class="mx-lg">Margin horizontal (left + right)</div>
<div class="my-md">Margin vertical (top + bottom)</div>

<!-- Padding (misma sintaxis) -->
<div class="p-lg">Padding grande</div>
<div class="pt-md">Padding-top mediano</div>
<div class="px-xl">Padding horizontal</div>
<div class="py-sm">Padding vertical</div>
```

### Display

```html
<div class="d-none">Oculto</div>
<div class="d-block">Display block</div>
<div class="d-inline">Display inline</div>
<div class="d-inline-block">Display inline-block</div>
<div class="d-flex">Display flex</div>
<div class="d-grid">Display grid</div>
```

### Width y Height

```html
<div class="w-full">Ancho 100%</div>
<div class="h-full">Alto 100%</div>
<div class="w-auto">Ancho automático</div>
<div class="h-auto">Alto automático</div>
```

### Position

```html
<div class="relative">Relativo</div>
<div class="absolute">Absoluto</div>
<div class="fixed">Fijo</div>
<div class="sticky">Sticky</div>
```

### Overflow

```html
<div class="overflow-hidden">Oculta overflow</div>
<div class="overflow-auto">Scroll automático</div>
<div class="overflow-x-auto">Scroll horizontal</div>
<div class="overflow-y-auto">Scroll vertical</div>
```

### Border Radius

```html
<div class="rounded-none">Sin border-radius</div>
<div class="rounded-sm">Border-radius pequeño</div>
<div class="rounded">Border-radius mediano</div>
<div class="rounded-lg">Border-radius grande</div>
<div class="rounded-xl">Border-radius extra grande</div>
<div class="rounded-full">Border-radius completo (círculo)</div>
```

### Shadows

```html
<div class="shadow-none">Sin sombra</div>
<div class="shadow-sm">Sombra pequeña</div>
<div class="shadow">Sombra mediana</div>
<div class="shadow-lg">Sombra grande</div>
<div class="shadow-xl">Sombra extra grande</div>
```

### Cursor

```html
<div class="cursor-pointer">Puntero</div>
<div class="cursor-not-allowed">No permitido</div>
<div class="cursor-default">Por defecto</div>
```

### Opacity

```html
<div class="opacity-0">Invisible</div>
<div class="opacity-50">50% opacidad</div>
<div class="opacity-75">75% opacidad</div>
<div class="opacity-100">100% opacidad</div>
```

### Z-index

```html
<div class="z-0">Z-index 0</div>
<div class="z-10">Z-index 10</div>
<div class="z-20">Z-index 20</div>
<div class="z-50">Z-index 50</div>
```

### Divider (Divisores)

Líneas divisoras con efecto de desvanecimiento gradual en los extremos.

```html
<!-- Divisor horizontal básico -->
<div class="divider"></div>

<!-- Divisor suave (más sutil) -->
<div class="divider divider--soft"></div>

<!-- Divisor fuerte (más visible) -->
<div class="divider divider--strong"></div>

<!-- Divisor vertical -->
<div class="d-flex">
  <div>Contenido izquierdo</div>
  <div class="divider divider--vertical"></div>
  <div>Contenido derecho</div>
</div>
```

**Características:**

- Gradiente que se desvanece en los extremos (20% - 80%)
- Tono suave usando `$text-muted` con opacidad
- Margen vertical automático: `$spacing-md` (16px)
- Variante vertical con margen horizontal

**Variantes disponibles:**

- `.divider` - Divisor estándar (opacidad 0.2)
- `.divider--soft` - Divisor muy sutil (opacidad 0.1)
- `.divider--strong` - Divisor más marcado (opacidad 0.4)
- `.divider--vertical` - Divisor vertical (para layouts horizontales)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Card de Producto

```html
<div class="card">
  <div class="card-header">
    <h3>Laptop HP Pavilion</h3>
    <span class="badge badge-paid">En Stock</span>
  </div>

  <div class="card-body">
    <p class="text-muted mb-md">
      Laptop de alto rendimiento con procesador Intel Core i7, 16GB RAM y 512GB SSD.
    </p>

    <div class="flex-between mb-md">
      <span class="text-sm text-muted">Precio:</span>
      <span class="text-xl font-bold text-accent">$899.00</span>
    </div>

    <div class="flex-between">
      <span class="text-sm text-muted">Stock:</span>
      <span class="font-semibold">15 unidades</span>
    </div>
  </div>

  <div class="card-footer">
    <button class="btn btn-outline btn-sm">Editar</button>
    <button class="btn btn-primary btn-sm">Ver Detalles</button>
  </div>
</div>
```

---

### Ejemplo 2: Formulario de Login con Glassmorphism

```html
<div class="login-page">
  <div class="login-container">
    <div class="login-header">
      <h1>Iniciar Sesión</h1>
      <p class="text-muted">Bienvenido de vuelta</p>
    </div>

    <form class="login-form form-glass">
      <div class="form-group">
        <label class="form-label" for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-input"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          class="form-input"
          placeholder="••••••••"
          required
        />
        <span class="form-hint">Mínimo 8 caracteres</span>
      </div>

      <label class="form-check-label mb-lg">
        <input type="checkbox" class="form-checkbox" />
        <span>Recordarme</span>
      </label>

      <button type="submit" class="btn btn-primary btn-full">Iniciar Sesión</button>
    </form>

    <div class="login-footer mt-xl">
      <p class="text-center">
        ¿Olvidaste tu contraseña?
        <a href="/reset">Recuperar</a>
      </p>
    </div>
  </div>
</div>
```

---

### Ejemplo 3: Dashboard con Estadísticas

```html
<div class="dashboard-page">
  <div class="dashboard-header mb-2xl">
    <div>
      <h1>Dashboard</h1>
      <p class="text-muted">Resumen de tu negocio</p>
    </div>

    <button class="btn btn-primary">+ Nueva Factura</button>
  </div>

  <!-- Grid de estadísticas -->
  <div class="dashboard-stats mb-2xl">
    <!-- Stat Card 1 -->
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon">💰</div>
      </div>
      <div class="stat-value">$12,450</div>
      <div class="stat-label">Ventas del Mes</div>
      <div class="stat-change positive">↑ 12.5%</div>
    </div>

    <!-- Stat Card 2 -->
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon">📦</div>
      </div>
      <div class="stat-value">248</div>
      <div class="stat-label">Productos Activos</div>
      <div class="stat-change positive">↑ 8 nuevos</div>
    </div>

    <!-- Stat Card 3 -->
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon">🧾</div>
      </div>
      <div class="stat-value">156</div>
      <div class="stat-label">Facturas Emitidas</div>
      <div class="stat-change negative">↓ 3.2%</div>
    </div>

    <!-- Stat Card 4 -->
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon">👥</div>
      </div>
      <div class="stat-value">89</div>
      <div class="stat-label">Clientes Activos</div>
      <div class="stat-change positive">↑ 5 nuevos</div>
    </div>
  </div>

  <!-- Contenido en 2 columnas -->
  <div class="dashboard-content">
    <!-- Columna principal -->
    <div class="dashboard-section">
      <div class="flex-between mb-lg">
        <h2>Facturas Recientes</h2>
        <a href="/invoices" class="text-primary">Ver todas →</a>
      </div>

      <div class="card">
        <table class="table table-compact">
          <thead>
            <tr>
              <th>Factura</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#001234</td>
              <td>Juan Pérez</td>
              <td class="table-cell-accent">$1,245.00</td>
              <td><span class="badge badge-paid">Pagado</span></td>
            </tr>
            <tr>
              <td>#001235</td>
              <td>María García</td>
              <td class="table-cell-accent">$890.50</td>
              <td><span class="badge badge-pending">Pendiente</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="dashboard-section">
      <h2 class="mb-lg">Actividad Reciente</h2>

      <div class="flex-column" style="gap: 1rem;">
        <div class="card card-compact">
          <div class="flex" style="gap: 1rem;">
            <div class="text-2xl">📦</div>
            <div>
              <p class="font-semibold mb-xs">Nuevo producto agregado</p>
              <p class="text-sm text-muted">Hace 5 minutos</p>
            </div>
          </div>
        </div>

        <div class="card card-compact">
          <div class="flex" style="gap: 1rem;">
            <div class="text-2xl">💰</div>
            <div>
              <p class="font-semibold mb-xs">Pago recibido</p>
              <p class="text-sm text-muted">Hace 1 hora</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### Ejemplo 4: Modal de Confirmación

```html
<!-- Activar modal con JavaScript -->
<button class="btn btn-accent" onclick="openModal()">Eliminar Producto</button>

<!-- Modal -->
<div class="modal-overlay" id="confirmModal" style="display: none;">
  <div class="modal-container modal-container-sm">
    <div class="modal-header">
      <h3>Confirmar Eliminación</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>

    <div class="modal-body">
      <p>¿Estás seguro de que deseas eliminar este producto?</p>
      <p class="text-warning mt-md">Esta acción no se puede deshacer.</p>
    </div>

    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-accent" onclick="confirmDelete()">Sí, Eliminar</button>
    </div>
  </div>
</div>

<script>
  function openModal() {
    document.getElementById('confirmModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
  }

  function confirmDelete() {
    // Lógica de eliminación
    closeModal();
  }
</script>
```

---

### Ejemplo 5: Lista de Productos con Grid Responsive

```html
<div class="products-page">
  <div class="products-header mb-2xl">
    <div>
      <h1>Productos</h1>
      <p class="text-muted">Administra tu inventario</p>
    </div>

    <div class="products-filters">
      <input
        type="search"
        class="form-input"
        placeholder="Buscar productos..."
        style="min-width: 250px;"
      />

      <select class="form-select">
        <option>Todas las categorías</option>
        <option>Electrónica</option>
        <option>Ropa</option>
        <option>Alimentos</option>
      </select>

      <button class="btn btn-primary">+ Nuevo Producto</button>
    </div>
  </div>

  <!-- Grid automático (responsive) -->
  <div class="products-grid">
    <!-- Producto 1 -->
    <div class="product-card">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Producto"
        class="product-image"
      />

      <div class="product-body">
        <div class="flex-between mb-sm">
          <h3 class="product-title">Laptop HP Pavilion</h3>
          <span class="badge badge-paid">Stock OK</span>
        </div>

        <p class="product-description">
          Laptop de alto rendimiento con procesador Intel Core i7, 16GB RAM y 512GB SSD.
          Ideal para gaming y trabajo profesional.
        </p>

        <div class="product-footer mt-lg">
          <div>
            <div class="product-price">$899.00</div>
            <div class="product-stock">Stock: 15 unidades</div>
          </div>

          <div class="flex" style="gap: 0.5rem;">
            <button class="btn btn-sm btn-ghost">✏️</button>
            <button class="btn btn-sm btn-ghost">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Producto 2 -->
    <div class="product-card">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Producto"
        class="product-image"
      />

      <div class="product-body">
        <div class="flex-between mb-sm">
          <h3 class="product-title">Mouse Logitech MX Master</h3>
          <span class="badge badge-pending">Bajo Stock</span>
        </div>

        <p class="product-description">
          Mouse ergonómico inalámbrico con conexión Bluetooth y batería recargable de
          larga duración.
        </p>

        <div class="product-footer mt-lg">
          <div>
            <div class="product-price">$89.99</div>
            <div class="product-stock low-stock">Stock: 3 unidades</div>
          </div>

          <div class="flex" style="gap: 0.5rem;">
            <button class="btn btn-sm btn-ghost">✏️</button>
            <button class="btn btn-sm btn-ghost">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Producto 3 (sin stock) -->
    <div class="product-card">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Producto"
        class="product-image"
      />

      <div class="product-body">
        <div class="flex-between mb-sm">
          <h3 class="product-title">Teclado Mecánico RGB</h3>
          <span class="badge badge-cancelled">Sin Stock</span>
        </div>

        <p class="product-description">
          Teclado mecánico con switches Cherry MX, iluminación RGB personalizable y
          reposamuñecas.
        </p>

        <div class="product-footer mt-lg">
          <div>
            <div class="product-price">$149.99</div>
            <div class="product-stock out-of-stock">Agotado</div>
          </div>

          <div class="flex" style="gap: 0.5rem;">
            <button class="btn btn-sm btn-ghost">✏️</button>
            <button class="btn btn-sm btn-ghost">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🚀 Cómo Empezar

### 1. Importar los Estilos

En tu [styles.scss](cci:1://file:///Users/mauricio.lenis/Documents/NASTE/naste-front/src/styles.scss:0:0-0:0), importa el archivo principal:

```scss
@use 'styles/main.scss';
```

### 2. Usar Glassmorphism en tu Componente

```scss
@use '../../styles/abstracts' as *;

.mi-componente {
  @include glassmorphism(normal);
  padding: $spacing-lg;
  border-radius: $border-radius-lg;
}
```

### 3. Usar Clases de Utilidad en HTML

```html
<div class="card p-lg rounded-xl shadow-lg">
  <h2 class="text-2xl font-bold mb-md text-primary">Título</h2>
  <p class="text-secondary line-clamp-2">Descripción truncada...</p>
</div>
```

---

## ✅ Buenas Prácticas

### 1. **Mobile-First**

Siempre escribe estilos móviles primero, luego añade media queries:

```scss
.elemento {
  padding: $spacing-md;

  @include media-query(tablet) {
    padding: $spacing-lg;
  }
}
```

### 2. **BEM Naming**

Usa la metodología BEM para nombrar clases:

```html
<!-- Block -->
<div class="product-card">
  <!-- Element -->
  <h3 class="product-card__title"></h3>

  <!-- Modifier -->
  <div class="product-card--featured"></div>
</div>
```

### 3. **Usa Variables**

Siempre usa variables en lugar de valores hardcoded:

```scss
// ❌ Evitar
.elemento {
  color: #8fa686;
  padding: 24px;
}

// ✅ Correcto
.elemento {
  color: $primary-color;
  padding: $spacing-lg;
}
```

### 4. **Aprovecha Mixins**

No repitas código, usa mixins:

```scss
// ❌ Evitar
.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

// ✅ Correcto
.card {
  @include flex-center;
}
```

### 5. **Glassmorphism Consciente**

No abuses del glassmorphism en todos los elementos:

```scss
// ✅ Cards, modales, headers
.card {
  @include glassmorphism(normal);
}

// ❌ No en textos o elementos pequeños
.texto {
  // NO glassmorphism aquí
}
```

---

## 🎯 Resumen Rápido

- **Colores principales:** Verde sage (#8FA686), Crema (#F5E6C8), Coral (#E8A889)
- **Glassmorphism:** `@include glassmorphism(normal)`
- **Flexbox:** `@include flex-center`, `@include flex-between`
- **Responsive:** `@include media-query(tablet)`
- **Función rem:** `padding: rem(24)` → `padding: 1.5rem`
- **Botones:** `.btn .btn-primary`, `.btn-accent`, `.btn-outline`, `.btn-ghost`
- **Cards:** `.card` (con glassmorphism automático)
- **Forms:** `.form-input`, `.form-select`, `.form-checkbox`, `.form-switch`
- **Badges:** `.badge-pending`, `.badge-paid`, `.badge-delivered`, `.badge-cancelled`
- **Grid:** `.grid .grid-3`, `.grid-auto`
- **Utilidades:** `.p-lg`, `.m-md`, `.rounded-xl`, `.shadow-lg`, `.text-center`

---

## 📞 Soporte

Si tienes dudas sobre cómo usar un componente o mixin, revisa los ejemplos en esta guía o consulta los archivos SCSS en [src/styles/](cci:1://file:///Users/mauricio.lenis/Documents/NASTE/naste-front/src/styles:0:0-0:0).

---

**¡Listo! Ahora tienes todo lo necesario para crear interfaces hermosas con glassmorphism usando la arquitectura SCSS 7-1 de NASTE.** 🎨✨
