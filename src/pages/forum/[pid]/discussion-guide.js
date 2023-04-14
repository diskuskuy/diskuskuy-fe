import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from '@/styles/DiscussionGuide.module.css'
import { discussionGuideConstants } from '@/constants/DiscussionGuide';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  fetchDiscussionGuideDataByThreadId,
  updateDiscussionGuideStateById,
} from "@/api/discussion-guide";
import { formatDate, formatTime } from "@/utils/util";
import DiscussionGuideUpdateConfirmationPopUp from "@/components/Forum/DiscussionGuideUpdateConfirmationPopUp";
import Navbar from '@/components/Navbar';

export default function DiscussionGuide() {
  useEffect(() => {
    fetchDiscussionGuideDataByThreadId().then((data) => {
      setDiscussionGuideData(data);
    });
  }, []);

  const router = useRouter()
  const { pid } = router.query
    
  const name = "Rei";
  const groupName = "Kelompok Sister Asik";

  const [discussionGuideData, setDiscussionGuideData] = useState({});
  const [
    showDiscussionGuideUpdateConfirmationPopUp,
    setShowDiscussionGuideUpdateConfirmationPopUp,
  ] = useState(false);

  const deadline =
    formatDate(discussionGuideData.deadline) +
    " | " +
    formatTime(discussionGuideData.deadline);

  const handleChangeCheckbox = () => {
    setShowDiscussionGuideUpdateConfirmationPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowDiscussionGuideUpdateConfirmationPopUp(false);
  };

  const handleUpdateState = () => {
    updateDiscussionGuideStateById(
      discussionGuideData.id,
      parseInt(discussionGuideData.state) + 1
    ).then((data) => {
      if (data) window.location.reload();
    });
  };

  return (
    <>
    <Navbar />
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
      <div className="section">
        <a onClick={() => router.back()} className="text-xs text-purple cursor-pointer">
          <ChevronLeftIcon /> Kembali ke Thread
        </a>
        <h1 className="font-bold">Panduan Diskusi</h1>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col basis-2/3 gap-5">
            <p>
              Halo <strong>{name}</strong>
            </p>
            <p>
              Pada diskusi ini, kamu dan teman-temanmu di kelompok{" "}
              <strong>{groupName}</strong> akan melakukan{" "}
              <strong>4 tahap inquiry</strong> dalam menjawab pertanyaan pemicu
              diskusi.
            </p>
            <p>Empat tahap tersebut dideskripsikan pada poin berikut ini.</p>
            {discussionGuideConstants.map((object, i) => (
              <div
                key={i}
                className="block p-6 bg-white rounded-lg flex flex-row gap-5 shadow-lg"
                style={{
                  borderBottom:
                    discussionGuideData.state == i + 1
                      ? "5px solid #2ECC71"
                      : null,
                }}
              >
                <h1 className="font-bold">{object.id}</h1>
                <div className="flex flex-col">
                  <p className="font-bold">{object.title}</p>
                  <p>{object.description}</p>
                  {object.hints != null && (
                    <>
                      <p className="font-bold">Hints</p>
                      <p>{object.hints}</p>
                    </>
                  )}
                </div>
                <Checkbox
                  checked={i + 1 < discussionGuideData.state}
                  disabled={
                    i + 1 < discussionGuideData.state ||
                    i + 1 > discussionGuideData.state
                  }
                  onChange={handleChangeCheckbox}
                />
              </div>
            ))}
          </div>
          <div className="basis-1/3">
            <div className="border-dashed border-2 border-grey rounded-lg flex flex-col p-5">
              <p>
                <strong>Deadline:</strong> {deadline}
              </p>
              <strong>Deskripsi:</strong>
              <p>{discussionGuideData.description}</p>
              <strong>Mekanisme dan Ekspektasi:</strong>
              <p>{discussionGuideData.mechanism_expectation}</p>
            </div>
          </div>
        </div>
      </div>
      <DiscussionGuideUpdateConfirmationPopUp
        open={showDiscussionGuideUpdateConfirmationPopUp}
        onClose={handleClosePopUp}
        onYesAction={handleUpdateState}
      />
    </main>
    </>
  );
}
