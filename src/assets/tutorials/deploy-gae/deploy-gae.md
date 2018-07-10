---
title: Deploying on Google App Engine
duration: 18
---

--sep--
---
title: Introduction
duration: 5
---

# Introduction

A Chatbot built with Botfuel Dialog is a simple webserver, therefore, deploying to Google App Engine is very simple!

In this tutorial, you'll learn how to deploy your chatbot using Botfuel Webchat to Google App Engine.

## what you will need
* Have completed the <a href="/#/codelab/getting-started) tutorial" target="_blank">Getting Started</a>
* A working chatbot built with Botfuel dialog
* A <a href="https://console.cloud.google.com//" target="_blank">Google Cloud account</a>


We’ll proceed in three steps:

* Add Google App Engine and Botfuel Webchat configurations to your chatbot
* Deploy it to Google App Engine
* Try it in the Botfuel Webchat Playground
* Add the webchat to a webpage

--sep--
---
title: Configuration
duration: 4
---

# Configuration

In the root directory of your bot, create a file named `botfuel-config.js` with the following content:

```javascript
module.exports = {
  adapter: {
    name: 'botfuel',
  },
};
```

This will simply tell your bot to use the Botfuel Webchat adapter.

Edit your package.json and modify the start command to specify the config file. When  you deploy your app, Google App Engine will run `npm install` or `yarn install` automaticaly and will use `npm start` to launch your app.

```javascript
"scripts": {
    "start": "botfuel-run botfuel-config.js",
    ...
}
```

Then link your project to your Google Cloud Account.

```shell
gcloud init
```

Google App Engine use an `app.yaml` file

```yaml
runtime: nodejs8
env_variables:
  BOTFUEL_APP_TOKEN: <YOUR_APP_TOKEN>
  BOTFUEL_APP_ID: <YOUR_APP_ID>
  BOTFUEL_APP_KEY: <YOUR_APP_KEY>
```

<aside class="infos">
The app.yaml is used to configure your app. You can find the all the possible properties <a href="https://cloud.google.com/appengine/docs/standard/nodejs/config/appref" target="_blank">here</a>
</aside>


--sep--
---
title: Deployment
duration: 5
---

# Set up

Google Cloud comes with a handy SDK and a command line interface that we will use to deploy our app.

<a href="https://cloud.google.com/sdk/docs/" target="_blank">Download</a> and install the SDK on your computer.

# Deploy

Deploying on Google App Engine is very easy once you have the SDK installed. Simply run the command below 

```shell
gcloud app deploy
```

# See logs

// Deployment console screenshot

// Google Console screenshot

--sep--
---
title: See it in action
duration: 3
---

# See it in action

Now, to see it in action in the Botfuel Webchat, go to the <a href="https://app.botfuel.io">Botfuel Developer Portal</a> and login.

Click on the "Webchat" button of your app:

<br>

<img src="./assets/tutorials/deploy-heroku/images/webchat-button.png" alt="Webchat button"/>

<br>

Then on the "Configuration" tab:

<br>

<img src="./assets/tutorials/deploy-heroku/images/webchat-config.png" alt="Webchat configuration"/>

<br>

Here you’ll need to set your bot endpoint. This is the URL to which Botfuel Webchat will send the user messages.
In our case it is `https://heroku-tutorial-bot.herokuapp.com/webhook` (replace `heroku-tutorial-bot` with the name of your app).

<br>

<img src="./assets/tutorials/deploy-heroku/images/webchat-endpoint.png" alt="Webchat endpoint"/>

Click on the "Playground" tab and try sending messages to your chatbot:

<img src="./assets/tutorials/deploy-heroku/images/webchat-playground.png" alt="Webchat playground test"/>

Your chatbot will answer right in the Webchat! Congratulations, you deployed your bot!

--sep--
---
title: A little bit further
duration: 5
---

Let's go a little bit further and deploy our bot in our own webpage.
Botfuel uses a static folder 

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  </head>
  <body>
    Webchat
    <script src="https://cdn.jsdelivr.net/npm/botfuel-webchat-client@3.13.5"></script>
    <script>
      BotfuelWebChat.init({
      appToken: '<YOUR_APP_TOKEN>',
      size: {
          width: 500,
          height: 600
      },
      startOpen: false,
      startFullScreen: false,
      theme: {
          colors: {
            background: '#ffffff',
            main: '#244891',
            primary: '#0084f4'
          },
          layout: {
            compact: false,
            rounded: false,
            shadowed: false,
            noHeader: false,
            noBorder: false,
            noHelpMessage: false
          }
      }
    });
    </script>
  </body>
</html>
```

--sep--
---
title: Congratulations
duration: 1
---

You have reached the end of this tutorial. You can now deploy a bot in production and make your users test it \o/

Learn more :
* The SDK <a href="https://docs.botfuel.io/" target="_blank">documentation</a>
* Deploy your chatbot on Facebook Messenger with <a href="http://localhost:4200/#/codelab/connect-messenger?step=1" target="_blank">this tutorial</a>