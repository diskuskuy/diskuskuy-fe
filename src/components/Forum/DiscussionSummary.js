import React, { useState } from 'react'

export default function DiscussionSummary() {
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
            <h5 className="font-bold text-[#6B6B6B]">Ringkasan Diskusi</h5>
            <div className="h-1 w-5 bg-[#C4C4C4]"></div>
            <form onSubmit={handleSubmit}>
                <textarea value={summaryContent} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"/>
                <div className='flex flex-row justify-end'>
                <input type="submit" value="Submit" className="bg-[#2ECC71] text-white text-xs p-2 w-1/3 right rounded cursor-pointer"/>
                </div>
            </form>
        </div>
    )
  }
  