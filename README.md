# Workshop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Add a new workshop

### Add workshop folder

Create a new folder in `assets/codelabs` with a name in lowercase letters.
The folder must look like this :
```bash
tutorial-name
  cover.png
  tutorial.md
  data.json
  solution.html
  images\
```

`cover.png` is the image that will be diaplayed as a header on the homepage of the platform.

`solution.html` The correction of the workshop can be put in this file. It is accessible when typing the konami code in a tutorial

Put all the images you need in the workshop in the `image` folder

#### data.json
The data.json file is used to add some extra data to the tutorial.
```json
{
    "resources": [
        {
            "label": "jupyter project Zip file",
            "type": "fas fa-download",
            "link": "./assets/codelabs/prog-quantique/algo.zip"
        },
        {
            "label": "Introduction à l'informatique quantique",
            "type": "fab fa-youtube",
            "link": "https://youtu.be/uQhyl_7dmzE"
        }        
    ]
}
```

Use font [awesome icons](https://fontawesome.com/icons?d=gallery&m=free) for the `type` property


#### tutorial.md
This is where you write your tutorial

Your file must start like this :
```markdhwo
---
title: Your Workshop Title
---

--sep--
---
title: First step of your workshop
---
```
The title will be displayed in the header of your workshop.

Then, separate the steps of your workshop with this markdown :
```
--sep--
---
title: Title of the step
---
```

### tutorial.json
Add a new entry in the `tutorials` array in the tutorials.json file
```json
{
      "id": "workshop-id",
      "title": "Workshop title",
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