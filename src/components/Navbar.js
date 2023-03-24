import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Navbar() {
    return (
      <div className='flex flex-row items-center justify-end gap-2 bg-[#2ECC71] w-full p-2 text-white'>
        <ExpandMoreIcon />
        <div className='rounded-full'>
          <img src='/teacher-img.png' width={'30px'}/>
        </div>
      </div>
    )
  }
  