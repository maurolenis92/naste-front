const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = process.argv[2] || './src/assets/logo.png';

const sizes = [
  { size: 16, name: 'favicon-16x16.png', path: 'src/assets/icons/' },
  { size: 32, name: 'favicon-32x32.png', path: 'src/assets/icons/' },
  { size: 180, name: 'apple-touch-icon.png', path: 'src/assets/icons/' },
  { size: 192, name: 'android-chrome-192x192.png', path: 'src/assets/icons/' },
  { size: 512, name: 'android-chrome-512x512.png', path: 'src/assets/icons/' },
];

async function generateFavicons() {
  if (!fs.existsSync(logoPath)) {
    console.error(`❌ Error: No se encontró el logo en ${logoPath}`);
    console.log('Por favor, guarda el logo de Naste como src/assets/logo.png');
    process.exit(1);
  }

  console.log(`📸 Generando favicons desde: ${logoPath}\n`);

  for (const { size, name, path: folder } of sizes) {
    const outputPath = path.join(folder, name);

    await sharp(logoPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(outputPath);

    console.log(`✅ Generado: ${outputPath}`);
  }

  // Generar favicon.ico usando el tamaño de 32x32
  console.log('\n📦 Generando favicon.ico...');
  await sharp(logoPath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile('src/favicon.ico');

  console.log('✅ Generado: src/favicon.ico');
  console.log('\n🎉 ¡Todos los favicons han sido generados exitosamente!');
}

generateFavicons().catch(error => {
  console.error('❌ Error al generar favicons:', error);
  process.exit(1);
});
