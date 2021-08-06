import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import Checkbox from "@modules/form/Checkbox/Checkbox"
import { Formik, Form } from "formik"

interface Props {}

const index: React.FC<Props> = ({}) => {
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
