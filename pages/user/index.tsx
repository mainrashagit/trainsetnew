import styles from "./index.module.sass"
import Card from "@modules/Card/Card"
import Link from "next/link"

interface Props {}

const User: React.FC<Props> = ({}) => {
  return (
    <div className={styles.user}>
      <div className={styles.pannel}>
        {/* <div className={styles.pannel__buttons}>
          <p className={styles.pannel__button}>In-Progress</p>
          <p className={styles.pannel__button} data-active={true}>Started</p>
        </div> */}

        <div className={styles.info}>
          <div className={styles.info__column}>
            <p className={styles.info__name}>Иван Иванович Иванов</p>
            <p className={styles.info__pos}>Free Member</p>
          </div>
          <div className={styles.info__img}>
            <img src="/avatar/avatar.webp" alt="avatar of profile" />
          </div>
        </div>

        <div className={styles.started}>
          <Link href={"#"}>
            <a className={styles.link}>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default User
