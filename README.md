# getAllFile

Get all file in the folder.

## Installation

```bash
yarn add get-all-file

// or

npm install get-all-file
```

## Usage

```js
import getAllFile from 'get-all-file';

const files = getAllFile('path');

// => [{name: 'a', suffix: 'js'}]
```

## API

### getAllFile(path, options?)

#### path

Type: `string`

Target folder path when get file.

#### options

Type: `object`

#### isDeep

Type: `boolean`
Default: `false`

Deep to get file when directory child.

#### prefix

Type: `boolean`
Default: `false`

Return child name with parent path.
