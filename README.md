# gulp-categorized-tasks
Display a help dialog describing gulp tasks broken out by configurable categories. This can be helpful for gulpfile authors to communicate task information to their dev team. 

Dependecies are discovered and listed automatically.

Missing tasks will be called out as warning messages.

## Usage

Install using:

    npm i --save-dev gulp-categorized-tasks

Then add it to your gulpfile like so:

```js
var gulp = require('gulp');
var categorizedTasks = require('gulp-categorized-tasks');
```

Add a task to render the output

```js
gulp.task('tasks', function() {
    let taskCategories = [
        {
            'App Development Tasks': [
                ['default', 'Builds all app assets then begins watching'],
                ['dev-build', 'Builds all app assets without watching'],
                ['build-js', 'Compiles and bundles all app .ts files'],
                ['watch-app', 'Watches for changes on app assets'],
                ['sass-app', 'Compiles and bundles all app .scss files']
            ]
        },
        {
            'Website Development Tasks': [
                ['watch-public', 'Watches for changes on website assets'],
                ['public-bundle-templates', 'Converts html templates to js and bundles them'],
                ['sass-public', 'Compiles and bundles all website .scss files']
            ]
        },
        {
            Tests: [['test', 'Runs unit tests']]
        }
    ];
    categorizedTasks(taskCategories);
});
```

Now run `gulp tasks` and you'll see:

```
 App Development Tasks
╔═══════════╤════════════════════════════════════════════╤═════════════════════════════════════════════════════════════════╗
║ Task      │ Description                                │ Dependencies                                                    ║
╟───────────┼────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────╢
║ (default) │ Builds all app assets then begins watching │ devBuild                                                        ║
║ dev-build │ Builds all app assets without watching     │ test, bundle-templates, sass-app, build-js                      ║
║ build-js  │ Compiles and bundles all app .ts files     │ 'ts-compile', 'bundle-app'                                      ║
║ watch-app │ Watches for changes on app assets          │ livereload, watch-razor, watch-reload-css                       ║
║ sass-app  │ Compiles and bundles all app .scss files   │ sass-app-base, sass-app-mods, sass-app-modules, sass-app-vendor ║
╚═══════════╧════════════════════════════════════════════╧═════════════════════════════════════════════════════════════════╝


 Website Development Tasks
╔═════════════════════════╤════════════════════════════════════════════════╤═══════════════════════════════════════════╗
║ Task                    │ Description                                    │ Dependencies                              ║
╟─────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────────────╢
║ watch-public            │ Watches for changes on website assets          │ livereload, watch-razor, watch-reload-css ║
║ public-bundle-templates │ Converts html templates to js and bundles them │                                           ║
║ sass-public             │ Compiles and bundles all website .scss files   │                                           ║
╚═════════════════════════╧════════════════════════════════════════════════╧═══════════════════════════════════════════╝


 Tests
╔══════╤═════════════════╤══════════════╗
║ Task │ Description     │ Dependencies ║
╟──────┼─────────────────┼──────────────╢
║ test │ Runs unit tests │ csproj       ║
╚══════╧═════════════════╧══════════════╝
```

## API

The `categorizedTasks()` method expects a JSON configuration made up of an array containing one or more objects. Each object should have a key/value pair where the key is the *Category* and the value is an array. Each of those arrays should contain 2 values: the task name and the task description. (See example above)

```js
[
  {
    'category': [
      ['task-name': 'task description']...
    ]
  }...
]
```
