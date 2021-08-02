import styles from './index.module.sass'
import { useEffect } from 'react'
import { getAllPages, getPageByID } from '@/api/api'

interface Props {
    page: any
}

const index: React.FC<Props> = ({ /* page */ }) => {
    // useEffect(() => {
    //     console.log(page)
    //     return () => {

    //     }
    // }, [])
    return (
        <div className={styles.container} /* dangerouslySetInnerHTML={{__html: page.content}} */>
        </div>
    )
}

export default index

// export async function getStaticProps() {
//     const page = await getPageByID(7)
    
//     return { props: { page } }
// }