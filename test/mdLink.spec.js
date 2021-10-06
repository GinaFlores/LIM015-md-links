const mdLinks = require('../src/mdLink.js');

describe('Funcion para validar options', () => {
    it('mdLink() debe ser una función', () => {
        expect(typeof(mdLinks.mdLink)).toBe('function');
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
        expect(mdLinks.mdLink(routeFile, { validate: false })).resolves.toEqual(validateFalse);
    });
    it('valite true: debería retornar href, text, file, status, messages', () => {
        const routeFile = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md';
        const validateTrue = [
            {
                file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md',
                href: 'https://es.wikipedia.org/wiki/Markdown',
                message: 'Ok',
                text: 'Markdown',
                status: 200,
            },
        ];
        expect(mdLinks.mdLink(routeFile, { validate: true })).resolves.toEqual(validateTrue);
    });
    it('mensaje de error si no existe ruta', () => {
        const fakeRoute = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\curso.js'
        const result = 'La ruta no existe';
        expect(mdLinks.mdLink(fakeRoute)).rejects.toEqual(result);
    });
});
