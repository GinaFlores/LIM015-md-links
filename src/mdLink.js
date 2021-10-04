const api = require('../src/api.js');

// Función mdLink validate options
const mdLink  = (route, option = {}) =>
    new Promise ((resolve, reject) => {
        if(!api.existPath(route)) {
            reject('No existe la ruta, vuelve a intentarlo');
        } else  {
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

const pruebaResultado = mdLink('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba', { validate: true });
pruebaResultado
.then((res) => console.log(res))
.catch((error) => console.log(error));