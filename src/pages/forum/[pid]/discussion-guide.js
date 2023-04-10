import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from '@/styles/DiscussionGuide.module.css'
import { discussionGuideConstants } from '@/constants/DiscussionGuide';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import DiscussionGuideUpdateConfirmation from '@/components/Forum/DiscussionGuideUpdateConfirmation';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Breadcrumb';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function DiscussionGuide() {

    const router = useRouter()

    const name = "Rei";
    const groupName = "Kelompok Sister Asik"

    const [currentPhase, setCurrentPhase] = useState(0);
    const [showDiscussionGuideUpdateConfirmation, setShowDiscussionGuideUpdateConfirmation] = useState(false)

    useEffect(() => {
        setCurrentPhase(2)
    }, [])

    const handleChange = (event) => {
        setShowDiscussionGuideUpdateConfirmation(true)
    };

    const handleClose = value => {
        setShowDiscussionGuideUpdateConfirmation(false);
      };
    
    
      const handleYesAction = () => {
        // TODO
        // send api request
        // reload page dgn kondisi state yg barusan udh dicheck
      }

      function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
      }
      const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          MUI
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
        >
          Core
        </Link>,
        <Typography key="3" color="text.primary">
          Breadcrumb
        </Typography>,
      ];

  return (
    <>
      <main className={styles.main}>
        <Breadcrumb breadcrumbs={breadcrumbs}/>
        <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
            <a onClick={() => router.back()} className='text-xs text-[#646E9E] cursor-pointer'><ChevronLeftIcon /> Kembali ke Thread</a>
            <h1 className='font-bold text-3xl'>Panduan Diskusi</h1>
            <div className='flex flex-row gap-5'>
                <div className='flex flex-col basis-2/3 gap-5'>
                    <p>Halo <strong>{name}</strong></p>
                    <p>
                    Pada diskusi ini, kamu dan teman-temanmu di kelompok <strong>{groupName}</strong> akan melakukan <strong>4 tahap inquiry</strong> dalam menjawab pertanyaan pemicu diskusi.
                    </p>
                    <p>Empat tahap tersebut dideskripsikan pada poin berikut ini.</p>
                    {discussionGuideConstants.map((object, i) => 
                        <div key={i} className="block p-6 bg-white border rounded-lg flex flex-row gap-5 shadow" style={{borderBottom: i == currentPhase ? '5px solid #2ECC71' : null}}>
                            <h1 className='font-bold text-4xl'>{object.id}</h1>
                            <div className='flex flex-col'>
                                <p className='font-bold'>{object.title}</p>
                                <p>{object.description}</p>
                                {object.hints != null && <>
                                    <p className='font-bold'>Hints</p>
                                    <p>{object.hints}</p>
                                </>}
                            </div>
                            <Checkbox 
                                checked={i < currentPhase} 
                                disabled={i < currentPhase || i > currentPhase}
                                onChange={handleChange}
                                />
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
        { showDiscussionGuideUpdateConfirmation && 
            <DiscussionGuideUpdateConfirmation 
                open={open}
                onClose={handleClose}
                onYesAction={handleYesAction}
            />
        }
      </main>
    </>
  )
}
