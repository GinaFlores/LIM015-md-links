const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { errorRoute } = require('./cli-stats.js');
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
    const linkArray = [];
    getPathMd(route).forEach((element) => {
        const fileMdContent = readFile(element);
        const fileLink = fileMdContent.match(regEx);
        if (fileMdContent.length > 0 && regEx.test(fileMdContent) === true) {
            fileLink.forEach((link) => {
                const linkObject = {
                    href: link.match(regExLink).join().slice(1,-1),
                    text: link.match(regExText).join().slice(1,-1),
                    file: element,
                };
                linkArray.push(linkObject);
            });
        } else if (!regEx.test(fileMdContent)) {
            console.log(errorRoute);
        }
    })
    return linkArray.length !== 0 ? linkArray : ' '
};

// Función para validar los links
const validateLinks = (arrayLink) => {
    const arrStatus = arrayLink.map((link) => {
        return fetch(link.href)
        .then((result) => {
            const statusText = result.status === 200 ? 'Ok' : 'Fail';
            const data = {
                href: link.href,
                text: (link.text.slice(0, 50)), // Para limitar el texto a 50 caracteres
                file: link.file,
                status: result.status,
                message: statusText,
            };
            return data;
        })
        .catch((error) => {
            const data = {
                href: link.href,
                text: link.text,
                file: link.file,
                status: `No status ${error.message}`,
                message: 'Fail',
            };
            return data;
        });
    });
    return Promise.all(arrStatus)
};

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
