const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

async function mergeStyles() {
  const writeStream = fs.createWriteStream(
    path.join(__dirname, "project-dist", "bundle.css")
  );
  let getStyles = await fsPromises.readdir(path.join(__dirname, "styles"), {
    withFileTypes: true,
  });

  getStyles.forEach(async (styleFile) => {
    const filePath = path.join(__dirname, "styles", styleFile.name);
    if (styleFile.isFile() && path.extname(filePath) === ".css") {
      let readStream = fs.createReadStream(path.join(filePath));
      readStream.on("data", (data) => {
        writeStream.write(data.toString() + "\n");
      });
    }
  });
}
mergeStyles();
