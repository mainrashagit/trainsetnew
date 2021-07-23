import styles from "./index.module.sass"
import SectionTitle from "@modules/text/SectionTitle/SectionTitle"

interface Props {
    title: string
}

const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </div>
  )
}

export default Section
