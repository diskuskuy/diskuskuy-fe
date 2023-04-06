import { useRouter } from 'next/router'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import styles from '@/styles/DiscussionGuide.module.css';

export default function DiscussionGuide() {
    const discussionGuide = [
        {
            "id": 1,
            "title": "Memahami Pemicu",
            "description": "Pada tahap ini, kamu dan teman-temanmu perlu memahami pemicu secara tepat. Baca pemicu berulang kali, kaitkan dengan materi yang sudah dipelajari, dan buatlah reply untuk mengungkapkan persepsimu mengenai pemicu pada thread.",
            "hints": "Jangan ragu untuk mengungkapkan kebingungan dan bertanya karena mengenali bahwa diri kita belum paham adalah bagian dari pembelajaran. Jangan terburu-buru untuk mengusulkan suatu solusi ya :), selalu awali dengan mengkonfirmasi pemahamanmu tentang pemicu.",
            "active": true,
        },
        {
            "id": 2,
            "title": "Eksplorasi Materi dan Referensi",
            "description": "Pada tahap ini, kamu dan teman-temanmu perlu melakukan brainstorming dengan mengutarakan berbagai pendapat yang didukung oleh berbagai referensi yang relevan. Buatlah reply pada thread untuk mengungkapkan pendapatmu mengenai jawaban pemicu.",
            "hints": "Kamu dapat menyatakan setuju/tidak setuju terhadap pendapat temanmu. Jangan ragu untuk berpendapat dan jangan takut salah berpendapat. Jangan lupa juga untuk selalu membuat suasana diskusi nyaman ya 😃",
            "active": false,
        },
        {
            "id": 3,
            "title": "Eksplorasi Materi dan Referensi",
            "description": "Pada tahap ini, kamu dan teman-temanmu perlu memilah gagasan-gagasan yang relevan. Kamu dapat menilai pendapat mana saja yang relevan untuk menjawab pemicu dan mengelaborasinya menjadi sebuah kesatuan gagasan/kesimpulan yang bermakna.",
            "hints": "Refleksikan gagasan-gagasan yang muncul di forum dengan pemahamanmu dan kaitkan dengan materi/referensi yang relevan.",
            "active": false,
        },
        {
            "id": 4,
            "title": "Resolusi Diskusi",
            "description": "Pada tahap ini, kamu dan teman-temanmu ditantang untuk berpikir kritis pada tingkat yang lebih tinggi, yakni menunjukkan bahwa solusi/jawaban terhadap pemicu dapat diterapkan pada konteks berbeda. Buatlah reply pada thread yang menjelaskan bagaimana solusi/jawaban kelompokmu dapat diterapkan pada konteks berbeda (misal: produk/sistem/konteks pengembangan, dll.)",
            "hints": null,
            "active": false,
        }
    ]

    const name = "Rei";
    const groupName = "Kelompok Sister Asik"

    const router = useRouter()
    const { pid } = router.query

  return (
    <>
      <main className={styles.main}>
        <div className='flex flex-row items-center text-xs pb-10'>
            <a className='cursor-pointer' href='/'>Sistem Interaksi - Gasal 2020/2021</a>
            <ChevronRightIcon />
            <a className='cursor-pointer' href='/'>Forum Diskusi Minggu ke-1</a>
            <ChevronRightIcon />
            <a className='cursor-pointer' href={`/forum/${pid}`}>Thread: Mari kita berkenalan dan bercerita..... 😉</a>
            <ChevronRightIcon />
            <a className='font-bold'>Panduan Diskusi</a>
        </div>
        <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
            <a className='text-xs text-[#646E9E] cursor-pointer'><ChevronLeftIcon /> Kembali ke Thread</a>
            <h1 className='font-bold text-3xl'>Panduan Diskusi</h1>
            <div className='flex flex-row gap-5'>
                <div className='flex flex-col basis-2/3 gap-5'>
                    <p>Halo <strong>{name}</strong></p>
                    <p>
                    Pada diskusi ini, kamu dan teman-temanmu di kelompok <strong>{groupName}</strong> akan melakukan <strong>4 tahap inquiry</strong> dalam menjawab pertanyaan pemicu diskusi.
                    </p>
                    <p>Empat tahap tersebut dideskripsikan pada poin berikut ini.</p>
                    {discussionGuide.map((object, i) => 
                        <div key={i} className="block p-6 bg-white border rounded-lg flex flex-row gap-5 shadow" style={{borderBottom: object.active ? '5px solid #2ECC71' : null}}>
                            <h1 className='font-bold text-4xl'>{object.id}</h1>
                            <div className='flex flex-col'>
                                <p className='font-bold'>{object.title}</p>
                                <p>{object.description}</p>
                                {object.hints != null && <>
                                    <p className='font-bold'>Hints</p>
                                    <p>{object.hints}</p>
                                </>}
                            </div>
                            <CropSquareIcon />
                        </div>
                    )}
                </div>
                <div className='basis-1/3'>
                    <div className='border-dashed border-2 border-[#C4C4C4] rounded-lg flex flex-col p-5'>
                        <p><strong>Deadline:</strong> 21 November 2020 | 23:55</p>
                        <strong>Deskripsi:</strong>
                        <p>Pada aktivitas forum diskusi kali ini, kita akan mendiskusikan good design vs bad design.</p>
                        <strong>Mekanisme dan Ekspektasi:</strong>
                        <p>Kelompok diharapkan berhasil menjawab pertanyaan yang muncul melalui proses inquiry dan menyusun serta melaporkan hasil diskusi kelompok sebelum deadline di forum.</p>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </>
  )
}
