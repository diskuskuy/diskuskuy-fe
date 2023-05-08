import React, { useState } from "react";
import { createSummary, updateSummaryById } from "@/api/forum";
import { useRouter } from "next/router";

export default function DiscussionSummary({ content, id }) {
  const router = useRouter();
  const { pid } = router.query;
  const [summaryContent, setSummaryContent] = useState(content ? content : "");

  const handleChange = (event) => {
    setSummaryContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { id: id, content: summaryContent, thread: pid };
    if (id == null || id == ''){
      createSummary(requestBody).then(() => window.alert("Berhasil Menyimpan Ringkasan Diskusi"))
    }
    else {
      updateSummaryById(id, requestBody).then(() => window.alert('Berhasil Menambahkan Ringkasan Diskusi'));
    }
  };

  return (
    <div className="section">
      <h5 className="font-bold text-gray">Ringkasan Diskusi</h5>
      <div className="h-1 w-5 bg-grey"></div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={summaryContent}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
        />
        <div className="flex flex-row justify-end">
          <input
            type="submit"
            value="Submit"
            className="bg-green text-white text-xs p-2 w-1/3 right rounded cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
