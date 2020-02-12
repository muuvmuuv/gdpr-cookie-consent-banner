import { h } from 'preact'
import { Link } from 'preact-router/match'

import style from './style.scss'

const Header = () => (
  <header className={style.header}>
    <h1>
      <Link href="/">CookieConsent</Link>
    </h1>
    <p>A full featured cookie consent plugin which meets GDPR and other requirements.</p>
  </header>
)

export default Header
