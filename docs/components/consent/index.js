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
        <a href="#0">link to your privacy policy</a> or something similar.
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
  CookieConsent.cookie.set('cookie-test-boolean', false)
  CookieConsent.cookie.set('cookie-test-string', 'hello')
  CookieConsent.cookie.set('cookie-test-number', 17)
  CookieConsent.cookie.set('cookie-test-array', ['hello', 'world', true, 0])
  CookieConsent.cookie.set('cookie-test-object', { hello: 'world' })
  console.log('cookie-test-boolean', CookieConsent.cookie.get('cookie-test-boolean'))
  console.log('cookie-test-string', CookieConsent.cookie.get('cookie-test-string'))
  console.log('cookie-test-number', CookieConsent.cookie.get('cookie-test-number'))
  console.log('cookie-test-array', CookieConsent.cookie.get('cookie-test-array'))
  console.log('cookie-test-object', CookieConsent.cookie.get('cookie-test-object'))

  useEffect(() => {
    window.consent = new CookieConsent({
      name: 'default',
      onRejectEnd: () => {
        console.log('[default] onRejectEnd called')
        window.location.reload()
      },
      onAcceptEnd: () => {
        console.log('[default] onAcceptEnd called')
      },
      onConsent: () => {
        console.log('[default] onConsent called')
      },
      capabilities: [
        {
          name: 'functional',
          onReject: (consent) => {
            console.log('[default:functional] onReject called')
            consent.removeUserOptions()
          },
          onAccept: (consent) => {
            console.log('[default:functional] onAccept called')
            const choices = consent.getChoices()
            consent.saveUserOptions({ choices, consented: true })
          },
          onUpdate: (_, { choice }) => {
            console.log('[default:functional] onUpdate called => choice is', choice)
          },
          onValueChange: (_, { choice }) => {
            console.log('[default:functional] onValueChange called => choice is', choice)
          },
        },
        {
          name: 'testest',
          onReject: () => {
            console.log('[default:test] onReject called')
          },
          onAccept: () => {
            console.log('[default:test] onAccept called')
          },
          onUpdate: (_, { choice }) => {
            console.log('[default:test] onUpdate called => choice is', choice)
          },
          onValueChange: (_, { choice }) => {
            console.log('[default:test] onValueChange called => choice is', choice)
          },
        },
      ],
    })
  }, [])

  return [<Banner key="banner" />, <Notice key="notice" />]
}

export default Consent
