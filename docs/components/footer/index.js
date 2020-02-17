import { h } from 'preact'
import { Link } from 'preact-router/match'

import style from './style.scss'

const Header = () => (
  <footer className={style.footer}>
    <Link href="/credits">Credits</Link>
    <a
      href="https://simpleanalytics.com/gdpr-cookie-consent-banner.muuvmuuv.now.sh"
      target="_blank"
      rel="noopener noreferrer"
    >
      Analytics
    </a>
    <a href="https://marvin.digital/privacy" target="_blank" rel="noopener noreferrer">
      Privacy
    </a>
    <a href="https://marvin.digital/imprint" target="_blank" rel="noopener noreferrer">
      Imprint
    </a>
  </footer>
)

export default Header
