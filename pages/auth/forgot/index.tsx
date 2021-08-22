import styles from "../auth.module.sass"
import Input from "@modules/form/Input/Input"
import { Formik, Form } from "formik"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import Title from "@modules/text/Title/Title"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const router = useRouter()
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            setErrorMessage("Processing...")
            const res = await fetch("/api/forgot", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(values),
            })
            const data = await res.json()
            if (data.success) return setErrorMessage("Message sent! Check your email.")
            return setErrorMessage("Something went wrong! Check if the email is correct.")
          }}
        >
          {({ handleChange }) => (
            <Form className={styles.form_active}>
                <Title>Reset password</Title>
                <p style={{fontSize: "1rem", lineHeight: "1.4"}}>The link with password reset is going to be sent to the email you provide</p>
            <span className={styles.form__errorMessage} dangerouslySetInnerHTML={{__html: errorMessage ?? ""}}></span>
              <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
              <Input type="submit" value="Reset Password" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default index
