import Navbar from '@/components/Navbar'
import ProfileComponent from '@/components/Profile'
import styles from '@/styles/Home.module.css'

export default function Profile() {
    return (
        <>
        <Navbar/>
        <main className={styles.main}>
            <ProfileComponent/>
        </main>
        </>
    )
}