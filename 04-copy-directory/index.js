const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

async function copyDir () {
  await fsPromises.mkdir(path.join(__dirname, 'files-copy'), {recursive: true})
  let filesCopy = await fsPromises.readdir(path.join(__dirname, 'files-copy'))
  filesCopy.forEach(async file => {
    await fsPromises.unlink(path.join(__dirname, 'files-copy', file))
  })
  let filesToCopy = await fsPromises.readdir(path.join(__dirname, 'files'))
  filesToCopy.forEach(async fileToCopy => {
    const filePath = path.join(__dirname, 'files', fileToCopy)
    await fsPromises.copyFile(filePath, path.join(__dirname, 'files-copy', fileToCopy))
  })
}
copyDir()