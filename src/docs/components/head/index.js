import { h } from 'preact'
import { getCurrentUrl } from 'preact-router'
import { Helmet } from 'react-helmet-async'
import pkg from '../../../../package.json'

const Head = ({
  siteTitle = pkg.name,
  siteDescription = pkg.description,
  siteAuthor = pkg.author.name,
  siteLanguage,
  siteKeywords = pkg.keywords,
  siteUrl = pkg.homepage,
  pageTitle,
  pageLang = siteLanguage,
  ogImage = '/assets/og-image.jpg',
  twitterCard = '/assets/twitter-card.jpg',
  location = getCurrentUrl(),
  canonical = siteUrl + (location.pathname || ''),
  bodyClasses,
}) => {
  const language = pageLang || siteLanguage || 'en'

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      bodyAttributes={{
        class: bodyClasses,
      }}
      title={pageTitle}
      defaultTitle={siteTitle}
      titleTemplate={`%s | ${siteTitle}`}
    >
      <meta charset="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta name="generator" content="preact" />
      <link rel="canonical" href={canonical} />

      <meta name="language" content={language} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords.join(', ')} />
      <meta name="author" content={siteAuthor} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/assets/favicon/apple-touch-icon.png?v=${pkg.version}`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/assets/favicon/favicon-32x32.png?v=${pkg.version}`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/assets/favicon/favicon-16x16.png?v=${pkg.version}`}
      />
      <link rel="manifest" href={`/assets/favicon/site.webmanifest?v=${pkg.version}`} />
      <link
        rel="mask-icon"
        href={`/assets/favicon/safari-pinned-tab.svg?v=${pkg.version}`}
        color="#bbcf02"
      />
      <link rel="shortcut icon" href={`/assets/favicon/favicon.ico?v=${pkg.version}`} />
      <meta name="msapplication-TileColor" content="#bbcf02" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="og:type" content="website" />
      <meta name="og:title" content={pageTitle} />
      <meta name="og:description" content={siteDescription} />
      <meta name="og:image" content={ogImage} />
      <meta name="og:image:alt" content={pageTitle} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@muuvmuuv" />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={twitterCard} />
      <meta name="twitter:image:alt" content={pageTitle} />
      <meta name="twitter:url" content={canonical} />
    </Helmet>
  )
}

export default Head
