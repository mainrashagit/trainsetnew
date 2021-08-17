import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import Checkbox from "@modules/form/Checkbox/Checkbox"
import { Formik, Form } from "formik"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import { setJazz } from "@modules/token"
import Title from "@modules/text/Title/Title"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const router = useRouter()
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <Formik
          initialValues={{ usernameOrEmail: "" }}
          onSubmit={async (values) => {
            setErrorMessage("")
            const res = await fetch("/api/reset", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(values),
            })
          }}
        >
          {({ handleChange }) => (
            <Form className={styles.form_active}>
                <Title>Enter username or email</Title>
            <span className={styles.form__errorMessage} dangerouslySetInnerHTML={{__html: errorMessage ?? ""}}></span>
              <Input type="text" placeholder="Username Or Email" name="usernameOrEmail" onChange={handleChange} />
              <Input type="submit" value="Reset Password" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default index
