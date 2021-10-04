const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
// const userPath = process.argv[2];

// Validar si existe la ruta
const existPath = (route) => fs.existsSync(route); // Retorna booleano

// Verificar si es absoluta. Caso contrario la convierte a absoluta
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
const readFile = (route) => fs.readFileSync(route, 'utf-8');

// Función para recorrer directorio y obtener archivos .md
const getPathMd = (route) => {
    let arrayAllPath = [];
    if (isDirectory(route)) {
        const allDirectory = readDirectory(route)
        allDirectory.forEach(element => {
            const joinRoute = path.join(route, element);
            arrayAllPath = arrayAllPath.concat(getPathMd(joinRoute));
        });
    } else if (isFile(route)) {
        arrayAllPath.push(route)
    }
    const arrayAllMd = arrayAllPath.filter((route) => isFileMd(route));
    return arrayAllMd;
};

// Función para extraer links
const regEx = /!*\[(.+?)\]\((https?.+?)\)/gi;
const regExLink = /\((https?.+?)\)/gi;
const regExText = /\[[^\s]+(.+?)\]/gi;

const getLinks = (route) => {
    const fileMdContent = readFile(route).match(regEx);
    let linkArray = [];
    if (fileMdContent !== null) {
        fileMdContent.forEach((link) => {
            const linkObject = {
                href: link.match(regExLink).join().slice(1,-1),
                text: link.match(regExText).join().slice(1,-1),
                file: route,
            };
            linkArray.push(linkObject);
        });
    }
    return linkArray;
};
// const pruebita1 = getLinks('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md');
// console.log(pruebita1);

// Función para validar los links
const validateLinks = (arrayLink) => {
    const arrStatus = arrayLink.map((link) => {
        return fetch(link.href)
        .then((result) => {
            const statusText = result.status === 200 ? 'Ok' : 'Fail';
            const data = {
                file: link.file,
                href: link.href,
                message: statusText,
                text: (link.text.slice(0, 50)), // Para limitar el texto a 50 caracteres
                status: result.status,
            };
            return data;
        })
        .catch((error) => {
            const data = {
                href: link.href,
                status: 'No status',
                file: link.file,
                message: `Fail ${error.message}`,
            };
            return data;
        });
    });
    return Promise.all(arrStatus)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
};
// validateLinks(pruebita1)

module.exports = {
    existPath,
    absolutePath,
    joinPaths,
    readDirectory,
    isFileMd,
    getPathMd,
    getLinks,
    validateLinks,
}
