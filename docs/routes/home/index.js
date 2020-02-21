import { h } from 'preact'

import style from './style.scss'
import Code from '../../components/code'

import HTMLExample from './examples/html'
import JavaScriptExample from './examples/javascript'

const Home = () => {
  return (
    <div className={style.page}>
      <h3>Install via pnpm</h3>
      <Code language="shell">{`
pnpm install gdpr-cookie-consent-banner
`}</Code>
      <h3>Install via yarn</h3>
      <Code language="shell">{`
yarn install gdpr-cookie-consent-banner
`}</Code>
      <h3>Install via npm</h3>
      <Code language="shell">{`
npm install gdpr-cookie-consent-banner
`}</Code>

      <h3>HTML</h3>
      <Code language="html">{HTMLExample}</Code>

      <h3>JavaScript</h3>
      <Code language="js">{JavaScriptExample}</Code>
    </div>
  )
}

export default Home
