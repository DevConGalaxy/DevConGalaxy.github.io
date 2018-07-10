---
title: Integration Testing
duration: 18
---

--sep--
---
title: Introduction
duration: 3
---

Since a Botfuel Dialog chatbot is a web application, you can rely on powerful programming concepts like unit and integration testing to test your bot.

# Goal

In this tutorial you’ll learn how to test your chatbot using <a href="https://facebook.github.io/jest/">Jest</a>, a testing library developed by Facebook. However, any other testing library such as Mocha can be used.

The goal of this tutorial is to learn how to automate the tests you would have to do manually to make sure your chatbot works as expected.

For this tutorial, we’ll start from the <a href="https://github.com/Botfuel/botfuel-sample-starter">starter sample bot</a>. Make sure you have it running by following the <a href="./getting-started">Getting Started</a> tutorial up until the <a href="./getting-started#installation">installation</a> part.

For instance, the starter sample bot has the following behavior:

<img src="./assets/tutorials/integration-testing/images/testing-sample.png" alt="Testing sample"/>

Let’s write a test that ensures this simple functionality works.

# Configuration

First, we need to install Jest as a development dependency:

```shell
npm install --dev jest
```

Once Jest is installed, add the following `test` script to your `package.json` file:

```json
"scripts": {
  "start": "botfuel-run",
  "train": "botfuel-train",
  "test": "jest"
},
```

You can now run `npm test` to run Jest.

To run the chatbot in test mode, we’ll need a config file that indicates we’ll use the `test` adapter.
Create a `test-config.js` file at the root level with this content:

```javascript
module.exports = {
  adapter: {
    name: 'test',
  },
};
```

# Writing the test

To simulate a conversation between a human and your chatbot, we’ll be using the `play` method of the `Bot` class.
This method expects an array of user messages that represents all the messages a user would send to the chatbot. For a user, they can be of the following types:

* `PostbackMessage`
* `UserImageMessage`
* `UserTextMessage`

In our case, they are simple `UserTextMessage`s.

For example, to simulate this conversation:

<img src="./assets/tutorials/integration-testing/images/testing-sample.png" alt="Testing sample"/>

We’ll write:

```javascript
const bot = new Bot(config);
const userId = bot.adapter.userId;

await bot.play([
  new UserTextMessage('Hello'),
  new UserTextMessage('My name is Bob'),
]);
```

The captured output of both the user messages and the bot messages is stored into `bot.adapter.log`, so we can write the following assertion to test that the bot responds as expected:

```javascript
expect(bot.adapter.log).toEqual(
  [
    new UserTextMessage('Hello'),
    new BotTextMessage('Hello human!'),
    new UserTextMessage('My name is Bob'),
    new BotTextMessage('Nice to meet you Bob!'),
  ].map(msg => msg.toJson(userId))
);
```

To compare expected output and actual output, we provide a convenient `toJson` method so messages can be compared as raw JSON. This method needs `userId` as a parameter because each `UserTextMessage` and `BotTextMessage` converted to JSON stores a `userId` property tracking the author of the message.

Here, you can also use all types of messages possible for both user and bot.

Let’s write the complete test case!

Create a `tests` directory at the root level of your chatbot and a `hello.test.js` file inside it with the following content:

```javascript
const { Bot, BotTextMessage, UserTextMessage } = require('botfuel-dialog');
const config = require('../test-config');

test('answers greeting and name', async () => {
  const bot = new Bot(config);
  const userId = bot.adapter.userId;

  await bot.play([
    new UserTextMessage('Hello'),
    new UserTextMessage('My name is Bob'),
  ]);

  expect(bot.adapter.log).toEqual(
    [
      new UserTextMessage('Hello'),
      new BotTextMessage('Hello human!'),
      new UserTextMessage('My name is Bob'),
      new BotTextMessage('Nice to meet you Bob!'),
    ].map(msg => msg.toJson(userId))
  );
});
```

To run the tests, execute the following command:

```shell
BOTFUEL_APP_TOKEN=&lt;the BOTFUEL_APP_TOKEN&gt; BOTFUEL_APP_ID=&lt;the BOTFUEL_APP_ID&gt; BOTFUEL_APP_KEY=&lt;the BOTFUEL_APP_KEY&gt; npm test
```

Your app’s credentials are needed because your chatbot calls NLP APIs.

You will see the following results:

<img src="./assets/tutorials/integration-testing/images/testing-sample-2.png" alt="Testing output"/>

Congratulations, you have successfully automated a test case of your chatbot!

<b>Note:</b> Making your bots rely on APIs that are outside of your control make them dependent on the status of these APIs (downtime, API changes) and thus can fail even though you did not change anything in your bot. To make them unit tests (independent of anything other than your code, as opposed to integration tests), you will need to mock the called APIs, which is outside the scope of this tutorial.