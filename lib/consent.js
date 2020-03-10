import { prefersReducedMotion } from './accessibility'
import Cookie from './cookie'

const Event = {
  // order is important here
  ON_UPDATE: 'onUpdate',
  ON_VALUE_CHANGED: 'onValueChange',
  ON_ACCEPT: 'onAccept',
  ON_REJECT: 'onReject',
}

const GlobalEvent = {
  ON_CONSENT: 'onConsent',
  ON_ACCEPT_END: 'onAcceptEnd',
  ON_REJECT_END: 'onRejectEnd',
}

export default class CookieConsent {
  constructor(options) {
    const defaultOptions = {
      name: 'cookie-consent',
      banner: document.getElementById('cookiebanner'),
      notice: document.getElementById('cookienotice'),
      linkOnly: false,
      onConsent: (consent) => {
        const choices = consent.getChoices()
        consent.saveUserOptions({ choices, consented: true })
      },
      capabilities: [
        {
          name: 'functional',
          noOptOut: true,
        },
      ],
    }

    this.options = { ...defaultOptions, ...options }
    this.queue = [] // this will hold event hooks to run in order

    if (!this.options.banner || !this.options.notice) {
      console.error('Can not find required elements!')
      return // no banner or notice present
    }

    this.button = {}
    this.button.reject = this.options.banner.querySelector('.reject')
    this.button.accept = this.options.banner.querySelector('.accept')

    if (!this.button.reject || !this.button.accept) {
      console.error('Can not find required buttons!')
      return undefined // no buttons present
    }

    this.initEvents()

    const content = this.loadUserOptions()

    console.log(JSON.stringify(content, null, 2))

    if (content?.choices) {
      this.setChoices(content.choices)
      this.initStartUpEvents()
    }

    if (content?.consented) {
      this.showNotice()
    } else {
      this.showBanner()
    }
  }

  /**
   * Initial all element events.
   */
  initEvents() {
    // Reject
    this.button.reject.addEventListener('click', () => {
      this.disableChoices()
      const choices = this.getChoices()
      choices.forEach((choice) => {
        const capability = this.getCapability(choice.name)
        this._runValueEventsFor(capability, choice)
        this._runEventFor(capability, Event.ON_REJECT)
      })
      this._startRunner()

      if (this.options[GlobalEvent.ON_CONSENT] instanceof Function) {
        this.options[GlobalEvent.ON_CONSENT](this)
      }
      if (this.options[GlobalEvent.ON_REJECT_END] instanceof Function) {
        this.options[GlobalEvent.ON_REJECT_END](this)
      }

      this.hideBanner()
      this.showNotice()
    })

    // Accept
    this.button.accept.addEventListener('click', () => {
      const choices = this.getChoices()
      choices.forEach((choice) => {
        const capability = this.getCapability(choice.name)
        this._runValueEventsFor(capability, choice)
        if (choice.value) {
          this._runEventFor(capability, Event.ON_ACCEPT)
        } else {
          this._runEventFor(capability, Event.ON_REJECT)
        }
      })
      this._startRunner()

      if (this.options[GlobalEvent.ON_CONSENT] instanceof Function) {
        this.options[GlobalEvent.ON_CONSENT](this)
      }
      if (this.options[GlobalEvent.ON_ACCEPT_END] instanceof Function) {
        this.options[GlobalEvent.ON_ACCEPT_END](this)
      }

      this.hideBanner()
      this.showNotice()
    })

    // Show banner
    this.options.notice.addEventListener('click', () => {
      this.hideNotice()
      this.showBanner()
    })
  }

  /**
   * On first load fire these events.
   */
  initStartUpEvents() {
    const choices = this.getChoices()
    choices.forEach((choice) => {
      const capability = this.getCapability(choice.name)
      if (choice.value) {
        this._runEventFor(capability, Event.ON_ACCEPT)
      } else {
        this._runEventFor(capability, Event.ON_REJECT)
      }
    })
    this._startRunner()
  }

  /**
   * Get our plugin options cookies content.
   */
  loadUserOptions() {
    const content = Cookie.get(this.options.name)
    if (!content) return {}
    return content
  }

  /**
   * Save something to our plugin options cookie.
   *
   * @param {object} saveThis
   */
  saveUserOptions(saveThis) {
    const oldContent = this.loadUserOptions()
    const newContent = { ...oldContent, ...saveThis }
    Cookie.set(this.options.name, newContent, null, '/')
  }

  /**
   * Delete all plugin options that are saved into a cookie.
   */
  removeUserOptions() {
    if (Cookie.get(this.options.name)) {
      Cookie.delete(this.options.name)
    }
  }

