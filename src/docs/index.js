if (process.env.NODE_ENV === 'development') {
  require('preact/debug')
}

import { h, Component } from 'preact'
import { Suspense, lazy } from 'preact/compat'
import { Router } from 'preact-router'
import { HelmetProvider } from 'react-helmet-async'

import './style/index.scss'

import Head from './components/head'
import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'
import Loading from './components/loading'

const Consent = lazy(() => import('./components/consent'))
const Consent2 = lazy(() => import('./components/consent2'))
const Home = lazy(() => import('./routes/home'))
const Credits = lazy(() => import('./routes/credits'))

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
              <Suspense path="/" fallback={<Loading />}>
                <Home />
              </Suspense>
              <Suspense path="/credits" fallback={<Loading />}>
                <Credits />
              </Suspense>
            </Router>
          </Main>

          <Suspense>
            <Consent />
            <Consent2 />
          </Suspense>

          <Footer />
        </div>
      </HelmetProvider>
    )
  }
}
