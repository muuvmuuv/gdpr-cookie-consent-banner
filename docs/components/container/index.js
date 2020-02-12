import { h } from 'preact'

import style from './style.scss'

const Container = ({ children, size, className, ...props }) => {
  const classes = [style.container, className]

  if (style[size]) {
    classes.push(style[size])
  }

  return (
    <div className={classes.join(' ')} {...props}>
      {children}
    </div>
  )
}

export default Container
