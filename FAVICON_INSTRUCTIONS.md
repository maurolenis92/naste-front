# Instrucciones para Generar Favicons de Naste

## 📋 Archivos de favicon necesarios

Debes generar los siguientes archivos del logo de Naste y colocarlos en las ubicaciones especificadas:

### Ubicación: `src/assets/icons/`

- `favicon-16x16.png` (16x16 px)
- `favicon-32x32.png` (32x32 px)
- `apple-touch-icon.png` (180x180 px)
- `android-chrome-192x192.png` (192x192 px)
- `android-chrome-512x512.png` (512x512 px)

### Ubicación: `src/`

- `favicon.ico` (contiene múltiples tamaños: 16x16, 32x32, 48x48)

---

## 🛠️ Opciones para Generar los Favicons

### Opción 1: Usar un servicio online (Recomendado)

1. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - Sube el logo de Naste
   - Configura el color de fondo: `#8FA686`
   - Descarga el paquete completo
   - Mueve los archivos a las ubicaciones correctas

2. **Favicon.io** (https://favicon.io/)
   - Sube el logo PNG
   - Genera todos los tamaños
   - Descarga y coloca en las carpetas

### Opción 2: Usar ImageMagick (línea de comandos)

Si tienes ImageMagick instalado:

```bash
# Instalar ImageMagick (si no lo tienes)
brew install imagemagick

# Navegar a la carpeta del logo
cd /ruta/donde/esta/el/logo

# Generar los diferentes tamaños
convert logo.png -resize 16x16 src/assets/icons/favicon-16x16.png
convert logo.png -resize 32x32 src/assets/icons/favicon-32x32.png
convert logo.png -resize 180x180 src/assets/icons/apple-touch-icon.png
convert logo.png -resize 192x192 src/assets/icons/android-chrome-192x192.png
convert logo.png -resize 512x512 src/assets/icons/android-chrome-512x512.png

# Generar favicon.ico (contiene múltiples tamaños)
convert logo.png -define icon:auto-resize=48,32,16 src/favicon.ico
```

### Opción 3: Usar Photoshop/GIMP

1. Abre el logo en Photoshop o GIMP
2. Para cada tamaño:
   - Imagen → Tamaño de imagen
   - Establece el tamaño correspondiente
   - Exportar como PNG
3. Para el `.ico`, usa un plugin o herramienta online

### Opción 4: Usar script automático con sharp (Node.js)

Crea un archivo `generate-favicons.js` en la raíz del proyecto:

```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [
  { size: 16, name: 'favicon-16x16.png', path: 'src/assets/icons/' },
  { size: 32, name: 'favicon-32x32.png', path: 'src/assets/icons/' },
  { size: 180, name: 'apple-touch-icon.png', path: 'src/assets/icons/' },
  { size: 192, name: 'android-chrome-192x192.png', path: 'src/assets/icons/' },
  { size: 512, name: 'android-chrome-512x512.png', path: 'src/assets/icons/' },
];

async function generateFavicons() {
  const logoPath = './logo.png'; // Ruta al logo original

  for (const { size, name, path } of sizes) {
    await sharp(logoPath)
      .resize(size, size)
      .png()
      .toFile(path + name);
    console.log(`✅ Generado: ${name}`);
  }
}

generateFavicons().catch(console.error);
```

Luego ejecuta:

```bash
npm install sharp
node generate-favicons.js
```

---

## ✅ Verificación

Después de generar y colocar los archivos, verifica que existan:

```bash
# Verificar estructura
ls -la src/assets/icons/
ls -la src/favicon.ico
```

Deberías ver:

```
src/assets/icons/
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
└── android-chrome-512x512.png

src/
└── favicon.ico
```

---

## 🚀 Probar los cambios

1. Reinicia el servidor de desarrollo:

   ```bash
   npm run start
   ```

2. Abre la aplicación en el navegador

3. Verifica:
   - El favicon aparece en la pestaña del navegador
   - El título es "Naste Contabilidad"
   - Al inspeccionar el HTML, las meta tags están presentes

4. Para PWA, verifica en DevTools:
   - Application → Manifest
   - Debería mostrar el manifest.json con los iconos

---

## 📝 Notas importantes

- El logo debe tener fondo transparente (PNG)
- Los favicons cuadrados funcionan mejor
- El archivo `.ico` es para compatibilidad con navegadores antiguos
- Los archivos PNG se usan en navegadores modernos y PWA
- El `apple-touch-icon.png` es para dispositivos iOS cuando se agrega a la pantalla de inicio

---

## 🎨 Configuración completada

✅ index.html actualizado con meta tags y branding
✅ manifest.json creado para PWA
✅ angular.json configurado para incluir los assets
✅ Estructura de carpetas creada

**Siguiente paso**: Generar los archivos de favicon usando cualquiera de las opciones anteriores.
