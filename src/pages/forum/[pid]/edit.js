import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/CreateForum.module.css";
import moment from "moment/moment";
import TextEditor from "@/components/Forum/TextEditor";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import ErrorIcon from "@mui/icons-material/Error";
import Navbar from "@/components/Navbar";
import { fetchThreadDataById } from "@/api/forum";
import { editThread } from "@/api/edit-thread-api";

export default function EditThread() {
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

  const tagOptions = ["pertanyaan", "pendapat", "bingung"];

  const [forumData, setForumData] = useState({});

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split('/');
    const threadId = pathArray[pathArray.length - 2];
    fetchThreadDataById(threadId)
    .then(data => {
      setForumData(data)
      setTitle(data.title)
      const deadlineData = data.discussion_guide.deadline
      setDeadline(moment(deadlineData).format("YYYY-MM-DDTMM:SS"))
      setDescription(data.discussion_guide.description)
      setMechAndExp(data.discussion_guide.mechanism_expectation)
      editorRef.current.setContent(data.initial_post.content)
      const tagData = data.initial_post.tag.toLowerCase()
      setTags(tagData.split(","))
    })
  }, [])

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
    if (
      editorRef.current &&
      editorRef.current.getContent() &&
      editorRef.current.getContent().length > 0
    ) {
      setIsRequesting(true);
      // TODO: reference file
      const requestBody = JSON.stringify({
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
        week: forumData.week,
      });
      editThread(forumData.id, requestBody).then((data) => {
        if (data) router.push(`/forum/${data.id}`);
      });
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
              <a className="font-bold">Edit Thread</a>
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
                    <div className="h-1 w-5 bg-[#C4C4C4]"></div>
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
                        {tagOptions.map((tag) => (
                          <MenuItem key={tag} value={tag} className="text-sm" selected={tags.includes(tag)}>
                            {tag}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-5 mt-10 justify-end">
                  <input
                    value="Batal"
                    className="bg-[#FFFFFF] text-black p-2 rounded cursor-pointer w-1/4 text-center border"
                  />
                  <input
                    type="submit"
                    value="Simpan"
                    className="bg-[#2ECC71] text-white p-2 rounded cursor-pointer w-1/4"
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