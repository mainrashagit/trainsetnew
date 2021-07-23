import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import Checkbox from "@modules/form/Checkbox/Checkbox"

interface Props {}

const index: React.FC<Props> = ({}) => {
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <div className={styles.authorization__titlesLinksWrapper}>
          <Link href="/auth/sign_up">
            <a className={styles.authorization__titleLink}>
              Sign Up
            </a>
          </Link>
          <p
            className={styles.authorization__titleLink_active}
          >
            Log in
          </p>
        </div>

        <form
          action="#"
          className={styles.form_active}
          id="loginInForm"
        >
          <Input type="text" placeholder="Name" />
          <Input type="password" placeholder="Password" />
          <div className={styles.form__checkbox}>
            <Checkbox text="Remember me" />
          </div>
          <Input type="submit" value="Login In" />

          <a href="#" className={styles.form__restorePassword}>
            Forgot your password?
          </a>
        </form>
      </div>
    </div>
  )
}

export default index
