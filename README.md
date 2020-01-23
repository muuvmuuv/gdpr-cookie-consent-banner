# CookieConsent 🍪

[Demo](https://muuvmuuv.github.io/cookie-consent/)

A full featured, small (8K) and easy to use library to show a cookie consent banner on
your website. It is fully tested and GDPR ready.

- [How it works](#how-it-works)
- [Installation](#installation)
- [How to use](#how-to-use)
  - [UMD](#umd)
  - [Options](#options)
    - [Label](#label)
- [Advanced](#advanced)

In use by this companies/people:

- [ADDITIVE GmbH](https://www.additive-net.de/de/)
- Open an issue, if you want to get added.

## How it works

By default this plugin will create a banner with functional cookies set (the cookies
needed to initial hide the banner and save choices). If you add labels by yourself you
need to add this capability again, we will not merge that with you config.

```js
const defaultFunctionalLabel = {
  name: 'functional',
  checked: true,
  onReject: (consent) => {
    consent.removeCookieOptions()
  },
  onAccept: (consent) => {
    const choices = consent.getChoices()
    consent.saveCookieOptions({ choices, consented: true })
  },
  onUpdate: (_, { choice }) => {
    console.log('Functional now:', choice)
  },
}
```

Normally functional cookies shouldn't be `onRejected` and removed because they are
necessary but some may need this.

If you want, you can access cookie related service with
`CookieConsent.cookieService.<func>`. Take a look at the demo files to see more.

Why are those not added by default?

Easy answer, as already said, sometimes the use case differ and not everyone need them, so
to reduce issues we just excluded them.

TODO: more info

## Installation

```bash
npm install gdpr-cookie-consent-banner
```

## How to use

### UMD

```html
<head>
  <link rel="stylesheet" href="./path/to/cookie-consent.umd.css" />
  <script defer src="./path/to/cookie-consent.umd.js"></script>
</head>
<body>
  <div
    id="cookieconsent"
    class="cookieconsent"
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
        <div class="name">Functional</div>
      </label>
    </div>
    <div class="buttons">
      <button class="reject">Reject</button>
      <button class="accept">Accept</button>
    </div>
  </div>

  <div
    id="cookienotice"
    class="cookienotice"
    aria-label="Show the cookie settings again"
    role="button"
  >
    <img src="icon.png" alt="A shield which represents privacy" />
  </div>
</body>
```

JavaScript:

```js
window.consent = new CookieConsent()
```

### Options

| Option   | Default                   | Type        | Description               |
| -------- | ------------------------- | ----------- | ------------------------- |
| `name`   | `cookie-consent`          | string      | The name of your cookie.  |
| `banner` | `…byId('cookieconsent')`  | HTMLElement | The banner html element.  |
| `notice` | `…byId('cookienotice')`   | HTMLElement | The notice html element.  |
| `labels` | see [Advanced](#advanced) | Label[]     | Labels you want to apply. |

#### Label

| Option     | Default      | Type    | Description                                                         |
| ---------- | ------------ | ------- | ------------------------------------------------------------------- |
| `name`     | `functional` | string  | Label name. Must match with checkbox name.                          |
| `checked`  | `true`       | boolean | Initial state of the checkbox. Must match with attribute `checked`. |
| `onReject` | `() => {}`   | Event   | A callback if this label gets rejected.                             |
| `onAccept` | `() => {}`   | Event   | A callback if this label gets accepted.                             |
| `onUpdate` | `() => {}`   | Event   | A callback if this label gets updated.                              |

## Advanced

Have a look at our [demo](https://muuvmuuv.github.io/cookie-consent/), the [docs](./docs)
and the [options section](#options) files before going further.

Every function holds the initiated consent class, so you can use every function inside
[./src/consent.js](./src/consent.js).

TODO: more info
