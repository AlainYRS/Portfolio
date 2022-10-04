import { Html, Head, Main, NextScript } from 'next/document'

export default function MyDocument (){
    return (
      <Html>
        <Head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <link href="https://fonts.googleapis.com/css2?family=Joan&family=League+Gothic&family=Oswald:wght@700&display=swap" rel="stylesheet" />
            <link rel="manifest" href="../static/manifest.json" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="AlainYRS_PWA_Portfolio" />
            <meta name="apple-mobile-web-app-title" content="AlainYRS_PWA_Portfolio" />
            <meta name="theme-color" content="#0A0A0A" />
            <meta name="msapplication-navbutton-color" content="#0A0A0A" />
            <meta name="apple-mobile-web-app-status-bar" content="#0A0A0A" />
            <meta name="msapplication-starturl" content="/" />
            <link rel="icon" type="image/png" sizes="700x700" href="/static/Icons/AYRSIcon700.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="700x700" href="/static/Icons/AYRSIcon700.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/static/Icons/AYRSIcon192.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/static/Icons/AYRSIcon192.png" />
            <link rel="icon" type="image/png" sizes="168x168" href="/static/Icons/AYRSIcon168.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="168x168" href="/static/Icons/AYRSIcon168.png" />
            <link rel="icon" type="image/png" sizes="144x144" href="/static/Icons/AYRSIcon144.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="/static/Icons/AYRSIcon144.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/static/Icons/AYRSIcon96.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="96x96" href="/static/Icons/AYRSIcon96.png" />
            <link rel="icon" type="image/png" sizes="72x72" href="/static/Icons/AYRSIcon72.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/static/Icons/AYRSIcon72.png" />
            <link rel="icon" type="image/png" sizes="48x48" href="/static/Icons/AYRSIcon48.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="48x48" href="/static/Icons/AYRSIcon48.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
}