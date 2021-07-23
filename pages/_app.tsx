import type { AppProps } from "next/app"
import "@/styles/styles.sass"
import Layout from "@modules/Layout/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
