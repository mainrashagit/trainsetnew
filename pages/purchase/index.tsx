import { getJazz, setJazz } from "@modules/token"
import { useRouter } from "next/dist/client/router"
import { useEffect, useRef, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

const Purchase: React.FC<Props> = ({}) => {
  const [loaded, setLoaded] = useState(false)
  let paypalRef = useRef<any>()
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  useEffect(() => {
    fetch("/api/isLoggedIn", {
      method: "POST",
      credentials: "include",
      body: getJazz(),
    })
      .then((r) => r.json())
      .then((d) => {
        console.log(d)
        if (!d?.content?.username) return router.push("/auth/sign-in")
        if (d?.content?.role?.includes("paid")) router.push("/user")
        if (typeof d?.jazz === "string" && d?.jazz?.length > 0) setJazz(d?.jazz)
      })

    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=AeCM8h3gwb-t6sUJa3RyOF2tPWeKePZioJxuWNaqI691i2OfZiHcacb0aPlSOStk_TFZeyN2jTVmy6uq`
    script.addEventListener("load", () => setLoaded(true))
    document.body.appendChild(script)

    return () => {}
  }, [router.route])
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
              // @ts-ignore
              return actions.order.capture().then(async (order) => {
                const headers: any = { "Content-Type": "application/json" }
                const usernameRes = await fetch("/api/isLoggedIn")
                const { jazz, content } = await usernameRes.json()
                if (typeof jazz === "string" && jazz.length > 0) setJazz(jazz)
                const res = await fetch("/api/purchase", {
                  method: "POST",
                  headers,
                  credentials: "include",
                  body: JSON.stringify({ ...order, username: content.username, id: content.id, jazz: getJazz() }),
                })
                if (res.status === 500) return setErrorMessage("Something went wrong! Try again.")
                if (res.status === 200) return router.push("/user")
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
          <p>
            Just for <b>20$</b> get access to ALL our paid courses.
          </p>
          <div className={styles.error}>{errorMessage}</div>
        </div>
        <div ref={paypalRef}></div>
      </div>
    </>
  )
}

export default Purchase
