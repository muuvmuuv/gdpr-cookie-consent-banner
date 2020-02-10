# CookieConsent 🍪

[Demo](https://muuvmuuv.github.io/cookie-consent/)

A full featured, small (8K) and easy to use library to show a cookie consent banner on
your website. It is fully tested and GDPR ready.

- [Installation](#installation)
- [The Why](#the-why)
- [How it works](#how-it-works)
- [How to use](#how-to-use)
  - [UMD](#umd)
  - [CommonJS](#commonjs)
- [Options](#options)
  - [Capability](#capability)
- [Advanced](#advanced)
- [Events](#events)
  - [onReject](#onreject)
    - [Example](#example)
  - [onAccept](#onaccept)
    - [Example](#example-1)
  - [onUpdate](#onupdate)
    - [Example](#example-2)
  - [onValueChange](#onvaluechange)
    - [Example](#example-3)
- [Google Analytics](#google-analytics)

In use by this companies/people:

- [ADDITIVE GmbH](https://www.additive-net.de/de/)
- Open an issue, if you want to get added.

## Installation

```bash
npm install gdpr-cookie-consent-banner
```

## The Why

Why another gdpr cookie consent banner plugin? Does it even makes sense?

The company I've been working at had several discussion with their data protection
officer. In Germany and the EU we must do so called "opt-in" for all cookies. After
several weeks we came up with the following requirements: fully opt-in without any
preselected options (or option to preselect), a easy to enhance plugin and simple cookie
controls for customizability. The search began and very soon I have recognised that there
is no solution that fits all or only solutions that match one case or the many that do the
same. Most of the "gdpr complient" plugins had bad code, to difficult to change the HTML,
CSS or had no hooks to customize events. So that is why I created this.

## How it works

By default this plugin will create a banner with a functional capability, those are for
initial hide the banner and save user choices. If you add capabilities by yourself you
need to [add this capability again](src/lib/consent.js#L17-L32), because we will not merge
them with your config.

For the most, the example configuration with
[Google Analytics](src/docs/components/consent2/index.js) may be enough but if you need to
customize it feel free to do so. The plugin can be used for everything related to cookies
with consent opt-in/out. Go to the [advanced section](#advanced) to find out more.

## How to use

Examples (those you see in the demo) can be found here:
[`src/docs/components/consent(2)`](src/docs/components)

> NOTE: you must set all attributes like checked and disabled in JS as well, this plugin
> does not save your default settings nor override HTML attribute values for you.

### UMD

```html
<head>
  <link rel="stylesheet" href="/path/to/cookie-consent.css" />
  <script async defer src="/path/to/cookie-consent.umd.js"></script>
</head>
<body>
  <div
    id="cookiebanner"
    class="cookiebanner"
    aria-label="Edit your cookie settings"
    role="banner"
  >
    <div class="info">
      <div class="title">Your Cookie Controls</div>
      <div class="description">
        This displays the plugin with its default configuration.
      </div>
    </div>
    <div class="choices">
      <label class="choice" htmlFor="choice-functional2">
        <input type="checkbox" name="choice:functional" id="choice-functional2" checked />
        <div class="name">Functional</div>
      </label>
    </div>
    <div class="buttons">
      <button class="reject">Reject choices</button>
      <button class="accept">Accept choices</button>
    </div>
  </div>
  <div
    id="cookienotice"
    class="cookienotice"
    aria-label="Show the cookie settings again"
    role="button"
  >
    <img src="/assets/cookie.svg" alt="A shield which represents privacy" />
  </div>
</body>
```

JavaScript:

```js
window.consent = new CookieConsent({
  /* options */
})
```

### CommonJS

HTML:

Same as in UMD build.

JavaScript:

```js
import CookieConsent from 'gdpr-cookie-consent-banner'
// or
const CookieConsent = require('gdpr-cookie-consent-banner')

window.consent = new CookieConsent({
  /* options */
})
```

## Options

| Option         | Default                   | Type         | Description                     |
| -------------- | ------------------------- | ------------ | ------------------------------- |
| `name`         | `cookie-consent`          | string       | The name of your cookie.        |
| `banner`       | `…byId('cookieconsent')`  | HTMLElement  | The banner html element.        |
| `notice`       | `…byId('cookienotice')`   | HTMLElement  | The notice html element.        |
| `capabilities` | see [Advanced](#advanced) | Capability[] | Capabilities you want to apply. |

### Capability

| Option           | Default                            | Type    | Description                                                                   |
| ---------------- | ---------------------------------- | ------- | ----------------------------------------------------------------------------- |
| `name`           | `functional`                       | string  | Capability name. Must match with checkbox name convention of `choice:<name>`. |
| `checked`        | `true`                             | boolean | Initial state of the checkbox. Must match with input attribute `checked`.     |
| `onReject`       | `(CookieConsent) => {...}`         | Event   | A callback if this capability gets rejected.                                  |
| `onAccept`       | `(CookieConsent) => {...}`         | Event   | A callback if this capability gets accepted.                                  |
| `onUpdate`       | `(CookieConsent, params) => {...}` | Event   | A callback if this capability gets updated.                                   |
| `onValueChanged` | `(CookieConsent, params) => {...}` | Event   | A callback if this capability value has changed.                              |

## Advanced

Have a look at our [demo](https://muuvmuuv.github.io/cookie-consent/) page to see advanced
functionalities in action or the source of it, which you can find in
[`src/docs`](src/docs/). The docs are written in preact so the actual consent component
lives in `components` and includes a full Google Analytics example.

Every event hook has acccess to the `CookieConsent` instance and all its functions. Some
others also provide params. Below is a list of what is available with examples.

## Events

### onReject

- `consent` (CookieConsent): [`src/lib/consent.js`](src/lib/consent.js)

#### Example

> This is required!

```js
const onReject = (consent) => {
  // this will remove the plugin options cookie, so on next reload the user must consent again
  consent.removePluginOptions()
}
```

### onAccept

> This is required!

- `consent` (CookieConsent): [`src/lib/consent.js`](src/lib/consent.js)

#### Example

```js
const onAccept = (consent) => {
  // you must do this, otherwise no options would be saved
  const choices = consent.getChoices()
  // `consented: true` says that the user rejected or accepted the choosen options
  consent.savePluginOptions({ choices, consented: true })
}
```

### onUpdate

> Triggers when the choice is updated

- `consent` (CookieConsent): [`src/lib/consent.js`](src/lib/consent.js)
- `choice` (Choice): user choice for this capability

#### Example

```js
const onUpdate = (consent, { choice }) => {
  console.log('Functional now:', choice)
}
```

### onValueChange

> Triggers when the value has changed

- `consent` (CookieConsent): [`src/lib/consent.js`](src/lib/consent.js)
- `choice` (Choice): user choice for this capability

#### Example

```js
const onValueChange = (consent, { value }) => {
  console.log('Value is:', value)
}
```

## Google Analytics

This is an example of a working Google Analytics configuration (as seen in the docs).

```js
window.consent = new CookieConsent({
  name: 'consent-with-ga',
  capabilities: [
    {
      name: 'functional',
      checked: true,
      onAccept: (consent) => {
        const choices = consent.getChoices()
        consent.savePluginOptions({ choices, consented: true })
      },
    },
    {
      name: 'analytics',
      checked: false,
      onReject: () => {
        // find all cookies starting with a `_g`
        if (CookieConsent.cookieService.findCookie('_g')) {
          // yes? remove all cookies starting with a `_g`
          CookieConsent.cookieService.clearCookies('_g', {
            expires: new Date('1996-06-13'), // required!
          })
          // reload the window
          window.location.reload()
        }
      },
      onAccept: () => {
        const head = document.getElementsByTagName('head')[0]
        const script = document.createElement('script')
        script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-156811148-1'
        script.async = true
        script.onload = () => {
          window.dataLayer = window.dataLayer || []
          function gtag() {
            window.dataLayer.push(arguments)
          }
          gtag('js', new Date())
          gtag('config', 'UA-156811148-1', {
            anonymize_ip: true,
          })
        }
        head.appendChild(script)
      },
    },
  ],
})
```

```html
<div
  id="cookiebanner"
  class="cookiebanner"
  aria-label="Edit your cookie settings"
  role="banner"
>
  <div class="info">
    <div class="title">Your Cookie Controls</div>
    <div class="description">Paste some info for your users here.</div>
  </div>
  <div class="choices">
    <label class="choice" for="choice-functional">
      <input
        type="checkbox"
        name="choice:functional"
        id="choice-functional"
        checked
        disabled
      />
      <div class="name">Functional with a very long long long long long</div>
    </label>
    <label class="choice" for="choice-analytics">
      <input type="checkbox" name="choice:analytics" id="choice-analytics" />
      <div class="name">Analytics</div>
      <p class="info">Google Tag Manager will be enabled here.</p>
    </label>
  </div>
  <div class="buttons">
    <button class="reject">Reject choices</button>
    <button class="accept">Accept choices</button>
  </div>
</div>
<div
  id="cookienotice"
  class="cookienotice"
  aria-label="Show the cookie settings again"
  role="button"
>
  <img src="/assets/cookie.svg" alt="A shield which represents privacy" />
</div>
```
