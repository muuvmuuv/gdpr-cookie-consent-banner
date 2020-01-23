const options = {
  labels: [
    {
      name: 'functional',
      checked: true,
      onReject: (consent) => {
        consent.saveCookieOptions({ consented: true })
      },
      onAccept: (consent) => {
        const choices = consent.getChoices()
        consent.saveCookieOptions({ choices, consented: true })
      },
    },
    {
      name: 'analytics',
      checked: false,
      onReject: () => {
        if (CookieConsent.cookieService.findCookie('_g')) {
          CookieConsent.cookieService.clearCookies('_g', {
            expires: new Date('1996-06-13'),
          })
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
}

window.onload = () => {
  /* global CookieConsent */
  window.consent = new CookieConsent(options)
  window.consent2 = new CookieConsent({
    name: 'cookie-consent2',
    banner: document.getElementById('cookieconsent2'),
    notice: document.getElementById('cookienotice2'),
  })
}
