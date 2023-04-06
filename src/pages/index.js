import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import DosenInfo from '@/components/Home/DosenInfo'

const dosenInfoDummy = [
  {
    'name': 'Fulan bin Fulan',
    'teachingClass': 'X',
    'photoUrl': '/teacher-img.png'
  },
  {
    'name': 'Nobunaga Tonarigumi',
    'teachingClass': 'Y',
    'photoUrl': '/teacher-img.png'
  },
  {
    'name': 'Mahmud bin Isnin',
    'teachingClass': 'Z',
    'photoUrl': '/teacher-img.png'
  },
];

const courseName = 'Sistem Interaksi';

const term = 'Gasal 2020/2021';

const courseDescription = 'Pada mata kuliah ini, teman-teman akan belajar mengenai prinsip-prinsip desain interaksi dan penerapannya pada pengembangan produk digital.'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className="flex flex-col gap-5">
        <div
          className="block p-6 h-44 bg-cover bg-[url('/header.png')] bg-[#646E9E] border rounded-lg text-white"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {courseName}
          </h5>
          <p className="font-normal">
            ({term})
          </p>
        </div>
        <div
          className="block p-6 bg-white border rounded-lg"
        >
          <div className='flex flex-row gap-2'>
            <div className='basis-1/2 flex flex-col gap-5'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Selamat Datang
              </h5>
              <p>
                di mata kuliah {courseName} Semester {term}
              </p>
              <p>
                {courseDescription}
              </p>
              <div className='flex flex-row items-center gap-2'>
                <img src='/pdf-icon.png' width={'30px'}/>
                <div className='flex flex-col'>
                  <p className='font-bold'>Buku Rancangan Pengajaran Sistem Interaksi</p>
                  <p>(Revisi 1 September 2020)</p>
                </div>
              </div>
            </div>
            <div className='basis-1/2'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Tim Pengajar
              </h5>
              <div className='flex flex-row flex-wrap gap-2'>
                {dosenInfoDummy.map((object, i) => 
                  <DosenInfo
                    key={i}
                    photoUrl={object.photoUrl}
                    name={object.name}
                    teachingClass={object.teachingClass}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* TODO: tambahin id pake week keberapa*/}
        <div
          className="block p-6 my-3 bg-white border border-gray-200 rounded-lg" id='1'
        >
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Week 1
          </h6>
          <div>
            <p className="font-normal text-gray-700 ">
              Forum Diskusi Minggu ke-1
            </p>
            <div className="h-1 w-5 bg-[#C4C4C4]"></div>
            <div className='grid grid-cols-2 mt-2'>
              <div className={styles.card} style={{"border":"solid 0.5px grey"}}>
                <div className='grid grid-cols-6'>
                  <div className='col-start-1 col-end-6 group flex items-center'>
                    <img className="shrink-0 h-12 w-12 rounded-full" src="/teacher-img.png" alt="" />
                    <div className='rtl:mr-3 ml-3'>
                      <p className="font-normal text-green-700">
                        Thread
                      </p>
                      <h6 className='tracking-tight text-gray-900'>
                        Mari kita berkenalan dan bercerita... ;)
                      </h6>
                      <p className='' style={{"font-size":"10px", "width":"100%", "margin":"0", "padding":"0"}}>
                        Fulan bin Fulan | 7 Maret 2023 (17.00 WIB)
                      </p>
                    </div>
                  </div>
                  <div className='col-end-7 col-span-1 p-2'>
                    <Link href='/forum'><button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                      Lihat
                    </button></Link>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
