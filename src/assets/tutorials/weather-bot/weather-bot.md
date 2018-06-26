---
title: Chatbot Météo
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
<img src="./assets/tutorials/weather-bot/images/demo.png" title="Final result" alt="Final result" targer="_blank" />
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
* NodeJS installed on your computer
* ngrok installed


--sep--
---
title: Create a Botfuel App
duration: 5
---

# Setting up

1. Go create an account on <a href="https://app.botfuel.io/apps" target="_blank">https://app.botfuel.io/apps</a>
2. Then create an app on <a href="https://app.botfuel.io/apps/create" target="_blank">https://app.botfuel.io/apps/create</a>

Vous pourrez trouvez un guide pour créer une App <a href="http://localhost:4200/#/codelab/getting-started?step=2">ici</a>
<aside class="infos">La langue que vous choisissez lors de la création du Bot ne peut être changée par la suite. Elle sera utilisée par le trainer pour comprendre les "Training Phrases".</aside>


## Install the starter bot

Pour commencer ce tutorial, nous allons utiliser un bot existant qui répond quand on lui dit bonjour et vous répond votre nom lorsque vous vous présentez.

Pour récuperer le code, vous pouvez soit cloner le repository Github:

```bash
git clone https://github.com/Botfuel/botfuel-sample-starter.git
```

Ou, vous pouvez cliquer sur le lien suivant pour télécharger le code :

<a class="btn-info" href="https://github.com/Botfuel/botfuel-sample-starter/archive/master.zip" target="_blank"><i class="fas fa-download"></i> Download source code</a>

A la racine de votre projet, créez un fichier config.js contenant:

```javascript
module.exports = {
   locale: 'fr',
};
```

Vous pouvez trouver plus d'informations sur comment configurer votre bot <a href="https://docs.botfuel.io/dialog/reference/configuration" target="blank">ici</a>

Rendez-vous ensuite dans le repertoire de votre projet puir faite un `npm install`

Il ne vous reste ensuite plus qu'à lancer votre bot dans un terminal grâce aux informations que vous trouverez dans la page `App settings` du trainer.
```bash
BOTFUEL_APP_ID=<...> BOTFUEL_APP_KEY=<...> BOTFUEL_APP_TOKEN=<...> npm start config 
```

--sep--
---
title: Entrainez votre bot
duration: 3
---

# Entrainez votre bot

On the `Trainer/Intents` page, click on the `Add intent` button to create an intent labelled `greetings` with the description “User greets the bot”. Leave the `User prompt` field empty.

<aside class="warning">The label can only contains lowercase letters, numbers, hyphens without spaces. It also cannot start or end with a hyphen.</aside>

The `Training phrases` lists all the phrases used to train your bot. Enter here what you believe your user may ask the bot.
Here, fill in the phrase “Hello bot.” and then press `enter`. Click the button `Save`.

![Adding an intent](./assets/tutorials/getting-started/images/getting_started-create_intent.png "Adding an intent")

Repeat the same steps and create an intent labeled `name`:

![Adding an intent 2](./assets/tutorials/getting-started/images/getting_started-create_intent2.png "Adding an intent 2")

Note here, when you put `My name is Bob.`, our trainer detects Bob as a forename, one of 31 built-in entities recognised by Botfuel.

<aside class="infos">Every time you click on the save button, your app is trained with the new training phrases.</aside>

You can check that the app is properly trained by using the test panel on the right of your screen and typing a sentence that is close to one of your training phrases:

![Test panel](./assets/tutorials/getting-started/images/getting_started-testpanel.png "Test panel")


--sep--
---
title: Utiliser le webchat
duration: 10
---

## Configuration du bot

Nous devons dire à notre bot que nous allons le déployer en utilisant l'adapter webchat

Modifiez votre fichier `config.js`et ajoutez-y l'adapter du webchat:

```bash
module.exports = {
  locale: 'fr',
  adapter: {
    name: 'botfuel',
  }
};
```

Vous devez ensuite redémarer votre bot afin de prendre en compte le nouvel adapter.

Si tout se passe bien, votre terminal devrait ressembler à cela:

```bash
2018-02-16T15:37:06.255Z - info: [Environment] BOTFUEL_APP_TOKEN=<the BOTFUEL_APP_TOKEN>
2018-02-16T15:37:06.258Z - info: [Environment] BOTFUEL_APP_ID=<the BOTFUEL_APP_ID>
2018-02-16T15:37:06.258Z - info: [Environment] BOTFUEL_APP_KEY= <the BOTFUEL_APP_KEY>
2018-02-16T15:37:06.395Z - info: [WebAdapter] run: listening on port 5000
```

La dernière ligne indique que votre bot écoute les messages sur `http://localhost:5000`. Nous allons maintenant pouvoir connecter le webchat sur notre bot!


## Affichage dans le webchat

Rendez-vous dans la partie Channel > Webchat de votre bot sur botfuel.io
<center>
<img src="./assets/tutorials/weather-bot/images/webchat-config.png" />
</center>

