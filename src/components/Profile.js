export default function ProfileComponent() {
    return (
        <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2" style={{
            width: '300px',
            height: '150px'
        }}>
            <div className='flex flex-row items-center gap-2'>
                <a onClick={() => {}} className='cursor-pointer' style={{
                    position: 'relative',
                    width: '50px',
                }}>
                    <div className='rounded-full'>
                        <img src='/teacher-img.png' />
                    </div>
                    <img src='/edit-profile-pic.png' style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '20px'
                    }}/>
                </a>
                <div className='flex flex-col'>
                    <p className='font-bold text-lg'>Rei Hoshiko</p>
                    <p className='text-xs'>1906437951</p>
                    <a onClick={() => {}} className='text-xs text-[#667DF8] cursor-pointer'>Ubah foto profil</a>
                </div>
            </div>
            <div className="h-[0.5px] bg-[#C4C4C4]"></div>
            <a onClick={() => {}} className='text-xs cursor-pointer'>Logout</a>
        </div>
    )
  }
  