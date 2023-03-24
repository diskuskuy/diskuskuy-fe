export default function DosenInfo({photoUrl, name, teachingClass}) {
  return (
    <div className='flex flex-row items-center gap-2'>
      <div className='rounded-full'>
          <img src={photoUrl} />
      </div>
      <div className='flex flex-col'>
          <p className='font-bold'>{name}</p>
          <p>Dosen kelas {teachingClass}</p>
      </div>
    </div>
  )
}