Vous pouvez voir deux champs sur la partie droite de votre écran:
* Bot endpoint
* Allowed origins

Le champ `Bot endpoint` défini l'url sur laquelle le webchat envera les messages entrés par l'utilisateur. Dans notre cas, notre chatbot écoute sur `http://localhost:5000`

<aside class="warning">
Nous avons ici un petit problème. En effet, vous aurez compris que `localhost` n'est pas accessible depuis le webchat. Nous devons disposer d'une url pouvant être accessible depuis internet.
Pour cela, nous recommandons d'utiliser un utilitaire comme ngrok.<br />
Suivez les <a href="https://ngrok.com/download">instructions</a> pour votre système d'exploitation puis lancez la commnde :

```bash
ngrok http 5000
```

Vous devriez ensuite avoir quelque chose comme ci-dessous: 

<center>
<img src="./assets/tutorials/weather-bot/images/ngrok.png" />
</center>

Copiez l'adresse située en face de Forwarding (ici `ttps://3efeb72c.ngrok.io`). Toutes les requètes envoyées à cette adresse seront redirigées vers votre bot.
</aside>

Dans le champ `Bot endpoint`, mettez l'url de votre bot
<center>
<img src="./assets/tutorials/weather-bot/images/webchat-how-endpoint.png">
</center>

Assurez vous d'avoir bien ajouté `/webhook` à la fin de l'adresse.

Le champ `Allowed Origin` permet d'entrer une liste des sites internet ayant l'autorisation d'afficher le Webchat 

<center>
<img src="./assets/tutorials/weather-bot/images/webchat-how-origins.png">
</center>

Cliquez ensuite sur le bouton `Save`.

## Test

Vous pouvez vérifier que votre chatbot marche dans le Webchat Playground en envoyant des messages

<center>
<img src="./assets/tutorials/weather-bot/images/webchat-starter-conversation.png">
</center>


--sep--
---
title: Ajouter votre bot sur votre site
duration: 5
---

# Ajouter votre bot sur votre site

En allant dans l'onglet `Code` du portail, vous trouverez un bout de code a oller dans votre site pour afficher le Webchat de votre bot.

```javascript
<script src="https://cdn.jsdelivr.net/npm/botfuel-webchat-client@3.13.8"></script>
  <script>
    BotfuelWebChat.init({
   appToken: '1409617781142'
});
  </script>
```

Vous pouvez retrouver toutes les options afin de configurer et personaliser le webchat <a href="https://docs.botfuel.io/api#webchat" target="_blank">ici</a>.

