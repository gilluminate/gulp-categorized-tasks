const gulp = require("gulp");
const table = require("table");
const colors = require("ansi-colors");

function categorizeTasks(taskCategories) {
  taskCategories.forEach(category => {
    const keys = Object.keys(category);
    const key = keys[0];
    const taskTable = createTable(category[key]);
    console.log(); // space between categories
    console.log(colors.inverse(" " + key + " "));
    console.log(taskTable);
  });
}

function createTable(data) {
  data.forEach(element => {
    let taskName = element[0];
    // let taskRoot = taskName.indexOf(' ') ? taskName.split(' ')[0] : taskName;
    let deps = ' ';
    const tasksList = gulp.tree().nodes;
    const taskTree = gulp.tree({ deep: true }).nodes;
    
    if (tasksList.indexOf(taskName) > -1) {
      const taskIndex = tasksList.indexOf(taskName);
      // list dependencies
      if (taskTree[taskIndex].branch) {
        const depsArray = [];
        for (const node of taskTree[taskIndex].nodes[0].nodes) {
          console.log(node.label)
          depsArray.push(node.label);
        }
        deps = depsArray.join(", ");
        if (deps === "") {
          deps = ' '
        }
      }
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
  // data.unshift(["Task", "Description", "Dependencies"]);
  const output = table.table(data, {
    drawHorizontalLine: (index, size) => {
      return index === 0 || index === 1 || index === size;
    }
  });
  return output;
}

module.exports = categorizeTasks;
