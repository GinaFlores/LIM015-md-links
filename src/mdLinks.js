const api = require('./api.js');

// Función mdLink validate options
const mdLinks  = (route, option = {}) =>
    new Promise ((resolve, reject) => {
        if(!api.existPath(route)) {
            reject('La ruta no existe');
        } else {
            const allPaths = api.getPathMd(route);
            let arrayAllObject = [];
            allPaths.forEach(element => {
                const proLink = api.getLinks(element);
                arrayAllObject = arrayAllObject.concat(proLink);
            })
            if (!(option.validate)) {
                resolve(arrayAllObject);
            }
            else {
                const linkStatus = api.validateLinks(arrayAllObject);
                resolve(linkStatus)
            }
        }
    });

module.exports = { mdLinks }