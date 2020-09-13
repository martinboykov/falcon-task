# TasksApp

![Build](https://github.com/martinboykov/falcon-task/workflows/Build/badge.svg)

Falcon Front-end development assignment

## Features
The application consists of:
-	`Welcome Page`, where you are welcomed to the app and encouraged to create your first task.
-	`Tasks-List Page`, where you can view all of the available tasks. There are functionality for `filtering` and `sorting` the tasks by their properties. Specifically you can filter the tasks by their `state of completion` by choosing either `completed` or `started`. From the list, you can choose to update or delete a task. You can also add a task by clicking on `Add Task` button. `Pagination` is also supported.
-	`Add/Update Page`, where you can add new task or update existing one.

## Architecture
The architecture of the application is following best practices by taking advantage of angular modularity.
The services, interceptors and handlers are provided in `Core` module.
Angular Material modules and Components that are used everywhere in the app are provided in `Shared` module. Future directives and pipes would be added here as well.
There is a `Feature` Tasks Module, which is lazy loaded and is responsible for the Tasks functionalities in the app.

## State
The state of the application is managed by `Ngrx `. Currently there is only `tasks state`. Two resolvers are prefetching data for `tasks list` and `task edit` routes.

## Error handling
The error handling is menaged by the `Global Error Handler` in Core module. It is connected to the notification service.

## Notification
For notification are used toastr messages via notification service.

## Logging
In eventual future development could be adopted logging via slack service.

## CI
For CI pipeline is used `Github Pages`.

## Quickstart
* Clone the repo and `cd` into it
* `cd` to server, `npm install` followed by `npm start`
* `cd` to client, `npm install` followed by `npm start`
* The application must be available at: [http://localhost:4200/](http://localhost:4200/)
