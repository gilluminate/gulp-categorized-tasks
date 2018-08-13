"use strict";

var gulp = require("gulp");
var table = require("table");
var colors = require("ansi-colors");

function categorizeTasks(taskCategories) {
  taskCategories.forEach(category => {
    let keys = Object.keys(category),
      key = keys[0];
    var taskTable = createTable(category[key]);
    console.log(); // space between categories
    console.log(colors.inverse(" " + key + " "));
    console.log(taskTable);
  });
}

function createTable(data) {
  data.forEach(element => {
    let taskName = element[0],
      deps;
    if (gulp.tasks[taskName]) {
      // list dependencies
      deps = gulp.tasks[taskName].dep.join(", ");
      element[2] = deps;

      // make default task special
      if (taskName === "default") {
        taskName = "(" + taskName + ")";
      }

      element[0] = colors.green(taskName);
    } else {
      element[2] = "";
      element[0] = "!" + colors.red(taskName);
      console.error(colors.red('"' + taskName + '" could not be found'));
    }
  });
  data.unshift(["Task", "Description", "Dependencies"]);
  let output = table.table(data, {
    drawHorizontalLine: function(index, size) {
      return index === 0 || index === 1 || index === size;
    }
  });
  return output;
}

module.exports = categorizeTasks;
