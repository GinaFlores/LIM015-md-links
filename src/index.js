const ruta = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md' // Ruta absoluta
const otraRuta = 'README.md' // Ruta relativa

const path = require('path');
const fs = require('fs');

// Validar si existe la ruta
const existPath = (route) => fs.existsSync(route); // Retorna booleano
console.log(existPath(ruta));
//const route = process.argv[2];
//console.log(route);

// Verificar si es absoluta. Y si no lo es, convertirla a absoluta
const absolutePath = (route) => path.isAbsolute(route) ? (route) : path.resolve(route); // Retorna ruta absoluta
console.log(absolutePath(otraRuta));

// Verificar si es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory(); // Retorna booleano
console.log('¿Es un directorio?', isDirectory('prueba'));
