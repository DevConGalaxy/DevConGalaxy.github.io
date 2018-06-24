---
title: Creating a Q&A bot
duration: 30
---

--sep--
---
title: Introduction
duration: 3
---

# Introduction

A question and answer bot (or Q&A bot) provides predefined answers to user questions, similarly to a Frequently Asked Questions page but with the added interactivity permitted by a conversational agent. A Q&A bot can handle many support issues.

In this tutorial, you will see how to create a Q&A bot in just a few minutes using Botfuel Dialog and Botfuel Trainer. This bot can then be connected to any messaging platform, but for the purpose of our example we will show how to connect it to Botfuel Webchat.


## what you will need
* Have completed the <a href="/#/codelab/getting-started) tutorial" target="_blank">Getting Started</a>
* A recent version of a web browser

--sep--
---
title: Architecture
duration: 3
---

## Architecture

The architecture we will set up is standard for a chatbot, and consists of three main parts, as shown below:

![Summary diagram](./assets/tutorials/qna-bot/images/howto_qna-summary_diagram.png "Summary diagram")

It is important to note that each part can be replaced without affecting the other parts:
* <a href="https://docs.botfuel.io/dialog/reference/dialogs/overview" target="_blank">Botfuel Dialog</a>
* <a href="https://docs.botfuel.io/trainer/overview" target="_blank">Botfuel Trainer</a>
* <a href="https://docs.botfuel.io/webchat/overview" target="_blank">Botfuel Webchat</a>

We will begin by adding Q&A content to Botfuel Trainer and then build the bot using Botfuel Dialog. Finally we will connect it with Botfuel Webchat.

--sep--
---
title: Add Q&As
duration: 3
---
# Add content to Botfuel Trainer

If you don't already have a Botfuel App, please follow the first part of our [Getting Started](/#/codelab/getting-started).

With a Botfuel App created, make sure you can locate your app credentials : `BOTFUEL_APP_ID`, `BOTFUEL_APP_KEY`, `BOTFUEL_APP_TOKEN`. You'll need them soon!

In the `Trainer` section of the developer portal, navigate to the `QnAs` tab.

Here you can fill in the questions and the corresponding answers for your bot.

![QnA portal](./assets/tutorials/qna-bot/images/howto_qna-qnas.png "QnA portal")

Click on the `Add Q&A` button on the upper right corner.
Add a title to identify your Q&A, the answer you want to provide and a list of question related to the answer.
Repeat the process for all your Q&As.

![QnA portal](./assets/tutorials/qna-bot/images/howto_qna-qna1.png "QnA portal")

![QnA portal](./assets/tutorials/qna-bot/images/howto_qna-qna2.png "QnA portal")

![QnA portal](./assets/tutorials/qna-bot/images/howto_qna-qna3.png "QnA portal")

![QnA portal](./assets/tutorials/qna-bot/images/howto_qna-qna4.png "QnA portal")

![QnA portal](./assets/tutorials/qna-bot/images/howto_qna-qna5.png "QnA portal")

You can test your bot at any moment on the right panel of the trainer.

![Chat panel](./assets/tutorials/qna-bot/images/howto_qna-test_panel.png "Chat panel")

--sep--
---
title: Create your bot using Botfuel Dialog
duration: 3
---

# Create your bot

With Botfuel Trainer populated, we are ready to create the bot using Botfuel Dialog.

## Install Botfuel Dialog

In a new folder, create a new file named `package.json`:


```javascript
{
  "name": "howto-qna",
  "version": "0.0.1",
  "description": "Sample Q&A bot using botfuel-dialog and Botfuel Trainer",
  "scripts": {
    "start": "botfuel-run"
  },
  "dependencies": {
    "botfuel-dialog": "latest"
  }
}
```

Then run `yarn install`.

<aside class="infos">You can also combine Q&As and intent handles by the SDK.</aside>

## Configure your bot

Store your configuration in a file named `botfuel-config.js`:

```javascript
module.exports = {
  adapter: {
    name: 'botfuel',
  }
};
```

The parameter `adapter.name` is set to `botfuel` to specify to use Botfuel Webchat.


## Start your bot

On your server, start the bot using the app credentials shown on the `App settings` page:

```
BOTFUEL_APP_TOKEN=<...> BOTFUEL_APP_ID=<...> BOTFUEL_APP_KEY=<...> npm start botfuel-config
```

--sep--
---
title: Run your bot in the webchat
duration: 3
---

# Run your bot in the Webchat

## Configure Botfuel Webchat

Now that the bot is running, we will embed it in a web page using Botfuel Webchat.

From your app's page, access the `Connect` tab in the `Channels/Webchat` page to provide the URL of your server. By default, the bot listens to HTTP on port 5000.

![Webchat configuration](./assets/tutorials/qna-bot/images/howto_qna-webchat_config.png "Webchat configuration")
If you want to test the bot on your personal computer, make sure that it is reachable from the outside. If needed, you can use reverse port forwarding, ngrok or a similar service.  

For more assistance on configuring Botfuel Webchat, see [Connecting to Webchat](./connecting-to-webchat).

## Test

Create a sample client web page containing your `BOTFUEL_APP_TOKEN`:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>

<body>
  Webchat
  <script src="https://cdn.jsdelivr.net/npm/botfuel-webchat-client@3.7.0"></script>
  <script>
    BotfuelWebChat.init({
      appToken: '<YOUR_BOTFUEL_APP_TOKEN>',
      size: { width: 500, height: 600 },
      startOpen: false,
      startFullScreen: false
    });
  </script>
</body>

</html>
```

Then open that page in your browser and start talking to your bot! The bot should answer, using your content in the Botfuel Trainer.

![Demo on Botfuel Webchat](./assets/tutorials/qna-bot/images/howto_qna-demo_webchat.png "Demo on Botfuel Webchat")

When you have finished your bot, you can also add tests and configure other adapters, if needed. For more guidance, check out our [sample Q&A bot](https://github.com/Botfuel/botfuel-sample-customerservice)!