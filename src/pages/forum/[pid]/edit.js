import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/CreateForum.module.css";
import moment from "moment/moment";
import TextEditor from "@/components/Forum/TextEditor";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import ErrorIcon from "@mui/icons-material/Error";
import Navbar from "@/components/Navbar";
import { fetchThreadDataById, fetchBreadcrumbByThreadId } from "@/api/forum-api";
import { editThread } from "@/api/edit-thread-api";
import firebase from "@/utils/firebase";
import axios from 'axios'
import { toast } from "react-hot-toast";
// import { createReferenceFile } from "@/api/create-thread-api";

export default function EditThread() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [mechAndExp, setMechAndExp] = useState("");
  const [referenceFileList, setReferenceFileList] = useState([]);
  const [referenceFile, setReferenceFile] = useState(null)
  const [tags, setTags] = useState([]);
  const [isInitialPostEmpty, setIsInitialPostEmpty] = useState(false);
  const [content, setContent] = useState("")
  const minDate = moment(new Date()).format("YYYY-MM-DDTMM:SS");

  const tagOptions = ["pertanyaan", "pendapat", "bingung"];

  const [forumData, setForumData] = useState({});
  const [breadcrumb, setBreadcrumb] = useState("");

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
      setContent(data?.initial_post?.post?.content ?? "")
      const tagData = data.initial_post.post.tag.toLowerCase()
      setTags(tagData.split(","))
      setReferenceFileList(data?.reference_file ?? [])
    })
    fetchBreadcrumbByThreadId(threadId).then(data => {
      setBreadcrumb(data)
      console.log(data)
    })
  }, [editorRef])

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
    setReferenceFile(e.target.files)
    setReferenceFileList([...referenceFileList]);
  };

  const handleChangeTag = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      editorRef.current &&
      editorRef.current.getContent() &&
      editorRef.current.getContent().length > 0
    ) {
      setIsRequesting(true);
      setIsInitialPostEmpty(false);

      if(referenceFile) {
        const upload = await firebase?.storage()?.ref("/")?.child(referenceFile[0]?.name)?.put(referenceFile[0]);
        const uploadUrl = await upload?.ref?.getDownloadURL();

        const request = {
          title: referenceFile[0]?.name,
          url: uploadUrl,
          thread: forumData.id,
        };
        
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BE_URL}/forum/ReferenceFile/`,
            request,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ).then(() => {
            const requestBody = {
              initial_post: {
                post: {
                  tag: tags.join(),
                  content: editorRef.current.getContent() ? editorRef.current.getContent() : content,
                }
              },
              reference_file: [],
              discussion_guide: {
                deadline: deadline,
                description: description,
                mechanism_expectation: mechAndExp,
              },
              title: title,
              week: forumData.week,
            };
            editThread(forumData.id, requestBody).then((data) => {
              // masih error di bagian upload file
              if (data.status === 200) {
                toast.success("Berhasil Mengedit Thread")
                router.push(`/forum/${forumData.id}`)
              };
            });
          }).catch((error) => console.log(error))
      } else {
        const requestBody = {
          initial_post: {
            post: {
              tag: tags.join(),
              content: editorRef.current.getContent(),
            }
          },
          reference_file: referenceFileList,
          discussion_guide: {
            deadline: deadline,
            description: description,
            mechanism_expectation: mechAndExp,
          },
          title: title,
          week: forumData.week,
        };
        editThread(forumData.id, requestBody).then((data) => {
          // masih error di bagian upload file
          if (data.status === 200) {
            toast.success("Berhasil Mengedit Thread")
            router.push(`/forum/${forumData.id}`)
          };
        });
      }

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
                Home
              </a>
              <ChevronRightIcon />
              {/* TODO: replace #{num} pake week keberapa & nama week*/}
              <a className="cursor-pointer" href="/#4">
                Forum Diskusi {breadcrumb.week_name}
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
                      />
                      {files.map((file, i) => (
                        <div
                          className="flex flex-row items-center gap-2"
                          key={i}
                        >
                          {(file.url ?? file.name).includes(".pdf") && (
                            <img src="/pdf-icon.png" width={"30px"} />
                          )}
                          {(file.url ?? file.name).includes(".png") && (
                            <img src="/png-icon.png" width={"30px"} />
                          )}
                          {!(file.url ?? file.name).includes(".pdf") &&
                            !(file.url ?? file.name).includes(".png") && (
                              <img src="/url-icon.png" width={"30px"} />
                            )}
                          <div className="flex flex-col">
                            <p>{file.name || file.title}</p>
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
                      <p className="text-amber text-xs">
                        <ErrorIcon />{" "}
                        <span className="text-black">
                          Please fill out this field.
                        </span>
                      </p>
                    )}
                    <TextEditor editorRef={editorRef} defaultValue={content} />
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
                    type="button"
                    value="Batal"
                    className="bg-white text-black p-2 rounded cursor-pointer w-1/4 text-center border"
                    onClick={() => router.push("/")}
                  />
                  <input
                    type="submit"
                    value="Simpan"
                    className="bg-green text-white p-2 rounded cursor-pointer w-1/4"
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
