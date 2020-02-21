export default `
window.consent = new CookieConsent({
  capabilities: [
    {
      name: 'functional',
      checked: true,
    },
    {
      name: 'ga_analytics',
      checked: false,
      onReject: () => {
        if (CookieConsent.cookie.find('_g')) {
          CookieConsent.cookie.clear('_g', '.' + window.location.hostname, '/')
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
          gtag('config', 'UA-XXXXXXX-XX', {
            anonymize_ip: true,
          })
        }
        head.appendChild(script)
      },
    },
    {
      name: 'sa_analytics',
      checked: false,
      onAccept: () => {
        const head = document.getElementsByTagName('head')[0]
        const script = document.createElement('script')
        script.src = 'https://cdn.simpleanalytics.io/hello.js'
        script.async = true
        head.appendChild(script)
      },
    },
  ],
})
`
