import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import Checkbox from "@modules/form/Checkbox/Checkbox"
import useUser from "@/lib/useUser"
import { FormEvent, useState } from "react"
import fetchJson from "@/lib/fetchJson"
import { Formik, Form } from "formik"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const { mutateUser } = useUser({
    redirectTo: "/user",
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = useState("")

  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()

  //   const body = {
  //     username: event.currentTarget.username.value,
  //   }

  //   try {
  //     mutateUser(
  //       await fetchJson("/api/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       })
  //     )
  //   } catch (error) {
  //     console.error("An unexpected error happened:", error)
  //     setErrorMsg(error.data.message)
  //   }
  // }
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
            // console.log(values)
            // const res = await fetch("/api/user", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(values),
            // })
            // console.log(res)
          }}
        >
          {({ handleChange }) => (
            <Form className={styles.form_active}>
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