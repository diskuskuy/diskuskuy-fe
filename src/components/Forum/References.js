import React, { useState } from 'react'

export default function References() {

  const references = [
    {
      "id": 1,
      "title": "[Salindia] Materi Kuliah ke-1: Pengantar Sistem Interaksi",
      "type": "pdf",
    },
    {
      "id": 2,
      "title": "[Buku] Interaction Design: Beyond Human Computer Interaction",
      "type": "pdf",
    },
    {
      "id": 3,
      "title": "[Buku] Don’t Make Me Think",
      "type": "pdf",
    },
    {
      "id": 4,
      "title": "[Tautan] Interaction-Design.org",
      "type": "url",
    },
  ]

    return (
      <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
          <h5 className="font-bold text-[#6B6B6B]">Referensi Diskusi</h5>
          <div className="h-1 w-5 bg-[#C4C4C4]"></div>
          {references.map((object, i) => 
            <div className='flex flex-row items-center gap-2 text-sm'>
            {object.type == 'pdf' && <img src='/pdf-icon.png' width={'30px'}/>}
            {object.type == 'url' && <img src='/url-icon.png' width={'30px'}/>}
            <div className='flex flex-col'>
              <p>{object.title}</p>
            </div>
          </div>
          )}
      </div>
    )
  }
  