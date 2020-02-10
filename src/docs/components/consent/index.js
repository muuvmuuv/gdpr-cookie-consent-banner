import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import CookieConsent from '../../../lib'

const Banner = () => (
  <div
    id="cookiebanner"
    className="cookiebanner"
    aria-label="Edit your cookie settings"
    role="banner"
  >
    <div className="info">
      <div className="title">Your Cookie Controls</div>
      <div className="description">
        This displays the plugin with its default configuration.
      </div>
    </div>
    <div className="choices">
      <label className="choice" htmlFor="choice-functional2">
        <input type="checkbox" name="choice:functional" id="choice-functional2" checked />
        <div className="name">Functional</div>
      </label>
    </div>
    <div className="buttons">
      <button className="reject">Reject choices</button>
      <button className="accept">Accept choices</button>
    </div>
  </div>
)

const Notice = () => (
  <div
    id="cookienotice"
    className="cookienotice"
    aria-label="Show the cookie settings again"
    role="button"
  >
    <img src="/assets/cookie.svg" alt="A shield which represents privacy" />
  </div>
)

const Consent = () => {
  useEffect(() => {
    window.consent = new CookieConsent()
  })

  return [<Banner key="banner" />, <Notice key="notice" />]
}

export default Consent
