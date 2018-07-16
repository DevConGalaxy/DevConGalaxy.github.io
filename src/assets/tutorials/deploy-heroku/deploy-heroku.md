---
title: Deploying to Heroku
duration: 26
---

--sep--
---
title: Introduction
duration: 5
---

# Introduction

A Chatbot built with Botfuel Dialog is a simple webserver, therefore, deploying to Heroku is very simple!

In this tutorial, you'll learn how to deploy your chatbot using Botfuel Webchat to Heroku.
Heroku is a Platform as a Service (PaaS) that automates the configuration, deployment and ongoing management of applications in the cloud.

## what you will need
* Have completed the <a href="/#/codelab/getting-started) tutorial" target="_blank">Getting Started</a>
* A working chatbot built with Botfuel dialog hosted on github
* An <a href="https://www.heroku.com/" target="_blank">Heroku account</a>


We’ll proceed in three steps:

* Add Heroku and Botfuel Webchat configurations to your chatbot
* Deploy it to Heroku
* Try it in the Botfuel Webchat Playground

--sep--
---
title: Configuration
duration: 5
---

# Configuration

In your bot root directory, create a file named `botfuel-config.js` with the following content:

```javascript
module.exports = {
  adapter: {
    name: 'botfuel',
  },
};
```

This will simply tell your bot to use the Botfuel Webchat adapter.

You'll also need `Procfile` file with this content:

```shell
web: npm run start botfuel-config
```

A Procfile is a simple text file that tells Heroku what command to run to launch your app. Here we just run `npm run start` with the config file `botfuel-config`.

Make sure you have a `start` script in your `package.json` file:

```json
"scripts": {
  "start": "botfuel-run",
},
```

Once your bot is configured as shown above, push your code to a repository on GitHub.
We’ll now connect your repository to Heroku.

--sep--
---
title: Deployment
duration: 10
---

# Deployment

Once logged into Heroku, create a new app:

<br>
<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/new-heroku-app.png" alt="Create a new Heroku app"/>
<br>

Give it the name you want, choose a region, then click on "Create app":

<br>
<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/new-heroku-app2.png" alt="Create a new Heroku app 2"/>
<br>

In the Deploy tab, click on GitHub for the Deployment method.
You can now search for your GitHub repository and connect it by clicking on the "Connect" button:

<br>
<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/connect-github.png" alt="Connect Heroku app to GitHub"/>
<br>

Finally, we need to fill in the environment variables.
Click on the Settings tab and then on the "Reveal Config Vars" button:

<br>
<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/env-vars.png" alt="Set environment variables"/>
<br>

Add the App Token, App Id and App Key of your app:

<br>
<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/env-vars2.png" alt="Set Botfuel environment variables"/>
<br>

Done! Your bot should be up and running on `https://heroku-tutorial-bot.herokuapp.com` (replace `heroku-tutorial-bot` with the name of your app).

--sep--
---
title: See it in action
duration: 5
---

# See it in action

Now, to see it in action in the Botfuel Webchat, go to the <a href="https://app.botfuel.io">Botfuel Developer Portal</a> and login.

Click on the "Webchat" button of your app:

<br>

<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/webchat-button.png" alt="Webchat button"/>

<br>

Then on the "Configuration" tab:

<br>

<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/webchat-config.png" alt="Webchat configuration"/>

<br>

Here you’ll need to set your bot endpoint. This is the URL to which Botfuel Webchat will send the user messages.
In our case it is `https://heroku-tutorial-bot.herokuapp.com/webhook` (replace `heroku-tutorial-bot` with the name of your app).

<br>

<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/webchat-endpoint.png" alt="Webchat endpoint"/>

Click on the "Playground" tab and try sending messages to your chatbot:

<img src="https://github.com/Botfuel/tutorials/raw/master/deploy-heroku/images/webchat-playground.png" alt="Webchat playground test"/>

Your chatbot will answer right in the Webchat! Congratulations, you deployed your bot!

--sep--
---
title: Congratulations
duration: 1
---

You have reached the end of this tutorial. You can now deploy a bot in production and make your users test it \o/

Learn more :
* The SDK <a href="https://docs.botfuel.io/" target="_blank">documentation</a>
* Deploy your chatbot on Facebook Messenger with <a href="http://localhost:4200/#/codelab/connect-messenger?step=1" target="_blank">this tutorial</a>