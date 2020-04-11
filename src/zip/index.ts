import Zip from "jszip";
import raw from "raw.macro";
import { saveAs } from "file-saver";

function lambda(js: string) {
  const file = new Zip();
  file.file("README.md", raw("./lambda/README.md"));
  file.file("template.yml", raw("./lambda/template.yml"));
  file.file("samconfig.toml", raw("./lambda/samconfig.toml"));
  file.file("index.js", js + "\n" + raw("./lambda/index.js"));

  file.generateAsync({ type: "blob" }).then((val) => {
    saveAs(val, "lambda.zip");
  });
}

lambda.title = "AWS Lambda";

function heroku(js: string) {
  const file = new Zip();
  file.file("README.md", raw("./heroku/README.md"));
  file.file("package.json", raw("./heroku/package.json"));
  file.file("index.js", js + "\n" + raw("./heroku/index.js"));

  file.generateAsync({ type: "blob" }).then((val) => {
    saveAs(val, "heroku.zip");
  });
}

heroku.title = "Heroku";

export const targets = [lambda, heroku];
