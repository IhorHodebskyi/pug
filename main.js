const fs = require("fs");
const pug = require("pug");
const age = require("./age");

const compileFunc = pug.compileFile("layout.pug");

fs.readdirSync("users").forEach((fileName) => {
  const userDta = JSON.parse(fs.readFileSync("users/" + fileName, "utf-8"));

  const data = {
    ...{ age },
    ...userDta,
  };
  console.log(data);
  const html = compileFunc(data);

  fs.writeFileSync("out/" + fileName.replace(".json", ".html"), html);
});

// const html = pug.renderFile("layout.pug");
// fs.writeFileSync("index.html", html);
