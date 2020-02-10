import { prefersReducedMotion } from './accessibility'
import { getCookie, setCookie, removeCookie } from './cookie'

const Event = {
  ON_ACCEPT: 'onAccept',
  ON_REJECT: 'onReject',
  ON_UPDATE: 'onUpdate',
  ON_VALUE_CHANGED: 'onValueChanged',
}

export default class CookieConsent {
  constructor(options) {
    const defaultOptions = {
      name: 'cookie-consent',
      banner: document.getElementById('cookiebanner'),
      notice: document.getElementById('cookienotice'),
      labels: [
        {
          name: 'functional',
          checked: true,
          onReject: (consent) => {
            consent.removeCookieOptions()
          },
          onAccept: (consent) => {
            const choices = consent.getChoices()
            consent.saveCookieOptions({ choices, consented: true })
          },
          onUpdate: (_, { choice }) => {
            console.log('Functional now:', choice)
          },
        },
      ],
    }

    this.options = { ...defaultOptions, ...options }

    // console.log(this.options)

    if (!this.options.banner || !this.options.notice) {
      console.error('Can not find required elements!')
      return undefined // no banner or notice present
    }

    this.button = {}
    this.button.reject = this.options.banner.querySelector('.reject')
    this.button.accept = this.options.banner.querySelector('.accept')

    if (!this.button.reject || !this.button.accept) {
      console.error('Can not find required buttons!')
      return undefined // no buttons present
    }

    this.initEvents()

    const content = this.loadCookieOptions()

    // console.log(JSON.stringify(content, null, 2))

    if (content && content.choices) {
      this.setChoices(content.choices)
      this.runEventCircle(content.choices)
    } else {
      this.initFields()
    }

    if (content && content.consented) {
      this.showElement(this.options.notice)
    } else {
      this.showElement(this.options.banner)
    }
  }

  initFields() {
    const choices = this.options.labels.map(({ name, checked }) => ({
      name: name,
      value: checked,
    }))
    this.setChoices(choices)
    return choices
  }

  initEvents() {
    // TODO: add `onValueChange` => reload if one value is rejected

    this.button.reject.addEventListener('click', () => {
      const choices = this.initFields() // reset
      this.saveCookieOptions({ choices, consented: false })
      this.runEventsFor(choices, Event.ON_REJECT)
      window.location.reload()
    })

    this.button.accept.addEventListener('click', () => {
      const choices = this.getChoices()
      this.runEventCircle(choices)
      this.hideElement(this.options.banner)
      setTimeout(() => {
        this.showElement(this.options.notice)
      }, 160)
    })

    this.options.notice.addEventListener('click', () => {
      this.saveCookieOptions({ consented: false })
      this.hideElement(this.options.notice)
      this.showElement(this.options.banner)
    })
  }

  loadCookieOptions() {
    const content = getCookie(this.options.name)
    if (!content) return {}
    return content
  }

  saveCookieOptions(saveThis) {
    const oldContent = getCookie(this.options.name)
    const newContent = { ...oldContent, ...saveThis }
    setCookie(this.options.name, newContent)
  }

  removeCookieOptions() {
    if (getCookie(this.options.name)) {
      removeCookie(this.options.name)
    }
  }

  getChoice(byName) {
    const node = this.options.banner.querySelector(`.choice [name="choice:${byName}"]`)
    return node.checked
  }

  getChoices() {
    const choices = []
    this.options.banner.querySelectorAll('.choice input').forEach((node) => {
      const name = node.getAttribute('name').replace('choice:', '')
      const value = node.checked
      choices.push({ name, value })
    })
    return choices
  }

  setChoices(choices) {
    this.options.banner.querySelectorAll('.choice input').forEach((node) => {
      const name = node.getAttribute('name').replace('choice:', '')
      const choice = choices.find((c) => c.name === name)
      if (choice) {
        node.checked = choice.value
      }
    })
  }

  showElement(element) {
    if ('animate' in element && !prefersReducedMotion()) {
      element
        .animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 320,
          iterations: 1,
        })
        .addEventListener('finish', function onFinish() {
          element.classList.add('visible')
          element.removeEventListener('finish', onFinish)
        })
    } else {
      element.classList.add('visible')
    }
  }

  hideElement(element) {
    if ('animate' in element && !prefersReducedMotion()) {
      element
        .animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 160,
          iterations: 1,
        })
        .addEventListener('finish', function onFinish() {
          element.classList.remove('visible')
          element.removeEventListener('finish', onFinish)
        })
    } else {
      element.classList.remove('visible')
    }
  }

  runEventFor(handler, withEvent) {
    if (handler) {
      if (handler[withEvent]) {
        handler[withEvent](this)
      }

      if (handler[Event.ON_UPDATE]) {
        const params = {
          choice: this.getChoice(handler.name),
        }
        handler[Event.ON_UPDATE](this, params)
      }
    }
  }

  runEventsFor(loop, withEvent) {
    loop.forEach(({ name }) => {
      const handler = this.options.labels.find(({ name: lName }) => lName === name)
      this.runEventFor(handler, withEvent)
    })
  }

  runEventCircle(choices) {
    choices.forEach(({ name, value }) => {
      const handler = this.options.labels.find(({ name: lName }) => lName === name)
      if (value) {
        this.runEventFor(handler, Event.ON_ACCEPT)
      } else {
        this.runEventFor(handler, Event.ON_REJECT)
      }
    })
  }
}
