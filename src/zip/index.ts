import Zip from "jszip";
import raw from "raw.macro";
import { saveAs } from "file-saver";

function Lambda(js: string) {
  const file = new Zip();
  file.file("README.md", raw("./lambda/README.md"));
  file.file("template.yml", raw("./lambda/template.yml"));
  file.file("samconfig.toml", raw("./lambda/samconfig.toml"));
  file.file("index.js", js + "\n" + raw("./lambda/index.js"));

  file.generateAsync({ type: "blob" }).then((val) => {
    saveAs(val, "lambda.zip");
  });
}

Lambda.title = "AWS Lambda";

export const targets = [Lambda];
