// eslint-disable-next-line object-curly-newline
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
   return (
      <Html>
         <Head>
            <link rel="shortcut icon" href="/favicon.png" />
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap"
            />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
