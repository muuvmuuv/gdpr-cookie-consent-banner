if (process.env.NODE_ENV === 'development') {
  require('preact/debug')
}

import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { HelmetProvider } from 'react-helmet-async'

import './style/index.scss'

import Head from './components/head'
import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'
import Consent from './components/consent'
import Consent2 from './components/consent2'

import Home from './routes/home'
import Credits from './routes/credits'

export default class App extends Component {
  /**
   * Gets fired when the route changes.
   *
   *	@param {Object} event event from preact-router http://git.io/preact-router
   */
  handleRoute = (event) => {
    this.currentUrl = event.url
  }

  render() {
    return (
      <HelmetProvider>
        <div id="app">
          <Head />
          <Header />

          <Main>
            <Router onChange={this.handleRoute}>
              <Home path="/" />
              <Credits path="/credits" />
            </Router>
          </Main>

          <Consent />
          <Consent2 />

          <Footer />
        </div>
      </HelmetProvider>
    )
  }
}
