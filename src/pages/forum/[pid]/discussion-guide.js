import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "@/styles/DiscussionGuide.module.css";
import {
  fetchDiscussionGuideDataByThreadId,
  updateDiscussionGuideStateById,
} from "@/api/discussion-guide";
import { useEffect, useState } from "react";
import { formatDate, formatTime } from "@/utils/util";
import { Checkbox } from "@mui/material";
import { discussionGuideConstants } from "@/constants/DiscussionGuide";
import DiscussionGuideUpdateConfirmationPopUp from "@/components/Forum/DiscussionGuideUpdateConfirmationPopUp";

export default function DiscussionGuide() {
  useEffect(() => {
    fetchDiscussionGuideDataByThreadId().then((data) => {
      setDiscussionGuideData(data);
    });
  }, []);

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
    <main className={styles.main}>
      <div className="flex flex-row items-center text-xs pb-10">
        <a className="cursor-pointer">Sistem Interaksi - Gasal 2020/2021</a>
        <ChevronRightIcon />
        <a className="cursor-pointer">Forum Diskusi Minggu ke-1</a>
        <ChevronRightIcon />
        <a className="cursor-pointer">
          Thread: Mari kita berkenalan dan bercerita..... 😉
        </a>
        <ChevronRightIcon />
        <a className="cursor-pointer">Panduan Diskusi</a>
      </div>
      <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
        <a className="text-xs text-[#646E9E] cursor-pointer">
          <ChevronLeftIcon /> Kembali ke Thread
        </a>
        <h1 className="font-bold text-3xl">Panduan Diskusi</h1>
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
                className="block p-6 bg-white border rounded-lg flex flex-row gap-5 shadow"
                style={{
                  borderBottom:
                    discussionGuideData.state == i + 1
                      ? "5px solid #2ECC71"
                      : null,
                }}
              >
                <h1 className="font-bold text-4xl">{object.id}</h1>
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
            <div className="border-dashed border-2 border-[#C4C4C4] rounded-lg flex flex-col p-5">
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
  );
}
