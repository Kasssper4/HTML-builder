const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

async function readFolder() {
  const files = await fsPromises.readdir(
    path.join(__dirname, "secret-folder"),
    { withFileTypes: true }
  );
  files.forEach(async (file) => {
    if (!file.isDirectory()) {
      let filePath = path.join(__dirname, "secret-folder", file.name);
      let fileName = path.basename(filePath);
      let fileExt = path.extname(fileName);
      let stat = await fsPromises.stat(filePath);
      console.log(`${fileName.replace(fileExt, "")} - ${fileExt.replace(".", "")} - ${stat.size}b`);
    }
  });
}
readFolder();
