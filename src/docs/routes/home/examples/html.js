export default `
<html lang="en">
  <head>
    <link rel="stylesheet" href="./path/to/cookie-consent.umd.css" />
    <script defer src="./path/to/cookie-consent.umd.js"></script>
  </head>
  <body>
    <div
      id="cookiebanner"
      className="cookiebanner"
      aria-label="Edit your cookie settings"
      role="banner"
    >
      <div className="info">
        <div className="title">Your Cookie Controls</div>
        <div className="description">
          Paste some info for your users here. For example a
          <a href="#0">link to your privacy policy</a> or something similiar.
        </div>
      </div>
      <div className="choices">
        <label className="choice" htmlFor="choice-functional2">
          <input
            type="checkbox"
            name="choice:functional"
            id="choice-functional2"
            checked
          />
          <div className="name">Functional</div>
          <p className="info">
            Rejecting will let this banner re-appear on every reload.
          </p>
        </label>
        <label className="choice" htmlFor="choice-testest">
          <input type="checkbox" name="choice:testest" id="choice-testest" />
          <div className="name">Test</div>
          <p className="info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </label>
      </div>
      <div className="buttons">
        <button className="reject">Reject choices</button>
        <button className="accept">Accept choices</button>
      </div>
    </div>
    <div
      id="cookienotice"
      className="cookienotice"
      aria-label="Show the cookie settings again"
      role="button"
    >
      <img src="/assets/cookie.svg" alt="A shield which represents privacy" />
    </div>
  </body>
</html>
`
