const ruta = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md' // Ruta absoluta
const otraRuta = 'README.md' // Ruta relativa

// Módulo para rutas de directorio y archivos
const path = require('path');

// Funcion para verificar si es absoluta o no
const isAbsoluta = (route) => path.isAbsolute(route);
console.log(isAbsoluta(otraRuta));
console.log(isAbsoluta(ruta));

// Funcion para convertir ruta relativa a absoluta
const resolveAbsoluta = (route) => path.resolve(route);
console.log(convertirAbsoluta(otraRuta));
