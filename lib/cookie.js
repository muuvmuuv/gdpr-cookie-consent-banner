/**
 * Vanilla JavaScript cookie service plugin.
 *
 * Hardly inspired by `ngx-cookie-service`:
 * @see https://github.com/stevermeister/ngx-cookie-service/blob/master/lib/cookie-service/cookie.service.ts
 */
export default class Cookie {
  static set(name, value, domain, path, maxAge = 7, secure, sameSite = 'Lax') {
    let cookieString = encodeURIComponent(name) + '=' + JSON.stringify(value) + ';'

    if (domain) {
      cookieString += 'domain=' + domain + ';'
    }

    if (path) {
      cookieString += 'path=' + path + ';'
    }

    if (typeof maxAge === 'number') {
      cookieString += 'max-age=' + maxAge * 60 * 60 * 24 + ';'
    }

    if (secure) {
      cookieString += 'secure;'
    }

    cookieString += 'sameSite=' + sameSite + ';'

    document.cookie = cookieString
  }

  static get(name) {
    let cookie = null

    if (document.cookie !== '') {
      const splitters = document.cookie.split(';')

      for (let i = 0; i < splitters.length; i++) {
        let [key, value] = splitters[i].split('=')
        key = decodeURIComponent(key).replace(/^ /, '')

        if (key === name) {
          return JSON.parse(value)
        }
      }
    }

    return cookie
  }

  static getAll() {
    let cookies = {}

    if (document.cookie !== '') {
      const splitters = document.cookie.split(';')

      splitters.forEach((splitter) => {
        let [key, value] = splitter.split('=')
        key = decodeURIComponent(key).replace(/^ /, '')
        value = decodeURIComponent(value)
        cookies[key] = value
      })
    }

    return cookies
  }

  static find(regex) {
    let cookies = this.getAll()

    if (typeof regex === 'string') {
      regex = new RegExp(`^${regex}`, 'g')
    }

    for (const name in cookies) {
      if (regex.test(name)) {
        return cookies[name]
      }
    }

    return null
  }

  static delete(name, domain, path) {
    this.set(name, '', domain, path, 0)
  }

  static deleteAll(domain, path) {
    const cookies = this.getAll()

    for (const name in cookies) {
      this.delete(name, domain, path)
    }
  }

  static clear(regex, domain, path) {
    const cookies = this.getAll()

    if (typeof regex === 'string') {
      regex = new RegExp(`^${regex}`, 'g')
    }

    for (const name in cookies) {
      const matches = name.match(regex)
      if (matches && matches.length > 0) {
        this.delete(name, domain, path)
      }
    }
  }
}
