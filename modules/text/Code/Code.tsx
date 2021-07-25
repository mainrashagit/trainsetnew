import styles from './index.module.sass'
import { v4 as uuid } from "uuid"

interface Props {
    text: string[]
}

const Code: React.FC<Props> = ({ text }) => {
    return (
        <pre className={styles.pre}>
            {text.map(t => <code className={styles.code} key={uuid()}>{t}</code>)}

        </pre>
    )
}

export default Code