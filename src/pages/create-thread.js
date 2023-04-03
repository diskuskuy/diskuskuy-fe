import Head from "next/head";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import React, { useRef, useState, ChangeEvent } from "react";
import styles from "@/styles/CreateForum.module.css";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment/moment";
import TextEditor from "@/components/Forum/TextEditor";

export default function CreateThread() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [mechAndExp, setMechAndExp] = useState("");
  const [referenceFileList, setReferenceFileList] = useState([]);
  const minDate = moment(new Date()).format("YYYY-MM-DDTMM:SS");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDeadline = (event) => {
    setDeadline(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeMechAndExp = (event) => {
    setMechAndExp(event.target.value);
  };

  const handleReferenceFileChange = (e) => {
    setReferenceFileList(e.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title);
    console.log(deadline);
    console.log(description);
    console.log(mechAndExp);
    console.log(referenceFileList);
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const files = referenceFileList ? [...referenceFileList] : [];

  return (
    <>
      <main className={styles.main}>
        <div className="flex flex-row items-center text-xs pb-10">
          <a className="cursor-pointer">Sistem Interaksi - Gasal 2020/2021</a>
          <ChevronRightIcon />
          <a className="cursor-pointer">Forum Diskusi Minggu ke-1</a>
        </div>
        <div className="container bg-white p-6 rounded-lg text-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
              <div className=" basis-1/2 flex flex-col gap-2">
                <h3 className="font-bold text-">Judul Thread</h3>
                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                <input
                  value={title}
                  onChange={handleChangeTitle}
                  required
                  type="text"
                  className="appearance-none block border w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                />
                <h3 className="font-bold">Panduan Diskusi</h3>
                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                <label>Deadline</label>
                <input
                  value={deadline}
                  onChange={handleChangeDeadline}
                  required
                  type="datetime-local"
                  min={minDate}
                  className="appearance-none block border w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="deadline"
                />
                <label>Deskripsi</label>
                <textarea
                  value={description}
                  onChange={handleChangeDescription}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
                />
                <label>Mekanisme dan Ekspektasi</label>
                <textarea
                  value={mechAndExp}
                  onChange={handleChangeMechAndExp}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
                />
                <h3 className="font-bold">Referensi Diskusi</h3>
                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    onChange={handleReferenceFileChange}
                    multiple
                    required
                  />
                  {files.map((file, i) => (
                    <div className="flex flex-row items-center gap-2" key={i}>
                      {file.type == "application/pdf" && (
                        <img src="/pdf-icon.png" width={"30px"} />
                      )}
                      {file.type == "image/png" && (
                        <img src="/png-icon.png" width={"30px"} />
                      )}
                      {file.type != "application/pdf" &&
                        file.type != "image/png" && (
                          <img src="/url-icon.png" width={"30px"} />
                        )}
                      <div className="flex flex-col">
                        <p>{file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="basis-1/2 flex flex-col gap-2">
                <h3 className="font-bold">Initial Post</h3>
                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                <TextEditor editorRef={editorRef} />
              </div>
            </div>
            {/* <div className='flex flex-row justify-end'> */}
            <input
              type="submit"
              value="Simpan"
              className="bg-[#2ECC71] text-white p-2 rounded cursor-pointer"
            />
            {/* </div> */}
          </form>
        </div>
      </main>
    </>
  );
}
