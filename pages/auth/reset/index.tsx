import styles from "../auth.module.sass"
import Input from "@modules/form/Input/Input"
import { Formik, Form } from "formik"
import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import Title from "@modules/text/Title/Title"

interface Props { }

const index: React.FC<Props> = ({ }) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const router = useRouter()
  const [params, setParams] = useState<{ key: string, login: string }>()
  useEffect(() => {
    if (!("key" in router.query) || !("login" in router.query)) return
    const { key, login } = router.query
    // @ts-ignore
    setParams({ key, login })
    return () => {
    }
  }, [router.query])
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={async (values) => {
            setErrorMessage("Processing...")
            const res = await fetch("/api/reset", {
              method: "POST",
              body: JSON.stringify({ values, params }),
            })
            const data = await res.json()
            if ("success" in data) return setErrorMessage("Password successfully changed! You may now sign in with your new password.")
            return setErrorMessage(data.message)
          }}
        >
          {({ handleChange }) => (
            <Form className={styles.form_active}>
              <Title>Enter new password</Title>
              <span className={styles.form__errorMessage} dangerouslySetInnerHTML={{ __html: errorMessage ?? "" }}></span>
              <Input type="password" placeholder="New password" name="password" onChange={handleChange} />
              <Input type="submit" value="Change Password" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default index
