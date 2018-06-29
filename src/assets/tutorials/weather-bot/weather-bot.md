---
title: Chatbot Météo
duration: 76
---

--sep--
---
title: Introduction
duration: 5
---

# Introduction

Ce tutoriel utilisera le <a href="https://github.com/Botfuel/botfuel-sample-starter">botfuel-sample-starter</a>

A la fin de ce tutoriel, vous aurez construit un bot capable de répondre à un utilisateur qui se présente. Vous aurez aussi vu comment ajouter de nouvelles fonctionnalités pour répondre lorsqu'un utilisateur demande la météo.

Le but de ce tutoriel est donc de créer un bot qui donnera la météo en utilisant l'API de World Weather Online.

<center>
<img src="./assets/tutorials/weather-bot/images/demo.png" title="Final result" alt="Final result" targer="_blank" />
</center>

Vous pouvez voir une démo du bot <a href="https://botfuel-webchat-demo.herokuapp.com/weather" target="_blank">ici</a>


## Vous allez apprendre
* A créer un bot sur la plateforme Botfuel
* A entraîner votre bot
* A faire appel à une API pour répondre à l'utilisateur
* A envoyer des Quick Replies via votre chatbot
* A tester votre bot dans le Webchat

## Vous aurez besoin
* D'un ordinateur avec un editeur de texte/code comme <a href="https://code.visualstudio.com/" target="_blank">vscode</a>
* D'un navigateur internet récent
* De connaissances de base en javascript et nodeJS
* De NodeJS installé sur votre ordinateur
* De ngrok installé sur votre ordinateur


--sep--
---
title: Création d'une app Botfuel
duration: 7
---

# Mise en place

1. Allez créer un compte sur <a href="https://app.botfuel.io/apps" target="_blank">https://app.botfuel.io/apps</a>
2. Puis créez une app sur <a href="https://app.botfuel.io/apps/create" target="_blank">https://app.botfuel.io/apps/create</a>

Vous pourrez trouver un guide pour créer une App <a href="https://codelabs-65b58.firebaseapp.com/#/codelab/getting-started?step=2" target="_blank">ici</a>
<aside class="infos"><b>Note:</b> La langue choisie  lors de la création du Bot ne peut être changée par la suite. Elle sera utilisée par le trainer pour comprendre les "Training Phrases".</aside>


## Installation du starter

Pour commencer ce tutoriel, nous allons utiliser un bot existant qui répond quand on lui dit "bonjour" et vous répond votre nom lorsque vous vous présentez.

Pour récupérer le code, vous pouvez soit cloner le repository Github:

```bash
git clone https://github.com/Botfuel/botfuel-sample-starter.git
```

Soit cliquer sur le lien suivant pour télécharger le code :

<a class="btn-info" href="https://github.com/Botfuel/botfuel-sample-starter/archive/master.zip" target="_blank"><i class="fas fa-download"></i> Télécharger le code source</a>

A la racine de votre projet, créez un fichier config.js contenant:

```javascript
module.exports = {
   locale: 'fr',
};
```

Vous pouvez trouver plus d'informations sur comment configurer votre bot <a href="https://docs.botfuel.io/dialog/reference/configuration" target="blank">ici</a>

Rendez-vous ensuite dans le répertoire de votre projet puis faite un `npm install`

Il ne vous reste plus qu'à lancer votre bot dans un terminal grâce aux informations que vous trouverez dans la page `App settings` du trainer.
```bash
BOTFUEL_APP_ID=<...> BOTFUEL_APP_KEY=<...> BOTFUEL_APP_TOKEN=<...> npm start config 
```

--sep--
---
title: Entraînez votre bot
duration: 5
---

# Entraînez votre bot

Dans la page `Trainer/Intents`, cliquez sur le bouton `Add intent` afin de créer un intent labellisé `greetings` avec la description "L'utilisateur salut le bot". Laissez le champ `User prompt` vide.

<aside class="warning"><b>Attention:</b> Le label ne peut contenir que des lettres en minuscule, des nombres, des traits d'unions sans espace. Il ne peut pas non plus commencer ou finir par un trait d'union.</aside>

La section des `Training phrases` liste toutes les phrases utilisées pour entraîner le bot. Entrez ce que vous pensez que vos utilisateurs demanderont au bot.
Ici, entrez la phrase "Bonjour bot" puis cliquez sur `entrer`. Cliquez ensuite sur le bouton `Save`.

![Adding an intent](./assets/tutorials/weather-bot/images/getting_started-create_intent.png "Adding an intent")

Faites la même chose pour créer un intent labellisé `name`:

![Adding an intent 2](./assets/tutorials/weather-bot/images/getting_started-create_intent2.png "Adding an intent 2")

