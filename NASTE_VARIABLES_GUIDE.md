# 🎨 Guía de Variables SCSS - Naste

Sistema de diseño basado en la paleta de colores del logo de Naste.
Estilo: **Glassmorphism** con tema oscuro.

---

## 📋 Índice

1. [Paleta de Colores](#paleta-de-colores)
2. [Colores de Estado](#colores-de-estado)
3. [Tipografía](#tipografía)
4. [Glassmorphism](#glassmorphism)
5. [Sombras](#sombras)
6. [Espaciado](#espaciado)
7. [Bordes](#bordes)
8. [Estados Interactivos](#estados-interactivos)
9. [Breakpoints](#breakpoints)
10. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎨 Paleta de Colores

### Colores de Marca

| Variable | Hex | Uso |
|----------|-----|-----|
| `$primary-color` | #8FA686 | Sage green - Botones principales, estados activos, íconos de navegación |
| `$secondary-color` | #F5E6C8 | Cream - Fondos claros, texto destacado sobre oscuro |
| `$accent-color` | #E8A889 | Coral - CTAs, precios, botones de acción importantes |
| `$tertiary-color` | #D4C896 | Soft yellow - Badges secundarios, decoración |

### Cuándo usar cada color

```scss
// Botón principal (guardar, confirmar)
.btn-primary {
  background: $primary-color;
  color: $text-inverse;
}

// Botón de acción importante (crear factura, agregar producto)
.btn-accent {
  background: $accent-color;
  color: $text-inverse;
}

// Precio destacado
.price {
  color: $accent-color;
  font-size: $font-size-2xl;
}

// Badge informativo
.badge-info {
  background: $tertiary-color;
  color: $text-inverse;
}
```

---

## ✅ Colores de Estado

Usar para comunicar feedback visual al usuario.

| Estado | Variable | Hex | Ejemplo de uso |
|--------|----------|-----|----------------|
| Éxito | `$success-color` | #8FA686 | Factura pagada, producto activo |
| Advertencia | `$warning-color` | #D4C896 | Factura pendiente, stock bajo |
| Error | `$error-color` | #D4756A | Factura cancelada, eliminar |
| Info | `$info-color` | #89B8C4 | Tips, información adicional |

### Ejemplo: Badges de estado de factura

```scss
.badge {
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-md;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
}

.badge-pending {
  background: rgba($warning-color, 0.2);
  color: $warning-color;
}

.badge-paid {
  background: rgba($success-color, 0.2);
  color: $success-color;
}

.badge-delivered {
  background: rgba($accent-color, 0.2);
  color: $accent-color;
}

.badge-cancelled {
  background: rgba($error-color, 0.2);
  color: $error-color;
}
```

---

## 🔤 Tipografía

### Familias de fuente

```scss
// Texto general de la aplicación
body {
  font-family: $font-family-primary; // Inter
}

// Títulos destacados (opcional)
h1, h2 {
  font-family: $font-family-secondary; // Poppins
}
```

### Escala de tamaños

| Variable | Tamaño | Uso |
|----------|--------|-----|
| `$font-size-xs` | 12px | Labels pequeños, badges |
| `$font-size-sm` | 14px | Texto secundario, botones pequeños |
| `$font-size-md` | 16px | Texto base, párrafos |
| `$font-size-lg` | 18px | Subtítulos |
| `$font-size-xl` | 20px | Títulos de cards |
| `$font-size-2xl` | 24px | Títulos de sección |
| `$font-size-3xl` | 30px | Títulos de página |
| `$font-size-4xl` | 36px | Hero, precios destacados |

### Jerarquía de texto

```scss
// Título de página
.page-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $text-primary;
}

// Título de card
.card-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
}

// Texto secundario
.text-secondary {
  font-size: $font-size-sm;
  color: $text-secondary;
}

// Texto muted (placeholders, hints)
.text-muted {
  font-size: $font-size-sm;
  color: $text-muted;
}
```

---

## 🪟 Glassmorphism

El efecto característico de Naste. Fondos semi-transparentes con blur.

### Variables disponibles

| Variable | Valor | Uso |
|----------|-------|-----|
| `$glass-bg` | rgba(46, 46, 46, 0.7) | Cards, contenedores principales |
| `$glass-bg-light` | rgba(46, 46, 46, 0.5) | Elementos sutiles |
| `$glass-bg-strong` | rgba(46, 46, 46, 0.85) | Modals, elementos importantes |
| `$glass-border` | rgba(255, 255, 255, 0.1) | Bordes estándar |
| `$glass-blur` | 12px | Blur estándar |

### Ejemplo: Card con glassmorphism

```scss
.glass-card {
  background: $glass-bg;
  backdrop-filter: blur($glass-blur);
  -webkit-backdrop-filter: blur($glass-blur);
  border: 1px solid $glass-border;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-lg;
}

// Variante más sutil
.glass-card-light {
  background: $glass-bg-light;
  backdrop-filter: blur($glass-blur-light);
  border: 1px solid $glass-border-light;
}

// Variante para modals
.glass-modal {
  background: $glass-bg-strong;
  backdrop-filter: blur($glass-blur-strong);
  border: 1px solid $glass-border-strong;
}
```

### Ejemplo: Sidebar con glassmorphism

```scss
.sidebar {
  background: $glass-bg-strong;
  backdrop-filter: blur($glass-blur-strong);
  border-right: 1px solid $glass-border;
  height: 100vh;
  width: 250px;
}
```

---

## 🌑 Sombras

### Sombras por elevación

| Variable | Uso |
|----------|-----|
| `$shadow-sm` | Botones, inputs |
| `$shadow-md` | Cards, dropdowns |
| `$shadow-lg` | Modals, popovers |
| `$shadow-xl` | Elementos flotantes importantes |

### Sombras con glow (para hover/focus)

```scss
// Botón con glow en hover
.btn-primary {
  background: $primary-color;
  box-shadow: $shadow-sm;
  transition: box-shadow $transition-normal;
  
  &:hover {
    box-shadow: $shadow-glow-primary;
  }
}

// Botón accent con glow
.btn-accent {
  background: $accent-color;
  
  &:hover {
    box-shadow: $shadow-glow-accent;
  }
}
```

---

## 📐 Espaciado

Sistema basado en múltiplos de 4px.

| Variable | Valor | Uso común |
|----------|-------|-----------|
| `$spacing-xs` | 4px | Padding interno de badges |
| `$spacing-sm` | 8px | Gap entre elementos pequeños |
| `$spacing-md` | 16px | Padding de inputs, gap estándar |
| `$spacing-lg` | 24px | Padding de cards |
| `$spacing-xl` | 32px | Separación entre secciones |
| `$spacing-2xl` | 48px | Margen de página |
| `$spacing-3xl` | 64px | Hero sections |

### Ejemplo de uso

```scss
.card {
  padding: $spacing-lg;           // 24px interior
  margin-bottom: $spacing-xl;     // 32px separación
  
  .card-header {
    margin-bottom: $spacing-md;   // 16px bajo el header
  }
  
  .card-actions {
    gap: $spacing-sm;             // 8px entre botones
  }
}
```

---

## 🔲 Bordes

### Border radius

| Variable | Valor | Uso |
|----------|-------|-----|
| `$border-radius-sm` | 4px | Badges, chips |
| `$border-radius-md` | 8px | Inputs, botones |
| `$border-radius-lg` | 12px | Cards |
| `$border-radius-xl` | 16px | Modals |
| `$border-radius-2xl` | 24px | Contenedores grandes |
| `$border-radius-full` | 50% | Avatares, íconos circulares |

### Estilos de borde

```scss
// Input estándar
.input {
  border: $border-light;
  border-radius: $border-radius-md;
  
  &:focus {
    border: $border-primary;
  }
}

// Card
.card {
  border: $border-light;
  border-radius: $border-radius-lg;
}
```

---

## 👆 Estados Interactivos

### Hover

```scss
.list-item {
  transition: background $transition-fast;
  
  &:hover {
    background: $hover-overlay;
  }
}

// Hover con color de marca
.nav-item {
  &:hover {
    background: $hover-primary;
  }
}
```

### Focus

```scss
.input {
  &:focus {
    outline: none;
    box-shadow: $focus-ring;
    border-color: $primary-color;
  }
}

// Focus para elementos accent
.btn-accent {
  &:focus {
    box-shadow: $focus-ring-accent;
  }
}
```

---

## 📱 Breakpoints

Para diseño responsive con mobile-first.

| Variable | Valor | Dispositivo |
|----------|-------|-------------|
| `$breakpoint-xs` | 480px | Móviles pequeños |
| `$breakpoint-sm` | 640px | Móviles grandes |
| `$breakpoint-md` | 768px | Tablets |
| `$breakpoint-lg` | 1024px | Laptops |
| `$breakpoint-xl` | 1280px | Desktops |
| `$breakpoint-2xl` | 1536px | Pantallas grandes |

### Ejemplo de uso

```scss
.container {
  padding: $spacing-md;
  
  @media (min-width: $breakpoint-md) {
    padding: $spacing-lg;
  }
  
  @media (min-width: $breakpoint-lg) {
    padding: $spacing-xl;
  }
}

.sidebar {
  display: none;
  
  @media (min-width: $breakpoint-lg) {
    display: block;
    width: 250px;
  }
}
```

---

## 💡 Ejemplos Prácticos

### Card de Producto

```scss
.product-card {
  background: $glass-bg;
  backdrop-filter: blur($glass-blur);
  border: 1px solid $glass-border;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  transition: all $transition-normal;
  
  &:hover {
    box-shadow: $shadow-glow-primary;
    border-color: $glass-border-strong;
  }
  
  .product-code {
    font-size: $font-size-xs;
    color: $text-muted;
  }
  
  .product-name {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $text-primary;
    margin: $spacing-sm 0;
  }
  
  .product-price {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $accent-color;
  }
  
  .product-stock {
    font-size: $font-size-sm;
    color: $success-color;
    
    &.low-stock {
      color: $warning-color;
    }
    
    &.no-stock {
      color: $error-color;
    }
  }
}
```

### Formulario con Glassmorphism

```scss
.form-container {
  background: $glass-bg;
  backdrop-filter: blur($glass-blur);
  border: 1px solid $glass-border;
  border-radius: $border-radius-xl;
  padding: $spacing-xl;
  max-width: 500px;
}

.form-group {
  margin-bottom: $spacing-lg;
  
  label {
    display: block;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $text-secondary;
    margin-bottom: $spacing-xs;
  }
  
  input, select, textarea {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    background: $bg-tertiary;
    border: $border-light;
    border-radius: $border-radius-md;
    color: $text-primary;
    font-size: $font-size-md;
    transition: all $transition-fast;
    
    &::placeholder {
      color: $text-muted;
    }
    
    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: $focus-ring;
    }
  }
}

.form-actions {
  display: flex;
  gap: $spacing-md;
  margin-top: $spacing-xl;
  
  .btn-cancel {
    flex: 1;
    padding: $spacing-sm $spacing-lg;
    background: transparent;
    border: 1px solid $gray-500;
    border-radius: $border-radius-md;
    color: $text-secondary;
    
    &:hover {
      background: $hover-overlay;
    }
  }
  
  .btn-submit {
    flex: 1;
    padding: $spacing-sm $spacing-lg;
    background: $accent-color;
    border: none;
    border-radius: $border-radius-md;
    color: $text-inverse;
    font-weight: $font-weight-semibold;
    
    &:hover {
      box-shadow: $shadow-glow-accent;
    }
  }
}
```

### Tabla de Facturas

```scss
.invoice-table {
  width: 100%;
  background: $glass-bg;
  backdrop-filter: blur($glass-blur);
  border: 1px solid $glass-border;
  border-radius: $border-radius-lg;
  overflow: hidden;
  
  th {
    background: $bg-elevated;
    padding: $spacing-md;
    text-align: left;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $text-secondary;
    border-bottom: 1px solid $glass-border;
  }
  
  td {
    padding: $spacing-md;
    font-size: $font-size-sm;
    color: $text-primary;
    border-bottom: 1px solid $glass-border-light;
  }
  
  tr {
    transition: background $transition-fast;
    
    &:hover {
      background: $hover-overlay;
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
  
  .invoice-total {
    font-weight: $font-weight-bold;
    color: $accent-color;
  }
}
```

---

## 🔧 Tips de Uso

1. **Siempre usa variables** - Nunca hardcodees colores o tamaños
2. **Consistencia** - Usa la misma variable para el mismo propósito
3. **Glassmorphism con moderación** - No todo necesita blur, úsalo en elementos principales
4. **Contraste** - Asegúrate de que el texto sea legible sobre cualquier fondo
5. **Transiciones** - Usa `$transition-fast` para hovers, `$transition-normal` para cambios de estado

---

**Archivo:** `_variables.scss`  
**Proyecto:** Naste - Sistema de Facturación  
**Última actualización:** Enero 2026
