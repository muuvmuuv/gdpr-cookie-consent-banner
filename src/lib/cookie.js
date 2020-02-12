const cookieDefaults = {
  expires: getExpirationDate(),
  path: '/',
}

function createCookieString(withOptions) {
  return Object.keys(withOptions)
    .map((key) => `${key}=${withOptions[key]}`)
    .join('; ')
}

export function getCookie(withName) {
  const value = ('; ' + document.cookie)
    .split(`; ${withName}=`)
    .pop()
    .split(';')
    .shift()
  if (!value || value === 'undefined') {
    return undefined
  } else if (['true', 'false'].includes(value)) {
    return value === 'true'
  }
  return JSON.parse(value)
}

export function getAllCookies() {
  const strings = document.cookie.split('; ')
  const cookies = strings.map((str) => {
    const [key, value] = str.split('=')
    return { key, value }
  })
  return cookies
}

export function setCookie(withName, andValue, andOptions) {
  let options = {}
  options[withName] = JSON.stringify(andValue)
  options = { ...options, ...cookieDefaults, ...andOptions }
  options = createCookieString(options)
  document.cookie = options
}

export function removeCookie(withName, andOptions) {
  let options = {}
  options[withName] = ''
  options['max-age'] = 0
  options.path = cookieDefaults.path
  options = { ...options, ...andOptions }
  options.expires = new Date('1996-06-13')
  options = createCookieString(options)
  setCookie(withName, options)
}

export function clearCookies(thatMatch, withOptions) {
  const allCookies = getAllCookies()
  const regex = new RegExp(`^${thatMatch}`, 'g')
  allCookies.forEach(({ key }) => {
    if (key.match(regex)) {
      removeCookie(key, withOptions)
    }
  })
}

export function findCookie(thatMatch) {
  const allCookies = getAllCookies()
  const regex = new RegExp(`^${thatMatch}`, 'g')
  const cookie = allCookies.find(({ key }) => regex.test(key))
  return cookie || null
}

export function getExpirationDate(expiringDays = 365) {
  const expireDate = new Date()
  expireDate.setTime(expireDate.getTime() + expiringDays * 24 * 60 * 60 * 1000)
  return expireDate
}