Notez que ici, quand votre entrez `Mon nom est Bob`, notre trainer détecte que Bob est un prénom, une des 31 entités reconnues par défaut par Botfuel.

<aside class="infos"><b>Note:</b> A chaque fois que vous cliquez sur le bouton <code>save</code>, votre bot est entraîné avec les nouvelles "Training phrases".</aside>

Vous pouvez vérifier que votre bot est bien entraîné en utilisant le panneau de test sur la droite de votre écran en tapant une phrases proche de celles utilisées pour l'entraînement:

![Test panel](./assets/tutorials/weather-bot/images/getting_started-testpanel.png "Test panel")


--sep--
---
title: Utiliser le webchat
duration: 10
---

## Configuration du bot

Pour l'instant, notre chatbot fonctionne avec l'adapteur `shell` par défaut. Nous devons lui dire que nous allons le déployer en utilisant l'adapteur webchat.

Modifiez votre fichier `config.js`et ajoutez-y l'adapteur du webchat:

```bash
module.exports = {
  locale: 'fr',
  adapter: {
    name: 'botfuel',
  }
};
```

Vous devez ensuite redémarrer votre bot afin de prendre en compte le nouvel adapteur.

Si tout se passe bien, votre terminal devrait ressembler à cela:

```bash
2018-02-16T15:37:06.255Z - info: [Environment] BOTFUEL_APP_TOKEN=<the BOTFUEL_APP_TOKEN>
2018-02-16T15:37:06.258Z - info: [Environment] BOTFUEL_APP_ID=<the BOTFUEL_APP_ID>
2018-02-16T15:37:06.258Z - info: [Environment] BOTFUEL_APP_KEY= <the BOTFUEL_APP_KEY>
2018-02-16T15:37:06.395Z - info: [WebAdapter] run: listening on port 5000
```

La dernière ligne indique que votre bot écoute les messages sur `http://localhost:5000`. Nous allons maintenant pouvoir connecter le webchat sur notre bot !


## Affichage dans le webchat

Rendez-vous dans la partie `Channel > Webchat` de votre bot sur <a href="https://app.botfuel.io" target="_blank">https://app.botfuel.io</a>

<center>
<img src="./assets/tutorials/weather-bot/images/webchat-config.png" />
</center>

Vous pouvez voir deux champs sur la partie droite de votre écran :
* Bot endpoint
* Allowed origins

Le champ `Bot endpoint` définit l'url sur laquelle le webchat enverra les messages entrés par l'utilisateur. Dans notre cas, notre chatbot écoute sur `http://localhost:5000`

<aside class="warning">
<b>Attention:</b> Nous avons ici un petit problème. En effet, vous aurez compris que `localhost` n'est pas accessible depuis le webchat. Nous devons disposer d'une url pouvant être accessible depuis internet.
Pour cela, nous recommandons d'utiliser un utilitaire comme ngrok.<br />
Suivez les <a href="https://ngrok.com/download">instructions</a> pour votre système d'exploitation puis lancez la commnde :

```bash
ngrok http 5000
```

Vous devriez ensuite avoir quelque chose comme ci-dessous : 

<center>
<img src="./assets/tutorials/weather-bot/images/ngrok.png" />
</center>

Copiez l'adresse située en face de Forwarding (ici `https://3efeb72c.ngrok.io`). Toutes les requètes envoyées à cette adresse seront redirigées vers votre bot.
</aside>

Dans le champ `Bot endpoint`, mettez l'url de votre bot
<center>
<img src="./assets/tutorials/weather-bot/images/webchat-how-endpoint.png">
</center>

Assurez vous d'avoir bien ajouté `/webhook` à la fin de l'adresse.

Le champ `Allowed origin` permet d'entrer une liste des sites internet ayant l'autorisation d'afficher le Webchat 

<center>
<img src="./assets/tutorials/weather-bot/images/webchat-how-origins.png">
</center>

Cliquez ensuite sur le bouton `Save`.

## Test

Vous pouvez vérifier que votre chatbot marche dans le Webchat Playground en envoyant des messages.

<center>
<img src="./assets/tutorials/weather-bot/images/webchat-start-conversation.png">
</center>


--sep--
---
title: Ajouter votre bot sur votre site
duration: 5
---

# Ajouter votre bot sur votre site

En allant dans l'onglet `Code` du portail, vous trouverez un bout de code à coller dans votre site pour afficher le Webchat de votre bot.

```javascript
<script src="https://cdn.jsdelivr.net/npm/botfuel-webchat-client@3.13.8"></script>
  <script>
    BotfuelWebChat.init({
   appToken: '1409617781142'
});
  </script>
```

Vous pouvez retrouver toutes les options afin de configurer et personnaliser le webchat <a href="https://docs.botfuel.io/api#webchat" target="_blank">ici</a>.

