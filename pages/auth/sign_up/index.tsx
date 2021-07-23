import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"


interface Props {}

const index: React.FC<Props> = ({}) => {
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <div className={styles.authorization__titlesLinksWrapper}>
          <p className={styles.authorization__titleLink_active}>Sign Up</p>
          <Link href="/auth/sign_in">
            <a className={styles.authorization__titleLink}>Log in</a>
          </Link>
        </div>

        <form action="#" className={styles.form_active} id="signUpForm">
          <Input
            type="text"
            placeholder="Name"
          />
          <Input
            type="email"
            placeholder="Email"
          />
          <Input
            type="password"
            placeholder="Password"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
          />
          <span className={styles.form__errorMessage}>
            Введенные пароли не совпадают
          </span>
          <Input type="submit" value={"Sign Up"}/>
        </form>
      </div>
    </div>
  )
}

export default index
