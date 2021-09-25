// const mdLinks = require('../');
const {
  existPath,
  absolutePath,
  // isDirectory,
  // isFile,
  joinPaths,
  readDirectory,
  // isFileMd,
  // contentFile,
} = require('../src/index')


describe('existPath', () => {
  it('debería ser una función', () => {
    expect(typeof(existPath)).toBe('function');
  });
  it('deberia retornar true si la ruta existe', () => {
    expect(existPath('prueba')).toBe(true);
  });
  it('deberia retornar false si la ruta no existe', () => {
    expect(existPath('gitignore')).toBe(false);
  });
});

describe('absolutePath', () => {
  it('debería ser una función', () => {
    expect(typeof(absolutePath)).toBe('function');
  });
  it('deberia retornar convertir la ruta absoluta', () => {
    expect(absolutePath('README.md')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md');
  });
  it('deberia retornar la ruta absoluta', () => {
    expect(absolutePath('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Documentos\\Laboratoria015\\LIM015-md-links\\README.md');
  });
});

/* describe('isDirectory', () => {
  it('debería ser una función', () => {
    expect(typeof(isDirectory)).toBe('function');
  });
  it('deberia retornar true si es un directorio', () => {
    expect(isDirectory('prueba')).toBe(true);
  });
  it('deberia retornar false si no es un directorio', () => {
    expect(isDirectory('README.md')).toBe(false);
  });
}); */

/* describe('isFile', () => {
  it('debería ser una función', () => {
    expect(typeof(isFile)).toBe('function');
  });
  it('debería retornar true si es un archivo', () => {
    expect(isFile('README.md')).toBe(true);
  });
  it('deberia retornar false si no es un archivo', () => {
    expect(isFile('prueba')).toBe(false);
  });
}); */

describe('joinPaths', () => {
  it('debería ser una función', () => {
    expect(typeof(joinPaths)).toBe('function');
  });
  it('debería retornar dos rutas unidas', () => {
    const result = '\\home\\Laboratoria\\test';
    expect(joinPaths('/home/Laboratoria/', './test')).toBe(result);
  });
});

describe('readDirectory', () => {
  it('debería ser una función', () => {
    expect(typeof(readDirectory)).toBe('function');
  });
  it('debería ser un array con los archivos del directorio', () => {
    expect(readDirectory('prueba')).toEqual([ 'cursos', 'pruebaRecetas', 'README1.md' ]);
  });
});

/* describe('isFileMd', () => {
  it('debería ser una función', () => {
    expect(typeof(isFileMd)).toBe('function');
  });
  it('deberia retornar true para la extension .md', () => {
    expect(isFileMd('README.md')).toBe(true);
  });
  it('deberia retornar false para la extension .js', () => {
    expect(isFileMd('index.js')).toBe(false);
  });
}); */

/* describe('contentFile', () => {
  it('debería ser una función', () => {
    expect(typeof(contentFile)).toBe('function');
  });
  it('deberia retornar el contenido del archivo', () => {
    expect(contentFile('prueba\\cursos\\README2.md')).toEqual(`[Markdown](https://es.wikipedia.org/wiki/Markdown)`);
  });
}); */
