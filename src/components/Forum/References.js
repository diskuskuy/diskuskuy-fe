import React, { useState } from "react";
import firebase from "@/utils/firebase";
import axios from "axios";

export default function References({pid, references, refresh}) {
  return (
    <div className="section">
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-gray">Referensi Diskusi</h5>
        <button
          onClick={() => {
            var input = document.createElement("input");
            input.setAttribute("type", "file");

            input.onchange = function () {
              var file = this.files[0];
              const upload = firebase
              .storage()
              .ref("/")
              .child(file.name)
              .put(file)

              upload.then((res) => {
                upload.snapshot.ref.getDownloadURL().then((url) => {
                  axios.post("http://localhost:8000/forum/ReferenceFile/", {
                    title: res?._delegate.metadata.name,
                    url: url,
                    thread: pid
                  }).then(() => {
                    window.alert("sip")
                    refresh()
                  })
                })
                })
            };

            input.click();
          }}
        >
          add
        </button>
      </div>
      <div className="h-1 w-5 bg-grey"></div>
      {references.map((object, i) => (
        <div key={i} className="flex flex-row items-center gap-2 text-sm cursor-pointer" onClick={() => window.open(object.url, "_blank")}>
          {object.url.includes(".pdf") && <img src="/pdf-icon.png" width={"30px"} />}
          {!object.url.includes(".pdf") && <img src="/url-icon.png" width={"30px"} />}
          <div className="flex flex-col">
            <p>{object.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
