import { h } from 'preact'

import style from './style.scss'
import Container from '../container'

const Loading = () => (
  <Container size="small">
    <div className={style.loading}>loading...</div>
  </Container>
)

export default Loading
