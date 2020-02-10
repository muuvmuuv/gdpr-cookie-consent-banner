import { h } from 'preact'

import style from './style.scss'
import Head from '../../components/head'

const Home = () => (
  <div className={style.page}>
    <Head pageTitle="Credits" />

    <ul>
      <li>
        Icon made by{' '}
        <a
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
          rel="noopener noreferrer nofollow"
        >
          Freepik
        </a>{' '}
        from{' '}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          rel="noopener noreferrer nofollow"
        >
          www.flaticon.com
        </a>
      </li>
    </ul>
  </div>
)

export default Home
