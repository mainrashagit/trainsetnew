import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import { Formik, Form } from "formik"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const router = useRouter()
  function htmlDecode(content: any) {
    let e = document.createElement("div")
    e.innerHTML = content
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue ?? ""
  }
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <div className={styles.authorization__titlesLinksWrapper}>
          <p className={styles.authorization__titleLink_active}>Sign Up</p>
          <Link href="/auth/sign-in">
            <a className={styles.authorization__titleLink}>Log in</a>
          </Link>
        </div>

        <Formik
          initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
          onSubmit={async ({ username, email, password, confirmPassword }) => {
            setErrorMessage("")
            if (password !== confirmPassword) return setErrorMessage("Passwords do not match!")
            const res = await fetch("/api/register", {
              method: "POST",
              body: JSON.stringify({
                username,
                email,
                password,
              }),
            })
            const json = await res.json()
            if (json.message) return setErrorMessage(htmlDecode(json.message))
            const res2 = await fetch("/api/login", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({ username, password }),
            })
            if (!res2.ok) return setErrorMessage(htmlDecode(`${res2.status}: ${res2.statusText}`))
            const { success } = await res2.json()
            if (success) return router.push("/user")
            return setErrorMessage("Something went wrong!")
          }}
        >
          {({ handleChange }) => (
            <Form className={styles.form_active}>
              <Input type="text" placeholder="Name" name="username" onChange={handleChange} />
              <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
              <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
              <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
              <span className={styles.form__errorMessage} dangerouslySetInnerHTML={{ __html: errorMessage ?? "" }}></span>
              <Input type="submit" value={"Sign Up"} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default index
