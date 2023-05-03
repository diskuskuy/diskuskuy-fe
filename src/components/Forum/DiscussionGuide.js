import React, { useState } from "react";
import defaultMoment from "moment/min/moment-with-locales";
import { formatDate, formatTime } from "@/utils/util";

export default function DiscussionGuide({ data, onSeeDiscussionGuide }) {
  console.log(data)
  const deadline =
    formatDate(data.deadline) + " | " + formatTime(data.deadline);

  return (
    <div className="section">
      <h5 className="font-bold text-gray">Panduan Diskusi</h5>
      <div className="h-1 w-5 bg-grey"></div>
      <p>
        <strong>Deadline:</strong> {deadline}
      </p>
      <strong>Deskripsi:</strong>
      <p>{data.description}</p>
      <strong>Mekanisme dan Ekspektasi:</strong>
      <p>{data.mechanism_expectation}</p>
      <a
        onClick={onSeeDiscussionGuide}
        className="text-blue cursor-pointer text-xs"
      >
        Lihat panduan diskusi
      </a>
    </div>
  );
}