Voici un exemple de page web intégrant le Webchat. 

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

Il ne vous reste plus qu'à lancer votre page html en double cliquant dessus.
Vous devriez avoir une page web avec le bouton  pour lancer le chatbot en bas à droite.
<center>
<img src="./assets/tutorials/weather-bot/images/webchat0.png" target="_blank" />
</center>

--sep--
---
title: Ajouter la fonctionnalité météo
duration: 12
---

# Ajouter la fonctionnalité météo

## Créez l'intent Météo

Nous allons devoir rajouter un nouvel `intent` dans le trainer. Pour cela, répétez ce que vous avez fait à l'étape 3 pour créer l'intent météo.

<center>
<img src="./assets/tutorials/weather-bot/images/create-intent-meteo.png" target="_blank" />
</center>


## Créez l'extracteur d'entités Météo

Créez un nouveau fichier `meteo-extractor.js` dans le dossier `src/extractors` afin d'indiquer au bot que nous cherchons à extraire des noms de ville et des dates.

```javascript
const { WsExtractor } = require('botfuel-dialog');

class MeteoExtractor extends WsExtractor {}

MeteoExtractor.params = {
  dimensions: ['city', 'time'],
};

module.exports = MeteoExtractor;
```


## Créez le Dialog Météo

Créez un fichier `meteo-dialog.js` dans le dossier `src/dialogs`. 

Comme notre bot a besoin de la ville et de la date afin de pouvoir répondre à l'utilisateur, le weather dialog est donc un `PromptDialog`.

Nous devons indiquer à notre bot que nous allons extraire une entité de type (dimension) `city` ainsi qu'une entité de type `time`. Les clés `location` et `date` nous permettrons d'accéder aux valeurs extraites.

```javascript
const { PromptDialog } = require('botfuel-dialog');

class MeteoDialog extends PromptDialog {
}

MeteoDialog.params = {
  namespace: 'meteo',
  entities: {
    location: {
      dim: 'city',
    },
    date: {
      dim: 'time',
    },
  },
};
module.exports = MeteoDialog;
```


## Créez la view Météo

Créez un fichier `meteo-view.js` dans le dossier `src/views`. 
La vue va vous permettre de générer un message basé sur les données traitées dans le dialog. Botfuel peut générer plusieurs types de messages :
* Messages texte et quick replies
* Images
* Liens
* Boutons avec gestion des clicks
* Carrousels

Nous allons dans un premier temps utiliser `BotTextMessage` qui permet de renvoyer un simple texte à l'utilisateur.
Les vues doivent implémenter la méthode `render()` qui prend en paramètre le `userMessage` et un objet de données envoyé par le dialog correspondant à la vue. On renvoie ensuite un tableau de <a href="https://docs.botfuel.io/dialog/reference/messages">messages</a>.

Pour plus d'informations sur le fonctionnement des vues, n'hésitez pas à aller consulter la <a href="https://docs.botfuel.io/dialog/reference/views" target="_blank">documentation</a>.
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
duration: 10
---

# Appeler l'API de météo

Pour l'instant, notre bot ne renvoi pas la météo.


## Installer node-fetch

Commencez par installer le package nodejs `node-fetch` afin de pouvoir faire des appels REST à l'API de météo.

```bash
npm install node-fetch --save
```

<aside class="infos"><b>Note:</b> node-fetch est une bibliothèque qui apporte window.fetch dans NodeJS.</aside>


## Appeler l'API

Vous allez devoir appeler l'<a href="https://developer.worldweatheronline.com/api/docs/" target="_blank">API worldweatheronline</a> afin de récupérer les informations météorologiques.

```javascript
const response = await fetch(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=8c021b4e600b4cd8b24194452182606&q=${location}&format=json&date=${formattedDate}&lang=fr`);      
      const data = await response.json();
      const weatherData = data.data;
