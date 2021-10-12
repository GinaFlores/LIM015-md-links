const api = require('./api.js');
// const { errorRoute } = require('./cli-stats.js');

// Función mdLink validate options
const mdLinks  = (route, option = {}) =>
    new Promise ((resolve, reject) => {
        if(!api.existPath(route)) {
            reject('La ruta no existe');
        } else {
            const arrayAllObject = api.getLinks(route);
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