const stats = require('../src/cli-stats.js');
const links = [{
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
    text: 'Array.prototype.forEach() - MDN',
    file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md',
    status: 200,
    message: 'Ok'
},
{
    href: 'https://www.20thcenturystudios.com/404',
    text: 'Link Error',
    file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md',
    status: 404,
    message: 'Fail'
}]
const total = `Total: 2
Unique: 2`;
const broken =`Broken: 1`;

describe('statsLinks', () => {
    it('is a function', () => {
    expect(typeof stats.statsLinks).toBe('function');
    });
    it('debería retornar links total y únicos en un array', () => {
    expect(stats.statsLinks(links)).toEqual(total);
    });
    it('debería retornar links roto en un array', () => {
    expect(stats.brokenLinks(links)).toEqual(broken);
    });
})