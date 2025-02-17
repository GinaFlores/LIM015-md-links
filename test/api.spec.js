const fetch = require('../__mock__/mock_fetch.js');
const api = require('../src/api.js');
// const { errorRoute } = require('../src/cli-stats.js');

describe('Función que verifica la existencia de una ruta ', () => {
  it('existPath() debe ser una función', () => {
    expect(typeof(api.existPath)).toBe('function');
  });
  it('debería retornar true si la ruta existe', () => {
    expect(api.existPath('prueba')).toBe(true);
  });
  it('debería retornar false si la ruta no existe', () => {
    expect(api.existPath('gitignore')).toBe(false);
  });
});

describe('Función que verifica si es ruta absoluta y la convierte', () => {
  it('absolutePath() debe ser una función', () => {
    expect(typeof(api.absolutePath)).toBe('function');
  });
  it('debería retornar la ruta absoluta', () => {
    expect(api.absolutePath('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md');
  });
  it('debería retornar la ruta absoluta convertida', () => {
    expect(api.absolutePath('README.md')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md');
  });
});

describe('Función para unir dos rutas', () => {
  it('joinPaths() debe ser una función', () => {
    expect(typeof(api.joinPaths)).toBe('function');
  });
  it('debería retornar dos rutas unidas', () => {
    const result = '\\home\\Laboratoria\\test';
    expect(api.joinPaths('/home/Laboratoria/', './test')).toBe(result);
  });
});

describe('Función que encuentra la extension de un archivo .md', () => {
  it('isFileMd() debe ser una función', () => {
    expect(typeof(api.isFileMd)).toBe('function');
  });
  it('debería retornar true para la extension .md', () => {
    expect(api.isFileMd('README.md')).toBe(true);
  });
  it('debería retornar false para la extension .js', () => {
    expect(api.isFileMd('index.js')).toBe(false);
  });
});

const pathDirectory = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba'
const pathMd = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md'
const result = [
  'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md',
  'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md',
  'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\pruebaRecetas\\recetas\\recetas.md'
];

describe('Función para recorrer directorio', () => {
  it('getPathMd() debe ser una función', () => {
    expect(typeof(api.getPathMd)).toBe('function');
  });
  it('debería retornar todos los archivos', () => {
    expect(api.getPathMd(pathDirectory)).toEqual(result);
  });
  it('debería retornar archivos .md', () => {
    expect(api.getPathMd(pathMd)).toEqual([pathMd]);
  });
});

describe('Funcion para obtener enlace de un archivo', () => {
  it('getLinks() debe ser una función', () => {
    expect(typeof(api.getLinks)).toBe('function');
  });
  it('debería devolver un array de objetos con tres propiedades: href, text y file', () => {
    const pathFile = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md';
    const result = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\cursos\\cursos.md'
      }
    ];
    expect(api.getLinks(pathFile)).toEqual(result);
  });
  it('debería devolver mensaje que no hay links', () => {
    const errorPath = 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\pruebaRecetas\\recetas\\recetas.md';
    expect(api.getLinks(errorPath)).toEqual(" ");
  })
});

const data = [
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
    text: 'Array - MDN',
    file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md',
  },
];

const dataError = [
  {
    href: 'https://facebook',
    text: 'Facebook',
    file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md',
  },
];

describe('Funcion para validar links con fetch', () => {
  it('validateLinks() debe ser una función', () => {
    expect(typeof(api.validateLinks)).toBe('function');
  });
  it('debería validar datos', () => {
    const output = [
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        text: 'Array - MDN',
        file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md',
        status: 200,
        message: 'Ok',
      },
    ];
    fetch.mockResolvedValue(data);
    return api.validateLinks(data).then((e) => {
      expect(e).toEqual(output);
    });
  });
  it('debería obtener error al validar', () => {
    const outputError = [
      {
        href: 'https://facebook',
        text: 'Facebook',
        file: 'C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\prueba\\prueba.md',
        status: 'No status request to https://facebook/ failed, reason: getaddrinfo ENOTFOUND facebook',
        message: 'Fail',
      },
    ];
    fetch.mockResolvedValue(dataError);
    return api.validateLinks(dataError).then((e) => {
      expect(e).toEqual(outputError);
    })
  });
});