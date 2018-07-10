---
title: Deploying on Google App Engine
duration: 31
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
duration: 5
---

# Configuration

Before deploying or bot to GAE, we need to configure it to work with the webchat. We will then start by pluging the webchat adaptor, named botfuel.

In the root directory of your bot, create a new file named `botfuel-config.js` with the following content:

```javascript
module.exports = {
  adapter: {
    name: 'botfuel',
  }
};
```

This will simply tell your bot to use the Botfuel Webchat adapter.

Edit your package.json and modify the start command to specify the config file we want to use when we launch the bot. When  you deploy your app, Google App Engine will run `npm install` or `yarn install` automaticaly and will use the `start` script to launch your app.

```javascript
"scripts": {
    "start": "botfuel-run botfuel-config.js",
    ...
}
```


--sep--
---
title: Deployment
duration: 10
---

# Deployment

## Create a project

Go to <a href="https://console.cloud.google.com" target="_blank">https://console.cloud.google.com</a> an log in with your Google account.

In the navbar, click on `Select a project`, then on `NEW PROJECT` to create a new project for your chatbot.

![Create new project](./assets/tutorials/deploy-gae/images/create_cloud_project.png "Create new project")

## Install the SDK

Let't go back to your local computer.

Google Cloud comes with a handy SDK and a command line interface that we will use to deploy our app.

Gol <a href="https://cloud.google.com/sdk/docs/" target="_blank">download</a> and install the SDK on your computer.


## Set up

You first need to initialize your gcloud account if you haven't done it yet. The `init` command performs the following steps :
* Authorize gcloud to access Google Cloud Platform using your credentials
* Set properties in gcloud configuration, including the current project, the region and zone

```shell
gcloud init
```

You then need to create a configuration file to let Google App Engine know what version of nodejs you want to use. We will also use this file to set the environment variables.

Create a file named `app.yaml` in the root directory of your project and rempace the varibles.

```yaml
runtime: nodejs8
env_variables:
  BOTFUEL_APP_TOKEN: <YOUR_APP_TOKEN>
  BOTFUEL_APP_ID: <YOUR_APP_ID>
  BOTFUEL_APP_KEY: <YOUR_APP_KEY>
```

<aside class="infos">
<b>Note:</b> The app.yaml is used to configure your app. You can find the all the possible properties <a href="https://cloud.google.com/appengine/docs/standard/nodejs/config/appref" target="_blank">here</a>
</aside>

## Deploy

Deploying on Google App Engine is very easy once you have the SDK installed. Simply run the command below 

```shell
gcloud app deploy
```

<center>
<img src="./assets/tutorials/deploy-gae/images/deploy.png" alt="Deploy project" title="Deploy project"/>
</center>

Your bot is now deployed on Google App Engine

--sep--
---
title: See it in action
duration: 5
---

# See it in action

Now, to see it in action in the Botfuel Webchat, go to the <a href="https://app.botfuel.io">Botfuel Developer Portal</a> and login.

Select your bot app and go to the `Channel > Webchat` page.

<img src="./assets/tutorials/deploy-gae/images/webchat-config.png" alt="Webchat configuration"/>

You can see two input text fields on the right panel:
* Bot endpoint
* Allowed origins

The input `Bot endpoint` is the URL to which Botfuel Webchat will send the user messages. In our case it is `https://getting-started-209712.appspot.com` (replace `getting-started-209712` with the id of your Google Cloud project).

In the `Bot endpoint`, put the url of your bot. You can find the url in your console once the deployment is done.

<center>
  <img src="./assets/tutorials/deploy-gae/images/webchat-endpoint.png">
</center>

Don't forget to add the `/webhook`at the end of the url.

The `Allowed origin` input lists the urls authorized to display and run the bot:
<center>
  <img src="./assets/tutorials/deploy-gae/images/webchat-origins.png" alt="Webchat playground test"/>
</center>

Clien on the `save button``

## Test

You can test your chatbot in the Webchat playground.

<center>
<img src="./assets/tutorials/deploy-gae/images/webchat-start-conversation.png">
</center>

--sep--
---
title: A little bit further
duration: 5
---

# A little bit firther

Let's go a little bit further and deploy our bot in our own webpage.
Botfuel uses a static folder 

Create a file `index.html` in the `src/static` folder of your bot.

```text
/src
  /static
    index.html
```

Copy and paste the code bolow in the `index.html` file.

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
        startOpen: true
      });
    </script>
  </body>
</html>
```

## Deploy your bot

Re-deploy your bot with the same command we use earlier


```shell
gcloud app deploy
```

You bot is now deployed and ready to be used. Simply go to the url of your bot followed by `/static`. In our case `https://getting-started-209712.appspot.com/static/` and you will be able to talk to your bot
=
<center>
<img src="./assets/tutorials/deploy-gae/images/webchat-live.png">
</center>


--sep--
---
title: Congratulations
duration: 1
---

You have reached the end of this tutorial. You can now deploy a bot in production and make your users test it \o/

Learn more :
* The SDK <a href="https://docs.botfuel.io/" target="_blank">documentation</a>
* Deploy your chatbot on Heroku <a href="http://localhost:4200/#/codelab/deploy-heroku?step=1" target="_blank">this tutorial</a>
* Deploy your chatbot on Facebook Messenger with <a href="http://localhost:4200/#/codelab/connect-messenger?step=1" target="_blank">this tutorial</a>