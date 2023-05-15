import React from "react";
import firebase from "@/utils/firebase";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";

export default function References({pid, references, refresh}) {
  return (
    <div className="section">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray">Referensi Diskusi</h3>
        {JSON.parse(getCookie("auth"))?.role == "lecturer" && 
          <button
            className="normal-case text-black font-bold bg-white rounded-lg border border-grey py-2 px-4 text-sm hover:border-green hover:bg-green4"            onClick={() => {
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
                    axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/forum/ReferenceFile/`, {
                      title: res?._delegate.metadata.name,
                      url: url,
                      thread: pid
                    }, {headers: {
                      "Authorization": `Token ${JSON.parse(getCookie("auth"))?.token}`,
                    }},
                    ).then(() => {
                      toast.success("Berhasil menambahkan referensi diskusi")
                      refresh()
                    })
                  })
                  })
              };

              input.click();
            }}
          >
            <AddIcon /> tambah
          </button>
        }
      </div>
      <div className="h-1 w-5 bg-grey"></div>
      {references.map((object, i) => (
        <div key={i} className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => window.open(object.url, "_blank")}>
          {object.url.includes(".pdf") && <img src="/images/pdf-icon.png" width={"30px"} />}
          {object.url.includes(".png") && <img src="/images/png-icon.png" width={"30px"} />}
          {!object.url.includes(".pdf") && !object.url.includes(".png") && <img src="/images/url-icon.png" width={"30px"} />}
          <div className="flex flex-col">
            <p>{object.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
