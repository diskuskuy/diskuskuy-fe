export default function DosenInfo({photoUrl, name, nim}) {
  return (
    <div className='flex flex-row items-center gap-2'>
      <div className='rounded-full h-12 w-12'>
          <img src={photoUrl} className="h-12 w-12 rounded-full object-cover" />
      </div>
      <div className='flex flex-col'>
          <p className='font-bold'> {name}</p>
          <p>{nim}</p>
      </div>
    </div>
  )
}
