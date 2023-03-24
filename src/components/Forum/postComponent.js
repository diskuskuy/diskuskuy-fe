import styles from "@/styles/Forum.module.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PostComponent() {
  const tags = ['Perkenalan', 'Cerita Pengalaman']
  return (
    <>
      <div className="container bg-white p-3 rounded flex flex-row space-between gap-5">
        <div className="flex flex-row justify-start">
          <div className="flex flex-col basis-1/6 gap-2 items-center">
            <div className="rounded-full">
              <img src="/teacher-img.png" />
            </div>
            <div className="bg-[#667DF8] px-2">Dosen</div>
          </div>
        </div>
        <div className="flex flex-col basis-5/6 gap-5">
          <h3 className="font-bold text-2xl">Mari kita berkenalan dan bercerita....😉</h3>
          <p className="text-xs">
            Thread dimulai oleh <strong>Fulan bin Fulan</strong> pada 7 November 2020 (17:00 WIB)
          </p>
          <div>
            <p>Tags: {tags.map((tag, i) => 
                  <span className="text-[#2ECC71]">{tag}{i != tags.length-1 && <span> | </span>}</span>
                )
              }
            </p>
          </div>
          <div className="h-1 w-5 bg-[#C4C4C4]"></div>
          <p>
            Halo teman-teman... Apa kabar semua? Semoga kita senantiasa sehat
            selalu ya \^-^/ Pertama-tama, saya ucapkan selamat datang di kelas
            Sistem Informasi Semester Gasal 2020/2021... yeayy! 
            <img src='/team.png'></img>
            Perkenalkan saya Fulan bin Fulan, dosen yang akan mendampingi teman-teman belajar
            selama 1 semester ke depan. Saya merupakan lulusan Fasilkom 2020 dan
            memiliki minat riset di bidang Human Computer Interaction (HCI) dan
            e-Learning. Saya pribadi merasa bidang HCI adalah bidang yang sangat
            menarik, karena di sini kita tidak hanya membahas aspek2 teknis
            saja, namun juga aspek-aspek bagaimana manusia memiliki persepsi
            terhadap teknologi yang digunakannnya... Kita akan menemukan jawaban
            bagaimana raksasa teknologi seperti Go Jek, Uber, dan Grab merancang
            aplikasi yang dapat digunakan beragam pengguna, tua dan muda, untuk
            berbagai keperluan.... Saya sangat berharap pengalaman belajar kita
            di kelas ini akan membawa kebermanfaatan buat kita semua. Bagaimana
            dengan teman-teman semua? Apa ekspektasi teman-teman terhadap kelas
            ini? Silahkan memperkenalkan diri dengan membalas utas ini yaa 😁
          </p>
          <div className="h-[0.5px] bg-[#C4C4C4]"></div>
          <div className='flex flex-row gap-2 items-center'>
            <a className="cursor-pointer">Balas <ExpandMoreIcon /></a>
            <div className="rounded-full shadow p-2 cursor-pointer"><img src='like.png'></img></div>
          </div>
        </div>
      </div>
    </>
  );
}
