import { useRouter } from 'next/router'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from '@/styles/Forum.module.css'
import DiscussionAnalytics from '@/components/Forum/DiscussionAnalytics'
import DiscussionSummary from '@/components/Forum/DiscussionSummary'
import DiscussionGuide from '@/components/Forum/DiscussionGuide';
import PostComponent from '@/components/Forum/postComponent';
import References from '@/components/Forum/References';
import Onboarding from '@/components/Forum/Onboarding';
import dataObd1 from '@/constants/obd-1';
import dataObd2 from '@/constants/obd-2';
import dataObd3 from '@/constants/obd-3';
import dataObd4 from '@/constants/obd-4';

export default function Forum() {

  const initialPost = {
    "title": "Mari kita berkenalan dan bercerita....😉",
    "user": "Fulan bin Fulan",
    "content": "Halo teman-teman... Apa kabar semua? Semoga kita senantiasa sehat selalu ya \^-^/ Pertama-tama, saya ucapkan selamat datang di kelas Sistem Informasi Semester Gasal 2020/2021... yeayy! <img src='/team.png'></img> Perkenalkan saya Fulan bin Fulan, dosen yang akan mendampingi teman-teman belajar selama 1 semester ke depan. Saya merupakan lulusan Fasilkom 2020 dan memiliki minat riset di bidang Human Computer Interaction (HCI) dan e-Learning. Saya pribadi merasa bidang HCI adalah bidang yang sangat menarik, karena di sini kita tidak hanya membahas aspek2 teknis saja, namun juga aspek-aspek bagaimana manusia memiliki persepsi terhadap teknologi yang digunakannnya... Kita akan menemukan jawaban bagaimana raksasa teknologi seperti Go Jek, Uber, dan Grab merancang aplikasi yang dapat digunakan beragam pengguna, tua dan muda, untuk berbagai keperluan.... Saya sangat berharap pengalaman belajar kita di kelas ini akan membawa kebermanfaatan buat kita semua. Bagaimana dengan teman-teman semua? Apa ekspektasi teman-teman terhadap kelas ini? Silahkan memperkenalkan diri dengan membalas utas ini yaa 😁"
  }

  const replyPost = [
    {
      "user": "Rei",
      "content": "Selamat pagi Pak @Fulan bin Fulan dan Teman-teman @everyone Kabar saya baik Pak. Terima kasih banyak atas pertanyaannya Pak... Menarik sekali Pak topiknya... Pertama-tama, saya ingin mengonfirmasi pemahaman saya mengenai pemicu, bahwa yang dimaksud “good design” disini adalah yang berkaitan dengan persepsi pengguna mengenai kemudahan penggunaan (usability). Dengan demikian, kita perlu merumuskan kriteria “good design.” Bagaimana menurut teman-teman? @everyone"
    }
  ]

  const router = useRouter()
  const { pid } = router.query

  const fase = 2
  const inquiry = fase ==1 ? dataObd1 : fase==2? dataObd2 :fase == 3 ? dataObd3 : dataObd4; 
  
  return (
    <>
      <main className={styles.main}>
        <div className='flex flex-row items-center text-xs pb-10'>
          <a className='cursor-pointer'>Sistem Interaksi - Gasal 2020/2021</a>
          <ChevronRightIcon />
          <a className='cursor-pointer'>Forum Diskusi Minggu ke-1</a>
          <ChevronRightIcon />
          <a className='cursor-pointer'>Thread: Mari kita berkenalan dan bercerita..... 😉</a>
        </div>
        <div className='flex flex-row gap-5'>
          <div className='flex flex-col basis-2/3 gap-5'>
            <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
            <PostComponent post={initialPost}/>
            </div>
            <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2 ml-10">
              {replyPost.map((object, i) => 
                <PostComponent post={object} key={i}/>
              )}
            </div>
          </div>
          <div className="flex flex-col basis-1/3 gap-5">
            <DiscussionGuide />
            <References />
            <DiscussionAnalytics />
            <DiscussionSummary />
          </div>
        </div>
        <Onboarding
        data = {inquiry}
        ></Onboarding>
      </main>
    </>
  )
}
