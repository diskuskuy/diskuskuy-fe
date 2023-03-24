import React, { useState } from 'react'

export default function DiscussionGuide() {
    const [summaryContent, setSummaryContent] = useState("");

    const handleChange = event => {
        setSummaryContent(event.target.value);
      }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(summaryContent)
      }

    return (
        <div className="block p-6 bg-white border rounded-lg flex flex-col gap-2">
            <h5 className="font-bold text-[#6B6B6B]">Panduan Diskusi</h5>
            <div className="h-1 w-5 bg-[#C4C4C4]"></div>
            <p><strong>Deadline:</strong> 21 November 2020 | 23:55</p>
            <strong>Deskripsi:</strong>
            <p>Pada aktivitas forum diskusi kali ini, kita akan mendiskusikan good design vs bad design.</p>
            <strong>Mekanisme dan Ekspektasi:</strong>
            <p>Kelompok diharapkan berhasil menjawab pertanyaan yang muncul melalui proses inquiry dan menyusun serta melaporkan hasil diskusi kelompok sebelum deadline di forum.</p>
            <a href='/discussion-guide' className='text-[#667DF8] cursor-ponter text-xs'>Lihat panduan diskusi</a>
        </div>
    )
  }
  