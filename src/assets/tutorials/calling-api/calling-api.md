---
title: Calling an API
duration: 30
---

--sep--
---
title: Calling an API
duration: 3
---

Calling an API in Botfuel Dialog is very simple, as it's just Javascript.

Let’s consider a dialog where you need use to use the city name provided by the user to call a weather API.

The parameters of the `PromptDialog` would look like this:

```javascript
WeatherDialog.params = {
  namespace: 'weather',
  entities: {
    location: {
      dim: 'city',
    },
  },
};
```

The weather API should be called from the `dialogWillDisplay` hook, which is triggered before the dialog renders its view. This is typically the hook you should use to compute data you want to render from user input.

```javascript
const request = require('request-promise-native');
const { PromptDialog } = require('botfuel-dialog');

class WeatherDialog extends PromptDialog {
  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
    if (matchedEntities.location) {
      const location = matchedEntities.location.values[0].value;
      const weatherData = await request({
        uri: 'https://yourweatherapi.com/api/weather',
        qs: {
          query: location,
        },
        json: true,
      });

      return { weatherData };
    }

    return null;
  }
}
```

You will then be able to access this data in the `WeatherView`:

```javascript
class WeatherView extends PromptView {
  render(userMessage, { matchedEntities, missingEntities, weatherData }) {
    return [
        new BotTextMessage(JSON.stringify(weatherData));
    ];
  }
}
```