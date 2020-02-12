import { h } from 'preact'

import style from './style.scss'
import Container from '../container'

const Main = ({ children }) => (
  <main className={style.main}>
    <Container size="small">{children}</Container>
  </main>
)

export default Main
