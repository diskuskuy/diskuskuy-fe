import React, { useState } from "react";

export default function References() {
  const references = [
    {
      id: 1,
      title: "[Salindia] Materi Kuliah ke-1: Pengantar Sistem Interaksi",
      type: "pdf",
    },
    {
      id: 2,
      title: "[Buku] Interaction Design: Beyond Human Computer Interaction",
      type: "pdf",
    },
    {
      id: 3,
      title: "[Buku] Don’t Make Me Think",
      type: "pdf",
    },
    {
      id: 4,
      title: "[Tautan] Interaction-Design.org",
      type: "url",
    },
  ];

  return (
    <div className="section">
      <h5 className="font-bold text-gray">Referensi Diskusi</h5>
      <div className="h-1 w-5 bg-grey"></div>
      {references.map((object, i) => (
        <div key={i} className="flex flex-row items-center gap-2 text-sm">
          {object.type == "pdf" && <img src="/pdf-icon.png" width={"30px"} />}
          {object.type == "url" && <img src="/url-icon.png" width={"30px"} />}
          <div className="flex flex-col">
            <p>{object.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
