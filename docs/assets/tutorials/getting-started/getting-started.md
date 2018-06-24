---
title: Getting Started
duration: 30
---

--sep--
---
title: Introduction
duration: 3
---

# Introduction

This tutorial will be using the [botfuel-sample-starter](https://github.com/Botfuel/botfuel-sample-starter).


By the end of this tutorial, you will have a simple bot that is able to respond to a greeting and say back your name. You will also learn how to add new functionality that will allow the bot to understand a travel intent.

## What you will learn
* How to create a bot on the Botfuel platform
* How to train your bot
* How add a new intent to your bot

## what you will need
* A computer with a text editor installed like 
You can view a demo of the bot <a href="https://code.visualstudio.com/" target="_blank">vscode</a>
* Basic knowledge javascript and nodejs


--sep--
---
title: Create a Botfuel App
duration: 5
---

# Create a Botfuel App

We will create a Botfuel App and use [Botfuel Trainer](/trainer/overview) to train our bot on sample user messages. The [Labs plan](https://www.botfuel.io/en/pricing) is free up to 5000 user messages per month. This should be way enough to do all our tutorials.

## Create a Botfuel developer account

Visit the [Botfuel Developer Portal](https://app.botfuel.io/) and create an account:

![Sign up](/assets/tutorials/getting-started/images/getting_started-signup.png "Sign up")

## Create the app

Once you have created an account and are logged in, create an app by clicking on the `Create App` button:

![Creating an app](/assets/tutorials/getting-started/images/getting_started-create_app.png "Creating an app")

Give your app a namem, an optional description, and select a language.

The language determines what language your bot will understand. Under the hood, our NLP APIs behave differently based on the language you choose. You won’t be able to change it later, so choose carefully!

![Creating an app 2](/assets/tutorials/getting-started/images/getting_started-create_app2.png "Creating an app")


--sep--
---
title: Train your app
duration: 5
---

# Train your app

On the `Trainer/Intents` page, click on the `Add intent` button to create an intent labelled `greetings` with the description “User greets the bot”. Leave the `User prompt` field empty.

<aside class="warning">The label can only contains lowercase letters, numbers, hyphens without spaces. It also cannot start or end with a hyphen.</aside>

The `Training phrases` lists all the phrases used to train your bot. Enter here what you believe your user may ask the bot.
Here, fill in the phrase “Hello bot.” and then press `enter`. Click the button `Save`.

![Adding an intent](/assets/tutorials/getting-started/images/getting_started-create_intent.png "Adding an intent")

Repeat the same steps and create an intent labeled `name`:

![Adding an intent 2](/assets/tutorials/getting-started/images/getting_started-create_intent2.png "Adding an intent 2")

Note here, when you put `My name is Bob.`, our trainer detects Bob as a forename, one of 31 built-in entities recognised by Botfuel.

<aside class="infos">Every time you click on the save button, your app is trained with the new training phrases.</aside>

You can check that the app is properly trained by using the test panel on the right of your screen and typing a sentence that is close to one of your training phrases:

![Test panel](/assets/tutorials/getting-started/images/getting_started-testpanel.png "Test panel")

--sep--
---
title: Install the starter bot
duration: 5
---

# Install the starter bot

For our tutorial, we will make a copy of an existing sample bot that is able to respond to a greeting and say back your name.

You need `nodejs 8` to install the starter bot. 

There are two ways to get the code. You can clone the repository from GitHub:

```bash
git clone https://github.com/Botfuel/botfuel-sample-starter.git
```

Or alternatively, click the following link to download the code for this codelab:

<a class="btn-info" href="https://github.com/Botfuel/botfuel-sample-starter/archive/master.zip" target="_blank"><i class="fas fa-download"></i> Download source code</a>

Install dependencies:

```bash
cd botfuel-sample-starter
npm install
```

Notice that the bot ships with two dialogs named `greetings` and `name`. It's important that the names match the intents defined in Botfuel Trainer.

## Bot components

A bot has four basic building components (for more details, see our [concepts](/platform/concepts)):

* Dialogs: specify what user input is needed to respond. They interact with the brain and compute the data (e.g, entities, plain text) that will be passed to the corresponding View
* Extractors: extract entities (e.g., forename, number, color, city...) that can then be used by the bot
* Views: generate the bot messages.
* Intents: An intent is a class (in the sense of classification) of user messages that is defined in Botfuel Trainer by sample sentences. An intent triggers a Dialog.

If we take our `Name` intent, here is what we have :

| Component | What it does                                                             | Definition                             |
| --------- | ------------------------------------------------------------------------ | -------------------------------------- |
| Intent    | Matches user input (`My name is Bob` for example) with the `name` intent | Defined in Botfuel Trainer             |
| Extractor | Extracts the forename `Bob` from the user sentence                       | `src/extractors/forename-extractor.js` |
| Dialog    | Specifies it needs a `forename` entity named `name`                      | `src/dialogs/name-dialog.js`           |
| View      | Replies with the recognized name                                         | `src/views/name-view.js`               |

--sep--
---
title: Test your bot
duration: 5
---

# Test your bot

## Get the app credentials

Locate the `Credentials` section in the `App settings` page and take note of the credentials. We will use the `BOTFUEL_APP_TOKEN`, `BOTFUEL_APP_ID` and `BOTFUEL_APP_KEY` values to run the bot.

![Credentials](/assets/tutorials/getting-started/images/getting_started-credentials.png "Credentials")

## Run the bot

Start the bot with the `BOTFUEL_APP_ID`, `BOTFUEL_APP_KEY` and `BOTFUEL_APP_TOKEN` environment variables using your app’s credentials:

```bash
BOTFUEL_APP_TOKEN=<the BOTFUEL_APP_TOKEN> BOTFUEL_APP_ID=<the BOTFUEL_APP_ID> BOTFUEL_APP_KEY=<the BOTFUEL_APP_KEY> npm start
```

If you set your app credentials right, you should see:

```bash
2017-12-07T16:12:09.131Z - info: [Config] You didn't specify any config file, using default config.
2017-12-07T16:12:09.131Z - info: [Environment] BOTFUEL_APP_TOKEN=<the BOTFUEL_APP_TOKEN>
2017-12-07T16:12:09.133Z - info: [Environment] BOTFUEL_APP_ID=<the BOTFUEL_APP_ID>
2017-12-07T16:12:09.133Z - info: [Environment] BOTFUEL_APP_KEY=<the BOTFUEL_APP_KEY>
```

Your bot is now running, congratulations!

Your bot can respond in two ways:

* Greetings: if you say `hello`, it will simply reply with `Hello human!`
* Name: if you say `My name is Bob` it will reply with `Nice to meet you Bob!`

--sep--
---
title: Add new functionality
duration: 5
---

# Add new functionality

So far, our bot is very basic. But we can easily extend its functionality.
Let’s add the travel functionality that works like this:

* User says something like: `I want to travel` or `I want to travel to Paris` (but it can be any city that the user can think of!)
* Bot replies:
  * `Where do you want to go?` if the destination city is missing
  * `<DESTINATION> is a very nice place.` if the destination city is provided

## Add the travel Intent

First let’s create the `travel` intent on the developer portal with the description “User wants to travel”. Fill in the following sample sentences:

```
I want to travel.
I want to travel to Paris.
```

The more examples you add, the better your bot will be able to understand user input and match it to the intent. As you can see from these examples, some include the name of the city and some do not. This is OK, since the purpose of training the intent is to “teach” the bot that the user wants to travel. We will make sure we capture any destination that the user may mention when we get to the city Extractor below.

## Add the city Extractor

Create a `city-extractor.js` file in the `src/extractors` directory so that the bot can extract city names from user input.

```javascript
const { WsExtractor } = require('botfuel-dialog');

class CityExtractor extends WsExtractor {}

CityExtractor.params = {
  dimensions: ['city'],
};

module.exports = CityExtractor;
```

## Add the travel Dialog

Create a `travel-dialog.js` file in the `src/dialogs` directory.
Because the bot needs the name of the city to be provided by the user in order to reply, the travel dialog is a `PromptDialog`:

```javascript
const { PromptDialog } = require('botfuel-dialog');

class Travel extends PromptDialog {}

Travel.params = {
  namespace: 'travel',
  entities: {
    destination: {
      dim: 'city',
    },
  },
};

module.exports = Travel;
```

Here we say that the travel dialog needs an entity named `destination` that is a `city`.

## Add the travel View

Create a `travel-view.js` file in the `src/views` directory.
It serves two main purposes. In the case where the user did not provide a city, it will prompt the user to do so. And for the case where the user does provide a city, the View contains the logic of the response based on the user value provided.

Since the travel Dialog is a `PromptDialog`, the travel View needs to be a `PromptView` so it can access the `destination` entity in the `renderEntities` method:

```javascript
const { PromptView, BotTextMessage } = require('botfuel-dialog');

class TravelView extends PromptView {
  render(userMessage, { matchedEntities }) {
    const destination =
      matchedEntities.destination &&
      matchedEntities.destination.values[0].value;

    if (!destination) {
      return [new BotTextMessage('Where do you want to go?')];
    }

    return [new BotTextMessage(`${destination} is a very nice place.`)];
  }
}

module.exports = TravelView;
```

Here we return different messages based on the value of the `destination` extracted. If no value was successfully extracted, we reply with `Where do you want to go?`.

--sep--
---
title: Try it out
duration: 5
---

## Try it out

Run your bot with:

```bash
BOTFUEL_APP_TOKEN=<the BOTFUEL_APP_TOKEN> BOTFUEL_APP_ID=<the BOTFUEL_APP_ID> BOTFUEL_APP_KEY=<the BOTFUEL_APP_KEY> npm start
```

See what your bot thinks about your travel destination!

If you have any issues or questions about this tutorial, feel free to open an issue [here](https://github.com/Botfuel/botfuel-sample-starter/issues).