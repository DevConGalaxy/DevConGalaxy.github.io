# Workshop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Add a new workshop

#### tutorial.json
Add a new entry in the `tutorials` array in the tutorials.json file
```json
{
      "id": "tutorial-id",
      "title": "Tutorial title",
      "language": "fr",
      "date": "Mon Jul 16 2020 00:00:00 GMT+0100",
      "icon": "quantum",
      "tags": ["Q#", "quantum computing", "jupyter notebook"],
      "status": "published"
    }
```

`id` must be the same as the tutorial folder

`date` is the publication date

`icon` can be `iot` or `quantum`

`status` can be `draft` or `published`. Tutorials in draft won't appear on the main page but will still be accessible via direct link  