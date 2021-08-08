import { useEffect, useRef, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

const Purchase: React.FC<Props> = ({}) => {
  const [loaded, setLoaded] = useState(false)
  let paypalRef = useRef<any>()
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=AWG9PXf_UJ-2bqPvPJz4j37o98QGBYoniz9aKlO7ePB3S6tUygZ7bMZeqeFI-byRLO26Por4HcOaOyDe`
    script.addEventListener("load", () => setLoaded(true))
    document.body.appendChild(script)

    
    return () => {}
  }, [])
  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        // @ts-ignore
        window.paypal
          .Buttons({
            // @ts-ignore
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "test",
                    amount: {
                      currency_code: "USD",
                      value: 100,
                    },
                  },
                ],
              })
            },
            // @ts-ignore
            onApprove: async (data, actions) => {
              const order = await actions.order.capture()
              console.log(order)
            },
          })
          .render(paypalRef.current)
      })
    }
    return () => {
      
    }
  }, [loaded])
  return (
    <>
      <div>
        <div ref={paypalRef}></div>
      </div>
    </>
  )
}

export default Purchase
