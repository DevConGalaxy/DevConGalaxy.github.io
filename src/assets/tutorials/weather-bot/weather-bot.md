---
title: Weather Forecast bot
duration: 30
---

--sep--
---
title: Introduction
duration: 3
---

# Introduction

This tutorial will be using the [botfuel-sample-starter](https://github.com/Botfuel/botfuel-sample-starter).

By the end of this tutorial, you will have a bot that is able to respond to greeting and say back your name. You will also know how to add new functionalities 
By the end of this tutorial, you will have a simple bot that is able to respond to a greeting and say back your name. You will also learn how to add new functionality that will allow the bot to understand a weather intent.

The goal of this tutorial is to create a bot that is reponding to weather forecast requests using the Qorkd Weather Online API.

<center>
<img src="./assets/tutorials/meteo-bot/images/demo.png" title="Final result" alt="Final result" targer="_blank" />
</center>

You can view a demo of the bot <a href="https://botfuel-webchat-demo.herokuapp.com/weather" target="_blank">here</a>


## What you will learn
* How to create a bot on the Botfuel platform
* How to train your bot
* How to make API call from your bot to answer user questions
* How to send quickreplies via your chatbot
* How to test your bot in the webchat

## what you will need
* A computer with a text editor installed like 
You can view a demo of the bot <a href="https://code.visualstudio.com/" target="_blank">vscode</a>
* A recent version of a web browser
* Basic knowledge javascript and nodejs


--sep--
---
title: Create a Botfuel App
duration: 5
---

Go create an account on [https://app.botfuel.io/apps](https://app.botfuel.io/apps)

Then create an app on [https://app.botfuel.io/apps/create](https://app.botfuel.io/apps/create)

Download the starter demo bot [here](https://github.com/Botfuel/botfuel-sample-starter/archive/master.zip)

At the root of your projectm create a config.js file with :

```javascript
module.exports = {
   locale: 'fr',
};
```

You can find more information on how to configure your bot [here](https://docs.botfuel.io/dialog/reference/configuration)

In a terminal, run a `npm install`

```bash
BOTFUEL_APP_ID=<...> BOTFUEL_APP_KEY=<...> BOTFUEL_APP_TOKEN=<...> npm start config 
```


--sep--
---
title: Configure your bot
duration: 5
---


Pour ce bot, il vous faudra implémenter des dialogs, intents, extractors, et views. Vous pouvez trouver des tutoriels et la documentation de référence sur https://docs.botfuel.io/, et vous inspirer de botfuel-sample-starter (https://github.com/Botfuel/botfuel-sample-starter).

Il vous faudra sans doute utiliser un PromptDialog (voir https://docs.botfuel.io/dialog/reference/dialogs/prompting-user-for-information) pour poser les questions à l’utilisateur.


--sep--
---
title: Webchat
duration: 5
---

--sep--
---
title: Implementation
duration: 5
---

--sep--
---
title: Call the API
duration: 5
---

```javascript

const options = {
       uri: 'http://api.worldweatheronline.com/premium/v1/weather.ashx',
       qs: {
         key: '556a3f21bf184a0c808150832182304', 
         q: location,
         format: 'json',
         date: formattedDate,
         lang: 'fr',
       },
       headers: {},
       json: true, // Automatically parses the JSON string in the response
};

const requestResult = await request(options);
```

--sep--
---
title: Quick replies
duration: 5
---

Vous pouvez ajouter des Quick Replies à votre bot pour indiquer plus rapidement certaines dates (aujourd’hui, demain, …).
Voir https://docs.botfuel.io/dialog/reference/messages#quickrepliesmessage pour plus de détails sur les Quick Replies.

--sep--
---
title: Add some images
duration: 5
---

Vous pouvez ajouter des images à afficher selon la météo (voir https://docs.botfuel.io/dialog/reference/images-in-bot-messages). 
Des images sont disponibles ici: https://drive.google.com/drive/folders/11GxjsG3upQCuVMnl2uYJrVXPSy3Qsubp
