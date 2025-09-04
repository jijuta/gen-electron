const remote = require("electron").remote;
const { dialog } = require("electron").remote;
const fs = require("fs");
const shell = require("shelljs");
const camelCase = require("camelcase");

function setSaveFile(payload) {
  // console.log(payload);
  let dir = remote.app;
  let dir1 = payload.config.projectdir;
  // console.log(" payload.config :::", payload.type, payload.config);
  let dir2 = "";

  switch (payload.type) {
    case "vo":
      dir2 = payload.config.dir_vo;
      break;
    case "controller":
      dir2 = payload.config.dir_controller;
      break;
    case "web":
      dir2 = payload.config.dir_web;
      break;
    case "impl":
      dir2 = payload.config.dir_impl;
      break;
    case "dao":
      dir2 = payload.config.dir_dao;
      break;
    case "service":
      dir2 = payload.config.dir_service;
      break;
    case "mapper":
      dir2 = payload.config.dir_xml;
      break;
    case "xml":
      dir2 = payload.config.dir_xml;
      break;
    case "xml_config":
      dir2 = payload.config.dir_mapper_config;
      break;
    case "validator":
      dir2 = payload.config.dir_validator;
      break;
    case "jsp":
      dir2 = payload.config.dir_jsp;
      break;
    case "total":
      // dir1 = "C:/Users/user/app/paystubs";
      dir2 = payload.config.dir_totals;
      break;
    case "js":
      dir2 = payload.config.dir_js;
      break;
    case "titles":
      dir2 = payload.config.dir_jsp;
      break;
    /**
 * TS
 */
    case "SpringBoot":
      dir2 = payload.config.dir_springboot;
      break;
    case "SpringBoot-DTO":
      dir2 = payload.config.dir_springboot_dto;
      break;
    case "SpringBoot-XML":
      dir2 = payload.config.dir_springboot_xml;
      break;
    case "SpringBoot-VUE":
      dir2 = payload.config.dir_springboot_vue;
      break;
    case "SpringBoot-VUE-component":
      dir2 = payload.config.dir_springboot_vue_component;
      break;
    default:
      dir2 = payload.config.dir_java;
      break;
  }
  // alert(dir2);
  let dir3 = dir1 + dir2.replacecUrlwindows2();

  let moduleDir = dir3;
  let saevFilename = moduleDir + "\\" + payload.sample + "." + payload.ext;
  if (process.platform === "darwin") {
    dir3 = dir1 + dir2.replacecUrl();
    moduleDir = dir3.replacecUrlDot();
    saevFilename = moduleDir + "/" + payload.sample + "." + payload.ext;
  }
  if (!fs.existsSync(moduleDir)) {
    shell.mkdir("-p", moduleDir);
  }
  // alert(dir2);

  if (payload.type === "total") {
    fs.writeFile(saevFilename, payload.vhtml, function (err) {
      if (err !== undefined) {
      } else {
        dialog.showErrorBox("File Save Error", err.message);
      }
    });

  } else {
    fs.writeFile(saevFilename, payload.vhtml, function (err) {
      if (err !== undefined) {
      } else {
        dialog.showErrorBox("File Save Error", err.message);
      }
    });
  }

  console.log("파일 저장 ########################################");
  console.log("saevFilename ::: ", dir1, dir2, dir2.replacecUrlwindows2(), saevFilename);
  console.log(dir1);
  console.log(dir2);
  console.log(dir2.replacecUrlwindows2());
  console.log(dir3);
  console.log(moduleDir);
  console.log("######################################## 파일저장 끝");

  if (payload.popup && payload.popup !== undefined && payload.popup !== "" && payload.popup !== "undefined") {
    dialog.showSaveDialog(
      {
        defaultPath: saevFilename,
        filters: [
          {
            name: payload.ext,
            extensions: [payload.ext]
          },
          /*{
            name: "java",
            extensions: ["java"]
          },
          {
            name: "xml",
            extensions: ["xml"]
          },
          {
            name: "html",
            extensions: ["html"]
          },
          {
            name: "css",
            extensions: ["css"]
          },
          {
            name: "js",
            extensions: ["js"]
          },
          {
            name: "vue",
            extensions: ["vue"]
          },
          {
            name: "json",
            extensions: ["json"]
          },*/
          {
            name: "All",
            extensions: ["*"]
          }
        ]
      },
      function (fileName) {
        //console.log(fileName);
        if (fileName === undefined) return;

        fs.writeFile(fileName, payload.vhtml, function (err) {
          if (err !== undefined) {
            //dialog.showMessageBox({
            //  message: "The file has been saved! :-)",
            //  buttons: ["OK"]
            //});
          } else {
            dialog.showErrorBox("File Save Error", err.message);
          }
        });
      }
    );
  }
}

module.exports = {
  getSaveFile: setSaveFile
}
