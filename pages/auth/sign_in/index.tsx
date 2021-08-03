import styles from "../auth.module.sass"
import Link from "next/link"
import Input from "@modules/form/Input/Input"
import Checkbox from "@modules/form/Checkbox/Checkbox"
import useUser from "@/lib/useUser"
import { FormEvent, useState } from "react"
import fetchJson from "@/lib/fetchJson"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const { mutateUser } = useUser({
    redirectTo: "/user",
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = {
      username: event.currentTarget.username.value,
    };

    try {
      mutateUser(
        await fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <div className={styles.authorization__titlesLinksWrapper}>
          <Link href="/auth/sign_up">
            <a className={styles.authorization__titleLink}>Sign Up</a>
          </Link>
          <p className={styles.authorization__titleLink_active}>Log in</p>
        </div>

        <form action="#" className={styles.form_active} id="loginInForm" onSubmit={handleSubmit}>
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
