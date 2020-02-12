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
        Paste some info for your users here. For example a{' '}
        <a href="#0">link to your privacy policy</a> or something similiar.
      </div>
    </div>
    <div className="choices">
      <label className="choice" htmlFor="choice-functional2">
        <input type="checkbox" name="choice:functional" id="choice-functional2" checked />
        <div className="name">Functional</div>
        <p className="info">Rejecting will let this banner re-appear on every reload.</p>
      </label>
      <label className="choice" htmlFor="choice-testest">
        <input type="checkbox" name="choice:testest" id="choice-testest" />
        <div className="name">Test</div>
        <p className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
    window.consent = new CookieConsent({
      debug: true,
      name: 'cookie-consent',
      linkOnly: false,
      onRejectEnd: () => {
        console.log('[cookie-consent:onRejectEnd]')
        window.location.reload()
      },
      onAcceptEnd: () => {
        console.log('[cookie-consent:onAcceptEnd]')
      },
      capabilities: [
        {
          debug: true,
          name: 'functional',
          checked: true,
          onReject: (consent) => {
            console.log('[functional:onReject]')
            consent.removeUserOptions()
          },
          onAccept: (consent) => {
            console.log('[functional:onAccept]')
            const choices = consent.getChoices()
            consent.saveUserOptions({ choices, consented: true })
          },
          onUpdate: (_, { choice }) => {
            console.log('[functional:onUpdate] => choice is', choice)
          },
          onValueChange: (_, { choice }) => {
            console.log('[functional:onValueChange] => choice is', choice)
          },
        },
        {
          name: 'testest',
          onReject: () => {
            console.log('[test:onReject]')
          },
          onAccept: () => {
            console.log('[test:onAccept]')
          },
          onUpdate: (_, { choice }) => {
            console.log('[test:onUpdate] => choice is', choice)
          },
          onValueChange: (_, { choice }) => {
            console.log('[test:onValueChange] => choice is', choice)
          },
        },
      ],
    })
  }, [false])

  return [<Banner key="banner" />, <Notice key="notice" />]
}

export default Consent
