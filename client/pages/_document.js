import { Html, Head, Main, NextScript } from 'next/document'

export default function MyDocument (){
    return (
      <Html>
        <Head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <link href="https://fonts.googleapis.com/css2?family=Joan&family=League+Gothic&family=Oswald:wght@700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
}