  /**
   * Get single form input choice by its input name.
   *
   * @param {string} byName
   */
  getChoice(byName) {
    const node = this.options.banner.querySelector(`.choice [name="choice:${byName}"]`)

    return node.checked
  }

  /**
   * Get form input choices.
   */
  getChoices() {
    let choices = []

    this.options.banner.querySelectorAll('.choice input').forEach((node) => {
      const name = node.getAttribute('name').replace('choice:', '')
      const value = node.checked
      choices.push({ name, value })
    })

    return choices
  }

  /**
   * Set form input choices. Most likely for reseting the form.
   *
   * @param {Choice[]} choices
   */
  setChoices(choices) {
    this.options.banner.querySelectorAll('.choice input').forEach((node) => {
      const name = node.getAttribute('name').replace('choice:', '')
      const choice = choices.find((c) => c.name === name)
      if (choice) {
        node.checked = choice.value
      } else {
        console.log(node)
        console.log(choice)
        console.log('COOKIE and CHOICES are not compatible')
      }
    })
  }

  /**
   * Disable all choices that user are able to opt out.
   */
  disableChoices() {
    const choices = this.getChoices()

    this.options.capabilities.forEach(({ name, noOptOut }) => {
      const choice = choices.findIndex((c) => c.name === name)
      if (choice !== -1 && !noOptOut) {
        choices[choice].value = false
      }
    })

    this.setChoices(choices)
  }

  /**
   * Get capability by name.
   *
   * @param {string} name
   */
  getCapability(name) {
    return this.options.capabilities.find((c) => c.name === name)
  }

  /**
   * Smoothly show an element.
   *
   * @param {HTMLElement} element
   */
  showElement(element) {
    if ('animate' in element && !prefersReducedMotion()) {
      element
        .animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 320,
          iterations: 1,
        })
        .addEventListener('finish', function onFinish() {
          element.classList.add('visible')
        })
    } else {
      element.classList.add('visible')
    }
  }

  /**
   * Smoothly hide an element.
   *
   * @param {HTMLElement} element
   */
  hideElement(element) {
    if ('animate' in element && !prefersReducedMotion()) {
      element
        .animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 160,
          iterations: 1,
        })
        .addEventListener('finish', function onFinish() {
          element.classList.remove('visible')
        })
    } else {
      element.classList.remove('visible')
    }
  }

  /**
   * Hide/Show the banner.
   */
  hideBanner() {
    this.hideElement(this.options.banner)
  }
  showBanner() {
    this.showElement(this.options.banner)
  }

  /**
   * Hide/Show the notice.
   */
  hideNotice() {
    if (!this.options.linkOnly) {
      this.hideElement(this.options.notice)
    }
  }
  showNotice() {
    if (!this.options.linkOnly) {
      this.showElement(this.options.notice)
    }
  }

  /**
   * Add a callable event function to an queue.
   *
   * @param {string} name
   * @param {function} func
   */
  _addToQueue(name, func) {
    this.queue.push({ name, func })
  }

  /**
   * Run the callable event queue.
   */
  _startRunner() {
    // loop event by order
    for (const event of Object.values(Event)) {
      // find callables from queue with event name
      const callables = this.queue.filter((q) => q.name === event)
      // call them
      callables.forEach(({ func }) => func())
    }
    this.queue = [] // clear queue for new operations
  }

  /**
   * Run one event for one capability.
   *
   * @param {Capability} capability
   * @param {Event} withEvent
   * @param {object} params
   */
  _runEventFor(capability, withEvent, params = {}) {
    if (capability[withEvent] && capability[withEvent] instanceof Function) {
      this._addToQueue(withEvent, () => capability[withEvent](this, params))
    }
  }

  /**
   * Run common or value change/update events for one capability.
   *
   * @param {Capability} capability
   * @param {Choice} withChoice
   */
  _runValueEventsFor(capability, withChoice) {
    let params = {
      choice: withChoice.value,
    }

    // on input value update
    this._runEventFor(capability, Event.ON_UPDATE, params)

    // on input value change
    const userOptions = this.loadUserOptions()
    // load saved cookie options choices if present
    if (userOptions?.choices) {
      // find current choice in saved choices
      const choice = userOptions.choices.find((c) => c.name === withChoice.name)
      // check against input choice value
      const hasChanged = withChoice.value !== choice.value
      if (hasChanged) {
        this._runEventFor(capability, Event.ON_VALUE_CHANGED, params)
      }
    }
  }
}
