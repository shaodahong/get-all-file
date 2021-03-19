import getAllFile from './index';

describe('getAllFile', () => {
  const emptyErrorMsg = 'getAllFile path is required';
  const testPath = 'testPath';

  it('If path empty', () => {
    expect(() => getAllFile('')).toThrowError(emptyErrorMsg);
  });

  it('Correctly get file', () => {
    expect(getAllFile(testPath)).toEqual([
      { name: 'a', suffix: 'js' },
      {
        name: 'css',
        isDir: true,
      },
    ]);
  });

  it('Correctly get file with deep', () => {
    expect(
      getAllFile(testPath, {
        isDeep: true,
      }),
    ).toEqual([
      { name: 'a', suffix: 'js' },
      {
        name: 'css',
        isDir: true,
        children: [
          {
            name: 'a',
            suffix: 'css',
          },
        ],
      },
    ]);
  });

  it('Correctly get file with prefix', () => {
    expect(
      getAllFile(testPath, {
        isDeep: true,
        prefix: true,
      }),
    ).toEqual([
      { name: 'a', suffix: 'js' },
      {
        name: 'css',
        isDir: true,
        children: [
          {
            name: 'css/a',
            suffix: 'css',
          },
        ],
      },
    ]);
  });
});
