import Head from "next/head"

interface Props { }

const CustomHead: React.FC<Props> = ({ }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="keywords" content="ключевые слова" />
      <meta name="description" content="крутой сайт" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML" id="">
      </script>
    </Head>
  )
}

export default CustomHead
