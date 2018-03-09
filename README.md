With Dothraki-JS you can start translating your app.

## Getting started

```bash
$ npm install https://github.com/anderson-cubo/dothraki-js
```

## Creating dictionary

```js
import { settings } from 'dothraki-js'

const PT_BR_dictionary = {
  'Hi': 'Olá',
  'Welcome', 'Bem-Vindo'
}

settings.setDictionary('PT_BR', PT_BR_dictionary)
```

## Using Dictionary

```js
import { settings } from 'dothraki-js'

settings.set('language', 'PT_BR')
```

## Getting words that are not being translated

```js
import { settings } from 'dothraki-js'

settings.getDictionaryWithoutTranslation()
```

## Disabling Warnings

```js
import { settings } from 'dothraki-js'

settings.set('_ENABLE_WARNINGS', false)
```

## Translating words

```js
import dothraki from 'dothraki-js'

console.log(dothraki`Hi`)

```

## Setting params inside dictionary
```js
import { settings } from 'dothraki-js'

const PT_BR_dictionary = {
  'Welcome, {{0}}': 'Bem-Vindo, {{0}}'
}

settings.setDictionary('PT_BR', PT_BR_dictionary)
```

## Using params

```js
import dothraki from 'dothraki-js'

const user = 'John'

dothraki`Welcome, ${user}`
```
## Using JSX in Params

```js
import dothraki from 'dothraki-js'

const user = 'John'

dothraki`Welcome, ${<span>{user}</span>}`
```
