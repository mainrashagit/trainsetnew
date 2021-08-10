import type { AppProps } from "next/app"
import "@/styles/styles.sass"
import Layout from "@modules/Layout/Layout"
import { useEffect } from "react"

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
