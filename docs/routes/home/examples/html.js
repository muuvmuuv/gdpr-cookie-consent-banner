export default `
<div
  id="cookiebanner"
  class="cookiebanner"
  aria-label="Edit your cookie settings"
  role="banner"
>
  <div class="info">
    <div class="title">Your Cookie Controls</div>
    <div class="description">Paste some info for your users here.</div>
  </div>
  <div class="choices">
    <label class="choice" for="choice-functional">
      <input
        type="checkbox"
        name="choice:functional"
        id="choice-functional"
        checked
        disabled
      />
      <div class="name">Functional with a very long long long long long</div>
    </label>
    <label class="choice" for="choice-ga_analytics">
      <input type="checkbox" name="choice:ga_analytics" id="choice-ga_analytics" />
      <div class="name">Google Analytics</div>
      <p class="info">
        Google Tag Manager will be enabled here. Read more about it here:{' '}
        <a
          href="https://www.google.com/intl/de/tagmanager/faq.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Tag Manager FAQ
        </a>
      </p>
    </label>
    <label class="choice" for="choice-sa_analytics">
      <input type="checkbox" name="choice:sa_analytics" id="choice-sa_analytics" />
      <div class="name">Simple Analytics</div>
      <p class="info">
        Privacy first analytics provider. Read more here:{' '}
        <a
          href="https://docs.simpleanalytics.com/what-we-collect?ref=simpleanalytics.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Simple Analytics – What we collect
        </a>
      </p>
    </label>
  </div>
  <div class="buttons">
    <button class="reject">Reject choices</button>
    <button class="accept">Accept choices</button>
  </div>
</div>
<div
  id="cookienotice"
  class="cookienotice"
  aria-label="Show the cookie settings again"
  role="button"
>
  <img src="/assets/cookie.svg" alt="A shield which represents privacy" />
</div>
`
