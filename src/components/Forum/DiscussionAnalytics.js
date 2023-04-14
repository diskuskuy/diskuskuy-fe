import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styles from "@/styles/Forum.module.css";

export default function DiscussionAnalytics() {
  const [showExpansion, setShowExpansion] = useState(false);

  const toggleShowExpansion = () => {
    setShowExpansion((prevShowExpansion) => !prevShowExpansion);
  };

  const data = {
    replies: 7,
    participants: 5,
    not_particapated: 3,
    tags: {
      pendapat: 1,
      pertanyaan: 2,
      bingung: 3,
    },
  };
  return (
    <div className="section">
      <h5 className="font-bold text-gray">Statistik Diskusi</h5>
      <div className="h-1 w-5 bg-grey"></div>
      <div className="flex flex-row">
        <div className="flex flex-col basis-1/3 items-center">
          <h1 className="font-bold">{data["replies"]}</h1>
          <p className="text-xs">jawaban</p>
        </div>
        <div className="flex flex-col basis-1/3 items-center">
          <h1 className="font-bold">{data["participants"]}</h1>
          <p className="text-xs">jumlah</p>
          <p className="text-xs">peserta diskusi</p>
        </div>
        <div className="flex flex-col basis-1/3 items-center">
          <h1 className="font-bold">{data["not_particapated"]}</h1>
          <p className="text-xs">belum menjawab</p>
          <p className="text-xs">sama sekali</p>
        </div>
      </div>
      <a
        onClick={toggleShowExpansion}
        className="cursor-pointer text-xs text-gray font-bold"
      >
        {!showExpansion && (
          <>
            <span>Lihat selengkapnya</span>
            <ExpandMoreIcon />
          </>
        )}
        {showExpansion && (
          <>
            <span>Sembunyikan</span>
            <ExpandLessIcon />
          </>
        )}
      </a>
      {showExpansion && (
        <>
          <h5 className="font-bold text-gray">Jumlah Tag Posting</h5>
          <div className="h-1 w-5 bg-grey"></div>
          <div className="flex flex-col text-xs">
            <div className="flex flex-row justify-between text-green">
              <p>Pendapat</p>
              <p>{data["tags"]["pendapat"]}</p>
            </div>
            <div className="flex flex-row justify-between text-green">
              <p>Pertanyaan</p>
              <p>{data["tags"]["pertanyaan"]}</p>
            </div>
            <div className="flex flex-row justify-between text-green">
              <p>Bingung</p>
              <p>{data["tags"]["bingung"]}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
