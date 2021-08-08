import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import { Formik, Form } from "formik"
import { useState } from "react"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState<string>()
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
            if (json.message) setErrorMessage(json.message)
            console.log(res, json)
          }}
        >
          {({ handleChange }) => (
            <Form className={styles.form_active}>
              <Input type="text" placeholder="Name" name="username" onChange={handleChange} />
              <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
              <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
              <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
              <span className={styles.form__errorMessage} dangerouslySetInnerHTML={{__html: errorMessage ?? ""}}></span>
              <Input type="submit" value={"Sign Up"} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default index
