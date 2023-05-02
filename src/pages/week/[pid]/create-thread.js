import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useRef, useState } from "react";
import styles from "@/styles/CreateForum.module.css";
import moment from "moment/moment";
import TextEditor from "@/components/Forum/TextEditor";
import { createThread } from "@/api/create-thread-api";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import ErrorIcon from "@mui/icons-material/Error";
import Navbar from "@/components/Navbar";
import firebase from "@/utils/firebase";
import axios from "axios";

export default function CreateThread() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [mechAndExp, setMechAndExp] = useState("");
  const [referenceFileList, setReferenceFileList] = useState([]);
  const [tags, setTags] = useState([]);
  const [isInitialPostEmpty, setIsInitialPostEmpty] = useState(false);
  const minDate = moment(new Date()).format("YYYY-MM-DDTMM:SS");
  const [isLoading, setLoading] = useState(false)

  const tagOptions = ["Pendapat", "Pertanyaan", "Bingung"];

  const { pid } = router.query;

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

  const handleChangeTag = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    if (
      editorRef.current &&
      editorRef.current.getContent() &&
      editorRef.current.getContent().length > 0
    ) {
      setIsRequesting(true);
      // TODO: reference file
      const requestBody = {
        initial_post: {
          tag: tags.join(),
          content: editorRef.current.getContent(),
        },
        reference_file: [],
        discussion_guide: {
          deadline: deadline,
          description: description,
          mechanism_expectation: mechAndExp,
        },
        title: title,
        week: pid,
      };

      createThread(requestBody).then((data) => {
        if (data.status === 201) {
          var file = referenceFileList[0];
          const upload = firebase.storage().ref("/").child(file.name).put(file);

          upload.then((res) => {
            upload.snapshot.ref.getDownloadURL().then((url) => {
              axios
                .post("http://localhost:8000/forum/ReferenceFile/", {
                  title: res?._delegate.metadata.name,
                  url: url,
                  thread: data.data.id,
                })
                .then(() => {
                  setTimeout(() => {
                    router.push(`/forum/${data.data.id}`);
                  }, 10000)
                });
            });
          });
        }
      })
      setIsRequesting(false);
    } else {
      setIsInitialPostEmpty(true);
    }
  };

  const files = referenceFileList ? [...referenceFileList] : [];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {isRequesting && (
          <div className="flex flex-row justify-center">
            <CircularProgress color="inherit" />
          </div>
        )}
        {!isRequesting && (
          <>
            <div className="flex flex-row items-center text-xs pb-10">
              <a className="cursor-pointer" href="/">
                Sistem Interaksi - Gasal 2020/2021
              </a>
              <ChevronRightIcon />
              {/* TODO: replace #{num} pake week keberapa & nama week*/}
              <a className="cursor-pointer" href="/#4">
                Forum Diskusi Minggu ke-1
              </a>
              <ChevronRightIcon />
              <a className="font-bold">Buat Thread</a>
            </div>
            <div className="section">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-row gap-5">
                  <div className=" basis-1/2 flex flex-col gap-2">
                    <h3 className="font-bold">Judul Thread</h3>
                    <div className="h-1 w-5 bg-grey"></div>
                    <input
                      value={title}
                      onChange={handleChangeTitle}
                      required
                      type="text"
                      className="appearance-none block border w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                    />
                    <h3 className="font-bold">Panduan Diskusi</h3>
                    <div className="h-1 w-5 bg-grey"></div>
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
                    <div className="h-1 w-5 bg-grey"></div>
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        onChange={handleReferenceFileChange}
                        multiple
                        required
                      />
                      {files.map((file, i) => (
                        <div
                          className="flex flex-row items-center gap-2"
                          key={i}
                        >
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
                    <div className="h-1 w-5 bg-grey"></div>
                    <label>Konten</label>
                    {isInitialPostEmpty && (
                      <p className="text-amber-500 text-xs">
                        <ErrorIcon />{" "}
                        <span className="text-black">
                          Please fill out this field.
                        </span>
                      </p>
                    )}
                    <TextEditor editorRef={editorRef} />
                    <label>Tag</label>
                    <div>
                      <Select
                        className="bg-white w-full text-sm"
                        multiple
                        required
                        value={tags}
                        onChange={handleChangeTag}
                      >
                        {tagOptions.map((name) => (
                          <MenuItem key={name} value={name} className="text-sm">
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-5 mt-5">
                  <input
                    value="Batal"
                    className="bg-white text-black p-2 rounded cursor-pointer w-1/2 text-center border"
                  />
                  <input
                    type="submit"
                    value={isLoading ? "Loading..." :"Simpan"}
                    className="bg-green text-white p-2 rounded cursor-pointer w-1/2"
                    disabled={isLoading}
                  />
                </div>
              </form>
            </div>
          </>
        )}
      </main>
    </>
  );
}
