import { useEffect, useRef, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

const Purchase: React.FC<Props> = ({}) => {
  const [loaded, setLoaded] = useState(false)
  let paypalRef = useRef<any>()
  const [errorMessage, setErrorMessage] = useState("")
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=AfYNN50cnlkrpGJ61GPFWITwHysJVS-Ft4ozVUHpvfAhl3wR7NMRlwN8E1QRlpWjwFmZNBoXMsbQy84Q`
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
                      value: 20,
                    },
                  },
                ],
              })
            },
            // @ts-ignore
            onApprove: function (data, actions) {
              return actions.order.capture().then(async (order) => {
                const headers: any = { "Content-Type": "application/json" }
                const usernameRes = await fetch("/api/isLoggedIn")
                const username = await usernameRes.json()
                console.log(username)
                const res = await fetch("/api/purchase", {
                  method: "POST",
                  headers,
                  body: JSON.stringify({ ...order, username: username.username, id: username.id }),
                })
                if (res.status === 500) return setErrorMessage("Something went wrong! Try again.")
                console.log(res)
              })
            },
          })
          .render(paypalRef.current)
      })
    }
    return () => {}
  }, [loaded])
  return (
    <>
      <div className={styles.page}>
        <div className={styles.description}>
          <h4>Paid Courses</h4>
          <p>Just for <b>20$</b> get access to ALL our paid courses.</p>
          <div className={styles.error}>{errorMessage}</div>
        </div>
        <div ref={paypalRef}></div>
      </div>
    </>
  )
}

export default Purchase
