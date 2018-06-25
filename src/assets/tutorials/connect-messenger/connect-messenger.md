---
title: Connecting to Messenger
duration: 30
---

--sep--
---
title: Introduction
duration: 3
---

# Introduction

In this tutorial, you will learn how to connect your Botfuel Dialog chatbot with Facebook Messenger.


--sep--
---
title: Get your public URL
duration: 3
---

## Get the public URL of your bot webhook

The first thing you have to do is get the callback URL of your bot. There are several ways of getting your bot online:

* Use [ngrok](http://ngrok.com/download) to expose your local bot (recommended for quick prototyping, please see a [detailed article](https://medium.com/botfuel/how-to-expose-a-local-development-server-to-the-internet-c31532d741cc) on this subject)
* Host your bot on Heroku ([see how here](./deploying-to-heroku))
* Use another service or your own server

In this tutorial we will use ngrok, but the same instructions apply to the other solutions.

Follow the [instructions](http://ngrok.com/download) for your operating system then run the following command:

```shell
ngrok http 5000
```

Botfuel Dialog bots run on port 5000 by default. If you have changed the port, change `5000` to the one you’re using.
This will give you a screen like this one:

<img src="./assets/tutorials/connect-messenger/images/ngrok.png" alt="ngrok"/>

Locate the forwarding link (in our case `https://3efeb72c.ngrok.io`). All requests to `https://3efeb72c.ngrok.io` will be forwarded to your bot.

--sep--
---
title: Set up the Facebook App
duration: 3
---

## Set up the Facebook App

To setup your chatbot on Facebook Messenger, you need three things:

* A Facebook Page that will be used as the identity of your bot: https://www.facebook.com/pages/create
* A Facebook for Developers account: https://developers.facebook.com/
* A Facebook App

We will cover only the configuration of the Facebook App in this tutorial.
For other the two first steps, please follow the tutorial [here](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup).
Make note of the **page access token** (`FB_PAGE_ACCESS_TOKEN`) given to you. We will use it to connect your chatbot to Messenger.

Once your app is created, we need to setup our bot endpoint as the Messenger webhook callback URL.
Go to your Facebook App and click on Webhooks in the side menu:

<img src="./assets/tutorials/connect-messenger/images/messenger-menu.png" alt="Messenger Apps Menu"/>

Then click on the `Edit Subscription` button:

<img src="./assets/tutorials/connect-messenger/images/messenger-webhook.png" alt="Messenger Webhook"/>

Set the `Callback URL` field to `<NGROK_URL>/webhook`:

<img src="./assets/tutorials/connect-messenger/images/messenger-url.png" alt="Messenger URL"/>

Make sure that you added `/webhook` at the end of the URL.
Set the `Verify Token` field to the value of your choice (it can be whatever you want, as long as you use the same value when running the bot in a later step) and make note of it then click on `Verify and Save`.

We will refer to the **Verify Token** as `FB_VERIFY_TOKEN`.

Also, make sure your app has subscribed to messages:

<img src="./assets/tutorials/connect-messenger/images/messenger-messages.png" alt="Messenges subscription"/>

--sep--
---
title: Set up the bot
duration: 3
---

## Set up the bot

If you don't already have a Botfuel App, please follow the installation part of our [Getting Started tutorial](./getting-started#installation) and make sure you have located your app’s credentials `App Id`, `App Key` and `App Token`. We will use them in this tutorial.

Let’s make a copy of the sample starter bot, which can respond to a greeting and say back your name.

Open a terminal and clone the sample starter bot:

```shell
git clone https://github.com/Botfuel/botfuel-sample-starter.git
```

Install the dependencies:

```shell
cd botfuel-sample-starter
npm install
npm install botfuel-module-adapter-messenger
```

Now, to tell the chatbot we want to use the Facebook Messenger adapter, let’s add a `config.js` file at the root level with the following content:

```javascript
module.exports = {
  adapter: {
    name: 'messenger',
  },
  modules:['botfuel-module-adapter-messenger'],
};
```

Start the bot with the `BOTFUEL_APP_ID`, `BOTFUEL_APP_KEY`, `BOTFUEL_APP_TOKEN` Botfuel credentials as well as the Facebook tokens you obtained from the previous part of this tutorial, `FB_PAGE_ACCESS_TOKEN` and `FB_VERIFY_TOKEN` as environment variables. Also add the `config.js` file you just created:

```shell
BOTFUEL_APP_TOKEN=&lt;the BOTFUEL_APP_TOKEN&gt; \
BOTFUEL_APP_ID=&lt;the BOTFUEL_APP_ID&gt; \
BOTFUEL_APP_KEY=&lt;the BOTFUEL_APP_KEY&gt; \
FB_PAGE_ACCESS_TOKEN=&lt;the FB_PAGE_ACCESS_TOKEN&gt; \
FB_VERIFY_TOKEN=&lt;the FB_VERIFY_TOKEN&gt; \
npm start config.js
```

If you set your app credentials and the config file correctly, you should see:

```shell
2018-02-16T15:37:06.255Z - info: [Environment] BOTFUEL_APP_TOKEN=&lt;the BOTFUEL_APP_TOKEN&gt;
2018-02-16T15:37:06.258Z - info: [Environment] BOTFUEL_APP_ID=&lt;the BOTFUEL_APP_ID&gt;
2018-02-16T15:37:06.258Z - info: [Environment] BOTFUEL_APP_KEY= &lt;the BOTFUEL_APP_KEY&gt;
2018-02-16T15:37:06.395Z - info: [WebAdapter] run: listening on port 5000
```

It means your bot is listening to new user messages on `http://localhost:5000` (and `<NGROK_URL>` thanks to ngrok).


--sep--
---
title: Test it out
duration: 3
---

## Test

To test your chatbot, go to https://www.facebook.com/bookmarks/pages and click on the page your bot is linked to.
Now hover over the `Send Message` button and click the `Test Button` link. This will open a chat window within the Facebook Page, which will forward the messages to your chatbot:

<img src="./assets/tutorials/connect-messenger/images/messenger-button.png" alt="Messenger button"/>

Here you can test if the connection is successful:

<img src="./assets/tutorials/connect-messenger/images/messenger-test.png" alt="Messenger test"/>

Congratulations! You have connected a Botfuel Dialog chatbot to Facebook Messenger!