# Introduction

This tutorial will be using the [botfuel-sample-starter](https://github.com/Botfuel/botfuel-sample-starter).

By the end of this tutorial, you will have a bot that is able to respond to greeting and say back your name. You will also know how to add new functionalities 
By the end of this tutorial, you will have a simple bot that is able to respond to a greeting and say back your name. You will also learn how to add new functionality that will allow the bot to understand a weather intent.

The goal of this tutorial is to create a bot that is reponding to weather forecast requests using the Qorkd Weather Online API.

![Final result](/assets/tutorials/meteo-bot/images/demo.png "Final result")

```javascript
module.exports = {
   locale: 'fr',
};
````

## What you will learn
* How to create a bot on the Botfuel platform
* How to train your bot
* How to make API call from your bot to answer user questions
* How to send quickreplies via your chatbot
* How to test your bot in the webchat

## what you will need
* A computer with a text editor installed ([like vscode](https://code.visualstudio.com/))
* A recent version of a web browser
* Basic knowledge javascript and nodejs


---section---

Go create an account on [https://app.botfuel.io/apps](https://app.botfuel.io/apps)

```javascript
module.exports = {
   locale: 'fr',
};
```

You can find more information on how to configure your bot [here](https://docs.botfuel.io/dialog/reference/configuration)


```bash
BOTFUEL_APP_ID=<...> BOTFUEL_APP_KEY=<...> BOTFUEL_APP_TOKEN=<...> npm start config 
```