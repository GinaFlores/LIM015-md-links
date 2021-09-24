const path = require('path');
const fs = require('fs');

const ruta = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md' // Ruta absoluta
const otraRuta = 'README.md' // Ruta relativa

// Validar si existe la ruta
const existPath = (route) => fs.existsSync(route); // Retorna booleano
//const route = process.argv[2];
//console.log(route);

// Verificar si es absoluta. Y si no lo es, convertirla a absoluta
const absolutePath = (route) => path.isAbsolute(route) ? (route) : path.resolve(route); // Retorna ruta absoluta

// Verificar si es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory(); // Retorna booleano

// Verificar si es un archivo
const isFile = (route) => fs.statSync(route).isFile(); // Retorna booleano

// Uniendo dos rutas
const joinPaths = (route, route2) => path.join(route, route2);

// Leer un archivo
const readFile = (route) => fs.readdirSync(route); // Retorna array de archivos o carpetas que hay en el directorio

// Leer extension md
const isFileMd = (route) => (path.extname(route) === '.md'); // Retorna la extensión de la ruta

// Lee contenido que hay dentro de un archivo
const contentFile = (route) => fs.readFileSync(route, 'utf-8');

module.exports = {
    existPath,
    absolutePath,
    isDirectory,
    isFile,
    joinPaths,
    readFile,
    isFileMd,
    contentFile,
}
