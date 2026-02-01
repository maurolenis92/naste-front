# Configuración de Code Quality Tools

Este proyecto está configurado con herramientas de calidad de código que se ejecutan automáticamente.

## Herramientas Instaladas

### 1. Prettier
Formateador de código automático que asegura un estilo consistente.

**Configuración:** [.prettierrc](.prettierrc)

### 2. ESLint
Analizador estático de código para identificar problemas y mantener calidad.

**Configuración:** [eslint.config.mjs](eslint.config.mjs)

### 3. Husky
Git hooks que ejecutan validaciones antes de cada commit.

**Configuración:** [.husky/](.husky/)

### 4. Lint-staged
Ejecuta linters solo en archivos modificados (staged) para mayor eficiencia.

## Comandos Disponibles

```bash
# Formatear todos los archivos
npm run format

# Verificar formato sin modificar
npm run format:check

# Ejecutar linter
npm run lint

# Ejecutar linter y corregir problemas automáticamente
npm run lint:fix
```

## Funcionamiento Automático

### Al Guardar Archivo (VS Code)
Prettier se ejecuta automáticamente formateando el archivo guardado.

**Configuración:** [.vscode/settings.json](.vscode/settings.json)

### Al Hacer Commit (Pre-commit Hook)
Antes de cada commit, automáticamente se ejecutan:
1. **ESLint** - Analiza y corrige problemas en archivos TypeScript y HTML
2. **Prettier** - Formatea todos los archivos modificados

Si hay errores que no se pueden corregir automáticamente, el commit se cancelará hasta que se resuelvan.

## Archivos de Configuración

- **`.prettierrc`** - Reglas de formato de Prettier
- **`.prettierignore`** - Archivos excluidos del formateo
- **`eslint.config.mjs`** - Reglas de linting de ESLint
- **`.husky/pre-commit`** - Hook de pre-commit
- **`.vscode/settings.json`** - Configuración de formateo automático en VS Code

## Extensiones Recomendadas de VS Code

Para aprovechar al máximo esta configuración, instala:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)

## Notas

- Los archivos en `node_modules/`, `dist/`, `.angular/` y `coverage/` están excluidos del análisis
- El formateo al guardar solo funciona en VS Code con la extensión Prettier instalada
- Los hooks de Git se activan automáticamente después de ejecutar `npm install`
