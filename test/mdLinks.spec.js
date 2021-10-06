const mdLinks = require('../src/mdLinks.js');

describe('Funcion para validar options', () => {
    it('mdLinks() debe ser una función', () => {
        expect(typeof(mdLinks.mdLinks)).toBe('function');
    });
    it('valite: false: debería devolver href, text, file', () => {
    const routeFile = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md';
        const validateFalse = [
            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md',
            },
        ];
        expect(mdLinks.mdLinks(routeFile, { validate: false })).resolves.toEqual(validateFalse);
    });
    it('valite true: debería retornar href, text, file, status, messages', () => {
        const routeFile = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md';
        const validateTrue = [
            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md',
                status: 200,
                message: 'Ok',
            },
        ];
        expect(mdLinks.mdLinks(routeFile, { validate: true })).resolves.toEqual(validateTrue);
    });
    it('mensaje de error si no existe ruta', () => {
        const fakeRoute = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\curso.js'
        const result = 'La ruta no existe';
        expect(mdLinks.mdLinks(fakeRoute)).rejects.toEqual(result);
    });
});