```

Commencez par récupérer les entités extraites dans `meteo-dialog.js` et pensez à vérifier que l'utilisateur a bien rentré toutes les informations nécessaires pour faire l'appel à l'API.

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

## Afficher le résultat

Dans le fichier `meteo-view.js`, créez un nouveau `BotTextMessage` qui renverra la météo en indiquant la description ainsi que les températures minimales et maximales.

```javascript
...
if (missingEntities.size === 0) {
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
...
```
<br />
<hr />

L'API ne permet pas de récupérer la météo lorsque la date est dans plus de 15 jours. Rajoutez un test afin de vérifier que l'utilisateur ne demande pas une date dans le passé ou trop dans le futur.

--sep--
---
title: Gérer les questions partielles
duration: 4
---

# Gérer les questions partielles

Lorsque nous avons rentré les Training Phrases dans le trainer, nous avons entré des phrases comme `Quel temps fera-t-il demain?`.
Notre bot doit être capable de voir que l'information sur le lieu manque et la demander à l'utilisateur pour pouvoir lui donner la météo.

Vous pouvez tester la présence des entités dans le fichier `meteo-view.js` afin de renvoyer un message à l'utilisateur pour lui demander plus d'informations.

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

# Ajouter des Quick Replies

Vous pouvez ajouter des `Quick Replies` à votre bot pour indiquer plus rapidement certaines dates (aujourd’hui, demain, …).
Pour en apprendre plus sur les `Quick Replies`, rendez-vous dans la <a href="https://docs.botfuel.io/dialog/reference/messages#quickrepliesmessage" target="_blank">documentation</a>.

Dans le fichier `meteo-view.js`, vous pouvez renvoyer des `QuickrepliesMessage` qui proposeront des valeurs à l'utilisateur.

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

Vous devriez arriver au résultat ci-dessous lorsque vous demandez la météo sans spécifier de jour.

<center>
<img src="./assets/tutorials/weather-bot/images/quickreplies.png" />
</center>

--sep--
---
title: Ajouter des images
duration: 12
---

# Ajouter des images

Pour terminer sur une pointe de couleur, rajoutons quelques images à notre bot en utilisant `BotImageMessage`.

Vous pouvez télécharger un pack d'images <a href="https://drive.google.com/drive/folders/11GxjsG3upQCuVMnl2uYJrVXPSy3Qsubp" target="_blank">ici</a>.

`BotImageMessage` est aussi simple à utiliser que `BotTextMessage`ou encore `QuickrepliesMessage`.

```javascript
new BotImageMessage(WebAdapter.getStaticUrl(`images/neige.jpg`)),
```

Pour en savoir plus sur comment marche BotImageMessage, rendez-vous sur la <a href="https://docs.botfuel.io/dialog/reference/images-in-bot-messages" target="_blank">documentation</a>.

Afin de faire le lien entre les images et les messages et la déscription de la météo, vous pouvez utiliser le mapping ci-dessous :

```javascript
const images = {
  'Clair': 'clair.jpg',
  'Pluie modérée': 'pluie.jpg',
  'Pluie modérée par moments': 'pluie.jpg',
  'Pluie forte par moments': 'pluie.jpg',
  'Pluie forte': 'pluie.jpg',
  'Pluie éparse à proximité': 'pluie.jpg',
  'Pluie verglaçante légère': 'pluie-legere.jpg',
  'Pluie légère': 'pluie-legere.jpg',
  'Averse de pluie légère': 'pluie-legere.jpg',
  'Pluie légère éparse': 'pluie-legere.jpg',
  'Ensoleillé': 'ensoleille.jpg',
  'Nuageux': 'nuageux.jpg',
  'Brume': 'brume.jpg',
  'Grésil éparse à proximité': 'neige.jpg',
  'Neige éparse à proximité': 'neige.jpg',
  'Blizzard': 'neige.jpg',
  'Rafales de neige': 'neige.jpg',
  'Partiellement nuageux': 'partiellement-nuageux.jpg',
  'Couvert': 'couvert.jpg',
  'Foyers orageux à proximité': 'foyers.jpg',
  'Brouillard': 'brouillard.jpg',
  'Brouillard givrant': 'brouillard.jpg',
  'Bruine verglaçante éparse à proximité': 'bruine.jpg',
  'Bruine légère éparse': 'bruine.jpg',
  'Bruine légère': 'bruine.jpg',
  'Bruine verglaçante': 'bruine.jpg',
  'Forte bruine verglaçante': 'bruine.jpg',
};
```

Utilisez ce mapping afin d'afficher une image correspondant à la description de la prévision météo comme ci-dessous :

<center>
<img src="./assets/tutorials/weather-bot/images/demo.png" title="Final result" alt="Final result" targer="_blank" />
</center>

--sep--
---
title: Bravo
duration: 1
---

# Bravo

Vous avez atteint la fin de ce tutoriel. Vous avez su prendre en main certains des principaux composants de Botfuel comme le Webchat, le trainer ou encore les QuickReplies.

Vous êtes maintenant en mesure de faire un bot en utilisant le SDK de Botfuel.

Pour en savoir plus :
* La <a href="https://docs.botfuel.io/" target="_blank">documentation</a> du SDK
* Déployez votre chatbot sur Heroku avec <a href="https://codelabs-65b58.firebaseapp.com/#/codelab/deploy-heroku?step=1" target="_blank">ce tutoriel</a> (en anglais)
* Déployez votre chatbot sur Facebook Messenger en suivant <a href="https://codelabs-65b58.firebaseapp.com/#/codelab/connect-messenger?step=1" target="_blank">ce tutoriel</a>
