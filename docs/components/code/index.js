import { h } from 'preact'
import { useState } from 'preact/hooks'
import Highlight, { defaultProps } from 'prism-react-renderer'
import copy from 'copy-text-to-clipboard'

import globalStyle from './style.scss'
import Button from '../button'
import { lightTheme } from './themes'
import { normalize } from '../../utils/normalize'

const renderTokens = (tokens, getLineProps, getTokenProps) => {
  const linesTokened = []
  const linesNumbered = []

  tokens.forEach((line, i) => {
    linesTokened.push(
      <div {...getLineProps({ line, key: i })}>
        {line.map((token, key) => (
          /* eslint-disable-next-line react/jsx-key */
          <span {...getTokenProps({ token, key })} />
        ))}
      </div>
    )

    linesNumbered.push(<div key={i}>{i + 1}</div>)
  })

  return { linesTokened, linesNumbered }
}

const Code = ({ children, language }) => {
  const [copyState, setCopyState] = useState('Copy')

  function copyCode() {
    copy(children)
    setCopyState('Copied!')
    setTimeout(() => {
      setCopyState('Copy')
    }, 1200)
  }

  const highlightProps = {
    ...defaultProps,
    ...{
      theme: lightTheme,
    },
  }

  const htmlString = normalize(children)

  return (
    <Highlight {...highlightProps} code={htmlString} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => {
        const { linesTokened, linesNumbered } = renderTokens(
          tokens,
          getLineProps,
          getTokenProps
        )

        return (
          <pre className={globalStyle.highlight}>
            <div className={globalStyle.numbers}>{linesNumbered}</div>
            <code>{linesTokened}</code>
            <div className={globalStyle.actions}>
              <Button onClick={copyCode} onKeyPress={copyCode}>
                {copyState}
              </Button>
              <div>{language.toUpperCase()}</div>
            </div>
          </pre>
        )
      }}
    </Highlight>
  )
}

export default Code
