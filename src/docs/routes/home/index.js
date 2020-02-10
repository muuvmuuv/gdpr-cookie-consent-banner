import { h } from 'preact'

import style from './style.scss'
import Code from '../../components/code'

const html = `
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
`

const javascript = `
window.consent = new CookieConsent()
`

const Home = () => (
  <div className={style.page}>
    <h3>Install</h3>
    <Code language="shell">{`
npm install gdpr-cookie-consent-banner
    `}</Code>

    <h3>HTML</h3>
    <Code language="html">{html}</Code>

    <h3>JavaScript</h3>
    <Code language="js">{javascript}</Code>
  </div>
)

export default Home
