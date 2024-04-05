const fs = require("fs");
const pug = require("pug");
const age = require("./age");

// const compileFunc = pug.compileFile("layout.pug");

let users = [];

fs.readdirSync("users").forEach((fileName) => {
  const id = fileName.replace(".json", "");
  const userDta = JSON.parse(fs.readFileSync("users/" + fileName, "utf-8"));
  users.push(Object.assign({ id }, userDta));
});

function buildUserList() {
  const data = {
    base: {
      title: "Users",
      pageClass: "list,",
    },
    users,
  };
  const html = pug.renderFile("layout/index.pug", data);
  fs.writeFileSync("out/index.html", html);
}

function buildUsers() {
  let compileFunc = pug.compileFile("layout/user.pug");

  users.forEach((userData) => {
    let data = {
      base: {
        title: userData.name,
        pageClass: "user",
      },
      calcAge: age,
      user: userData,
    };

    let html = compileFunc(data);
    fs.writeFileSync("out/" + userData.id + ".html", html);
  });
}

buildUserList();

buildUsers();