Voici un exemple de page web intégrand un Webchat

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  </head>
  <body>
    Webchat
    <script src="https://cdn.jsdelivr.net/npm/botfuel-webchat-client@3.9.1"></script>
    <script>
      BotfuelWebChat.init({
      appToken: 'THE_BOTFUEL_APP_TOKEN',
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
title: Ajouter la fonctionalité météo
duration: 20
---

# Ajouter la fonctionalité météo

## Créer l'intent Meteo


## Créer l'extracteur d'entités Meteo

Créer un nouveau fichier `meteo-extractor.js` dans le dossier `src/extractors` afin d'indiquer au bot que nous cherchons à extraire des noms de ville et des dates.

```javascript
const { WsExtractor } = require('botfuel-dialog');

class MeteoExtractor extends WsExtractor {}

MeteoExtractor.params = {
  dimensions: ['city', 'time'],
};

module.exports = MeteoExtractor;
```


## Créer le Dialog Meteo

Créez un fichier `meteo-dialog.js` dans le dossier `src/dialogs`. 

Comme notre bot à besoin de la ville et de la date afin de pouvoir répondre à l'utilisateur, le weather dialog est donc un `PromptDialog``

Nous devons indiquer à notre bot que nous allons extraire une entité de type `city` ainsi qu'une entité de type `time`. Les clés `location` et `date` nous permettrons d'accéder aux valeures extraites.

```javascript
const { PromptDialog } = require('botfuel-dialog');

class MeteoDialog extends PromptDialog {
}

MeteoDialog.params = {
  namespace: 'meteo',
  entities: {
    location: {
      dim: 'city',
      priority: 10,
    },
    date: {
      dim: 'time',
    },
  },
};
module.exports = MeteoDialog;
```


## Créer la view Meteo

Créez un fichier `meteo-view.js` dans le dossier `src/views`. 

```javascript
const { PromptView, BotTextMessage } = require('botfuel-dialog');

class MeteoView extends PromptView {
  render(userMessage, { matchedEntities, missingEntities, meteoData }) {
    const messages = [];

    // On commencer par récupérer les valeurs extraites pour la ville et la date si ceux-ci ont été renseignés
    const location = matchedEntities.location && matchedEntities.location.values[0].value;
    const date = matchedEntities.date && new Date(matchedEntities.date.values[0].milliseconds);

    messages.push(new BotTextMessage(`Vous avez demandé la météo pour ${location} le ${date}`));

    return messages;
  }
}
module.exports = MeteoView;
```


--sep--
---
title: Appeler l'API de météo
duration: 5
---

# Appeler l'API de météo

Pour l'instant, notre bot ne renvoi pas la météo
## Installer node-fetch

Commencez par installer le package nodejs `node-fetch` afin de pouvoir faire des appels REST à l'API de météo

```bash
npm install node-fetch --save
```

<aside class="infos">node-fetch est une bibliothèque qui apporte window.fetch dans Nodejs</aside>

Dans le fichier meteo-dialog.js
```javascript
class MeteoDialog extends PromptDialog {
  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
    if (missingEntities.size === 0) {
      const date = matchedEntities.date && new Date(matchedEntities.date.values[0].milliseconds);
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const location = matchedEntities.location && matchedEntities.location.values[0].value;

      const response = await fetch(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=8c021b4e600b4cd8b24194452182606&q=${location}&format=json&date=${formattedDate}&lang=fr`);      
      const data = await response.json();
      const weatherData = data.data;

      return { weatherData };
    }

    return null;
  }
}
```

Dans le fichier meteo-view.js
```javascript
...
if (missingEntities.size === 0) {
  if (date - Date.now() > 15 * 86400000) {
    messages.push(new BotTextMessage("Desolé, On n'a pas les données pour cette date"));
  } else {
    messages.push(
      new BotTextMessage(
        `Voila la météo pour ${location} le ${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()}.`,
      ),
    );

    const maxTemp = weatherData.weather[0].maxtempC;
    const minTemp = weatherData.weather[0].mintempC;
    const description = weatherData.weather[0].hourly[0].lang_fr['0'].value;

    messages.push(new BotTextMessage(`${description}, ${minTemp} - ${maxTemp} degrés Celsius`));
  }
}
...
```

--sep--
---
title: Gérer les questions partielles
duration: 10
---

# Gérer les questions partielles

Lorsque nous avons rentré les Training Phrases dans le trainer, nous avons entré des phrases comme `Quel temps fera-t-il demain?`.
Notre bot doit être capable de voir que l'information sur le lieu manque et la demander à l'utilisateur pour pouvoir lui donner la météo

Dans le fichier meteo-view.js
```javascript
...
if (missingEntities.size !== 0) {
  const entityName = missingEntities.keys().next().value;
  if (entityName === 'location') {
    messages.push(new BotTextMessage('Dans quelle ville?'));
  } else {
    messages.push(new BotTextMessage('Quel jour?'));
  }
}
...
```



--sep--
---
title: Ajouter des quick replies
duration: 5
---
Vous pouvez ajouter des Quick Replies à votre bot pour indiquer plus rapidement certaines dates (aujourd’hui, demain, …).
<a href="https://docs.botfuel.io/dialog/reference/messages#quickrepliesmessage" target="_blank">documentation des Quick replies</a>

Dans le fichier meteo-view.js
```javascript
const { QuickrepliesMessage } = require('botfuel-dialog');
...
if (missingEntities.size !== 0) {
  const entityName = missingEntities.keys().next().value;
  if (entityName === 'location') {
    messages.push(new BotTextMessage('Dans quelle ville?'));
  } else {
    messages.push(new BotTextMessage('Quel jour?'));
  }
  if (entityName === 'date') {
    messages.push(new QuickrepliesMessage(["Aujourd'hui", 'Demain', 'Dans 7 jours']));
  }
}
...
```


--sep--
---
title: Ajouter des images
duration: 5
---

* Créer un dossier static/images
* 

Dans weather-view.js

```javascript
if (Object.keys(images).includes(description)) {
  messages.push(
    new BotImageMessage(WebAdapter.getStaticUrl(`images/${images[description]}`)),
  );
}
```

Pour en savoir plus sur comment marche BotImageMessage, rendez-cous sur la <a href="https://docs.botfuel.io/dialog/reference/images-in-bot-messages" target="_blank">documentation</a>

Vous pouvez télécharger un pack d'images <a href="https://drive.google.com/drive/folders/11GxjsG3upQCuVMnl2uYJrVXPSy3Qsubp" target="_blank">ici</a>


--sep--
---
title: Bravo
duration: 1
---

# Bravo

Vous avez atteind la fin de ce tutorial. Vous avez su prendre en main certains des principaux composants de Botfuel comme le Webchat, le trainer ou encore les QuickReplies.

Vous êtes maintenant en mesure de faire un bot en utilisant le SDK de Botfuel.

Pour en savoir plus :
* La <a href="https://docs.botfuel.io/" target="_blank">documentation</a> du SDK
* Deployez votre chatbot sur Heroku avec <a href="http://localhost:4200/#/codelab/deploy-heroku?step=1" target="_blank">ce tutoriel</a> (en anglais)
* Deployez votre chatbot sur Facebook Messenger en suivant <a href="http://localhost:4200/#/codelab/connect-messenger?step=1" target="_blank">ce tutorial</a>
