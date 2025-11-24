const fs = require("fs");
const path = require("path");

const root = __dirname;
const dist = path.join(root, "dist");
const assets = path.join(dist, "assets");

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copy(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function rewriteHtml(html) {
  return html
    .replace(/\.\/styles\.css/g, "./assets/styles.css")
    .replace(/\.\/script\.js/g, "./assets/script.js");
}

function build() {
  console.log("Building Airin landing page...");
  cleanDir(dist);
  fs.mkdirSync(assets, { recursive: true });

  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  fs.writeFileSync(path.join(dist, "index.html"), rewriteHtml(html));

  ["styles.css", "script.js"].forEach((file) => {
    copy(path.join(root, file), path.join(assets, file));
  });

  console.log("Created dist with index.html and assets/");
}

build();
