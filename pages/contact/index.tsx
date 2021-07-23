import Input from "@modules/form/Input/Input"
import TextArea from "@modules/form/TextArea/TextArea"
import Title from "@modules/text/Title/Title"
import styles from "./index.module.sass"

interface Props {}

const index: React.FC<Props> = ({}) => {
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.authorization}>
        <div className={styles.authorization__titlesLinksWrapper}>
          <Title type="h1">Got Any Questions ?</Title>
        </div>

        <form
          action="#"
          className={styles.form_active}
          id="loginInForm"
        >
          <Input type="text" placeholder="Name" />

          <Input type="email" placeholder="Email" />

          <Input type="text" placeholder="Subject" />

          <TextArea
            placeholder="Message"
          />

          <Input type="submit" value="Send" />
        </form>
      </div>
    </div>
  )
}

export default index
