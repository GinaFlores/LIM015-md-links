const path = require('path');
const fs = require('fs');
const userPath = process.argv[2];

// Validar si existe la ruta
const existPath = (route) => fs.existsSync(route); // Retorna booleano

// Verificar si es absoluta. Y si no lo es, convertirla a absoluta
const absolutePath = (route) => path.isAbsolute(route) ? (route) : path.resolve(route); // Retorna ruta absoluta

// Verificar si es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory(); // Retorna booleano

// Verificar si es un archivo
const isFile = (route) => fs.statSync(route).isFile(); // Retorna booleano

// Uniendo dos rutas
const joinPaths = (route, route2) => path.join(route, route2);

// Leer un directorio
const readDirectory = (route) => fs.readdirSync(route); // Retorna array de archivos o carpetas que hay en el directorio

// Leer extension md
const isFileMd = (route) => (path.extname(route) === '.md'); // Retorna la extensión de la ruta

// Lee contenido que hay dentro de un archivo
const contentFile = (route) => fs.readFileSync(route, 'utf-8');

// Función para recorrer directorio y obtener archivos .md
const getPathMd = (route) => {
    let arrayAllPath = [];
    if (isDirectory(route)) {
        const allDirectory = readDirectory(route)
        allDirectory.forEach(element => {
            const joinRoute = path.join(route, element);
            arrayAllPath = arrayAllPath.concat(getPathMd(joinRoute));
        });
    } else if (isFileMd(route)) {
        arrayAllPath.push(route)
    }
    const arrayAllMd = arrayAllPath.filter((route) => isFileMd(route));
    return arrayAllMd;
};
getPathMd(userPath);
console.log(getPathMd(userPath));

module.exports = {
    existPath,
    absolutePath,
    // isDirectory,
    // isFile,
    joinPaths,
    readDirectory,
    // isFileMd,
    // contentFile,
}
