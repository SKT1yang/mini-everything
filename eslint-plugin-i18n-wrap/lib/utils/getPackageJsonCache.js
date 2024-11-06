const path = require('path');
const fs = require('fs/promises');

/**
 * 递归扫描目录，查找所有 package.json 文件
 *
 * @param {string} dir - The root directory to start searching from.
 * @returns {Promise<string[]>} - A promise that resolves to an array of paths to package.json files.
 */
async function findPackageJsonFiles(dir, excludeDirs = new Set(['node_modules', 'publish'])) {
  /** @type {Array<string>} */
  let packageJsonFiles = [];

  // 获取当前目录下的所有文件和文件夹
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (let file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // 如果是目录，排除特定的目录
      if (!excludeDirs.has(file.name)) {
        // 递归处理子目录
        packageJsonFiles = [
          ...packageJsonFiles,
          ...(await findPackageJsonFiles(fullPath, excludeDirs)),
        ];
      }
    } else if (file.name === 'package.json') {
      // 发现 package.json 文件，读取它的路径
      packageJsonFiles.push(fullPath);
    }
  }

  return packageJsonFiles;
}

/**
 * 读取并解析 package.json 文件
 * @param {string} filePath
 * @returns
 */
async function getPackageJsonContent(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

/**
 * 获取所有 package.json 文件的路径及其内容
 * @param {string} rootDir
 * @returns
 */
async function getAllPackageJsonInfo(rootDir) {
  try {
    // 查找所有 package.json 文件路径
    const packageJsonFiles = await findPackageJsonFiles(rootDir);

    // 获取每个 package.json 文件的内容
    const packageJsonData = await Promise.all(
      packageJsonFiles.map(async (filePath) => {
        const content = await getPackageJsonContent(filePath);
        return { path: filePath, content };
      })
    );

    return packageJsonData;
  } catch (error) {
    console.error('Error reading package.json files:', error);
    return [];
  }
}


module.exports = {
  getAllPackageJsonInfo
}
