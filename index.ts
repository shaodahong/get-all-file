import fs from 'fs';
import path from 'path';

interface Options {
  /**
   * Deep to get file when directory child.
   * @default false
   */
  isDeep?: boolean;
  /**
   * Return child name with parent path.
   * @default false
   */
  prefix?: boolean;
}

interface FileType {
  name: string;
  children?: FileType[];
  isDir?: boolean;
  suffix?: string;
}

function getAllFile(dir: string, options?: Options): FileType[] {
  if (!dir) {
    throw new Error('getAllFile path is required');
  }

  const { isDeep = false, prefix = false } = options || {};
  const allFile: FileType[] = [];

  function getFileTree(dirPath: string) {
    function getFiles(dirPath: string, arr: FileType[], prefixPath = '') {
      const filesList = fs.readdirSync(dirPath);

      for (let i = 0; i < filesList.length; i++) {
        const currentFile = filesList[i];
        const currentFileName = `${prefixPath ? `${prefixPath}/` : ''}${
          currentFile.split('.')[0]
        }`;
        const fileObj: FileType = {
          name: currentFileName,
        };
        const filePath = path.join(dirPath, currentFile);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          fileObj.isDir = true;
          arr.push(fileObj);
          if (!isDeep) {
            continue;
          }
          fileObj.children = [];
          getFiles(filePath, arr[i].children!, prefix ? currentFileName : '');
        } else {
          fileObj.suffix = path.extname(currentFile).substring(1);
          arr.push(fileObj);
        }
      }
    }

    getFiles(dirPath, allFile);

    return allFile;
  }

  getFileTree(dir);

  return allFile;
}

export default getAllFile;
