import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import { Formik, Form } from "formik"

interface Props {}

const index: React.FC<Props> = ({}) => {
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
          initialValues={{name: "", email: "", password: "", confirmPassword: ""}}
          onSubmit={(values) => {
            // console.log(values)
            // fetch("/api/user", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(values)
            // })
          }}
        >
          {({handleChange}) =>
          <Form className={styles.form_active}>
            <Input type="text" placeholder="Name" name="name" onChange={handleChange} />
            <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
            <span className={styles.form__errorMessage}>Введенные пароли не совпадают</span>
            <Input type="submit" value={"Sign Up"} />
          </Form>}
        </Formik>
      </div>
    </div>
  )
}

export default index
