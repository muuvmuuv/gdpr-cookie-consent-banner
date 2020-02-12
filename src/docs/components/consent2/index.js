import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import CookieConsent from '../../../lib'

import style from './style.scss'

const Banner = () => (
  <div
    id="cookiebanner2"
    className={`cookiebanner ${style.banner}`}
    aria-label="Edit your cookie settings"
    role="banner"
  >
    <div className="info">
      <div className="title">Your Cookie Controls</div>
      <div className="description">Paste some info for your users here.</div>
    </div>
    <div className="choices">
      <label className="choice" htmlFor="choice-functional">
        <input
          type="checkbox"
          name="choice:functional"
          id="choice-functional"
          checked
          disabled
        />
        <div className="name">Functional with a very long long long long long</div>
      </label>
      <label className="choice" htmlFor="choice-ga_analytics">
        <input type="checkbox" name="choice:ga_analytics" id="choice-ga_analytics" />
        <div className="name">Google Analytics</div>
        <p className="info">
          Google Tag Manager will be enabled here. Read more about it here:{' '}
          <a
            href="https://www.google.com/intl/de/tagmanager/faq.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Tag Manager FAQ
          </a>
        </p>
      </label>
      <label className="choice" htmlFor="choice-sa_analytics">
        <input type="checkbox" name="choice:sa_analytics" id="choice-sa_analytics" />
        <div className="name">Simple Analytics</div>
        <p className="info">
          Privacy first analytics provider. Read more here:{' '}
          <a
            href="https://docs.simpleanalytics.com/what-we-collect?ref=simpleanalytics.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Simple Analytics – What we collect
          </a>
        </p>
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
    id="cookienotice2"
    className={`cookienotice ${style.banner}`}
    aria-label="Show the cookie settings again"
    role="button"
  >
    <img src="/assets/cookie.svg" alt="A shield which represents privacy" />
  </div>
)

const Consent2 = () => {
  useEffect(() => {
    window.consent2 = new CookieConsent({
      name: 'consent-with-ga',
      banner: document.getElementById('cookiebanner2'),
      notice: document.getElementById('cookienotice2'),
      capabilities: [
        {
          name: 'functional',
          checked: true,
          onAccept: (consent) => {
            console.log('[functional2:onAccept]')
            consent.saveUserOptions({ consented: true })
          },
        },
        {
          name: 'ga_analytics',
          checked: false,
          onReject: () => {
            console.log('[ga_analytics:onReject]')
            if (CookieConsent.cookieService.findCookie('_g')) {
              CookieConsent.cookieService.clearCookies('_g', {
                expires: new Date('1996-06-13'),
              })
            }
          },
          onAccept: () => {
            console.log('[ga_analytics:onAccept]')
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
        {
          name: 'sa_analytics',
          checked: false,
          onReject: () => {
            console.log('[sa_analytics:onReject]')
          },
          onAccept: () => {
            console.log('[sa_analytics:onAccept]')
            console.log('not yet configured')
          },
        },
      ],
    })
  })

  return [<Banner key="banner" />, <Notice key="notice" />]
}

export default Consent2
