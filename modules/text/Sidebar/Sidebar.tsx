import styles from "./index.module.sass"
import SidebarItem from "./SidebarItem"

interface ISidebarItem {
  text: string
  active?: boolean
  link: string
}

interface Props {
  items: ISidebarItem[]
}

const Sidebar: React.FC<Props> = ({ items }) => {
  return (
    <>
      <aside className={styles.sideBar}>
        <div className={styles.sideBar__sliderContainer}>
          <div className={styles.sideBar__wrapperContent}>
            {items.map(({ text, active, link }, i) => (
              <SidebarItem text={text} active={active} link={link} key={`${link}-${i}`} />
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
