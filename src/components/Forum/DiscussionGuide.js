import React, { useState } from "react";
import defaultMoment from 'moment/min/moment-with-locales';
import { formatDate, formatTime } from "@/utils/util";

export default function DiscussionGuide({data, onSeeDiscussionGuide}) {

  const deadline = formatDate(data.deadline) + " | " + formatTime(data.deadline);

  return (
    <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
      <h5 className="font-bold text-[#6B6B6B]">Panduan Diskusi</h5>
      <div className="h-1 w-5 bg-[#C4C4C4]"></div>
      <p>
        <strong>Deadline:</strong> {deadline}
      </p>
      <strong>Deskripsi:</strong>
      <p>
        {data.description}
      </p>
      <strong>Mekanisme dan Ekspektasi:</strong>
      <p>
        {data.mechanism_expectation}
      </p>
      <a
        onClick={onSeeDiscussionGuide}
        className="text-[#667DF8] cursor-pointer text-xs"
      >
        Lihat panduan diskusi
      </a>
    </div>
  );
}
