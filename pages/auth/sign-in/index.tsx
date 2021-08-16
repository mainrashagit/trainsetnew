import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import Checkbox from "@modules/form/Checkbox/Checkbox"
import { Formik, Form } from "formik"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import { setJazz } from "@modules/token"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const router = useRouter()
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <div className={styles.authorization__titlesLinksWrapper}>
          <Link href="/auth/sign-up">
            <a className={styles.authorization__titleLink}>Sign Up</a>
          </Link>
          <p className={styles.authorization__titleLink_active}>Log in</p>
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values) => {
            setErrorMessage("")
            const res = await fetch("/api/login", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(values),
            })
            if (res.status === 403) {
              const errors = await res.json()
              if (errors[0].message === "empty_username") return setErrorMessage("Username cannot be empty!")
              if (errors[0].message === "empty_password") return setErrorMessage("Password cannot be empty!")
              if (errors[0].message === "incorrect_password") return setErrorMessage("Incorrect password!")
              if (errors[0].message === "invalid_username") return setErrorMessage("Invalid username!")
              return setErrorMessage(`Uncaught error: ${errors[0].message}. Please, report this error to us so we could fix it.`)
            }
            if (!res.ok) return setErrorMessage(`${res.status}: ${res.statusText}`)
            const { success, jazz } = await res.json()
            setJazz(jazz)
            if (success) return router.push('/user')
            return setErrorMessage("Something went wrong!")
          }}
        >
          {({ handleChange }) => (
            <Form className={styles.form_active}>
            <span className={styles.form__errorMessage} dangerouslySetInnerHTML={{__html: errorMessage ?? ""}}></span>
              <Input type="text" placeholder="Name" name="username" onChange={handleChange} />
              <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
              <div className={styles.form__checkbox}>
                <Checkbox text="Remember me" />
              </div>
              <Input type="submit" value="Login In" />

              <a href="#" className={styles.form__restorePassword}>
                Forgot your password?
              </a>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default index
