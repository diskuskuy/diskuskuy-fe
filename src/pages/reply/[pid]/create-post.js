import TextEditor from "@/components/Forum/TextEditor";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import styles from "@/styles/CreateForum.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { replyPost, replyNestedPost } from "@/api/reply-post-api";
import { fetchBreadcrumbByThreadId } from "@/api/forum";

export default function CreatePost() {
  const editorRef = useRef(null);
  const router = useRouter();
  const [tags, setTags] = React.useState([]);
  const { pid, parent, type } = router.query;
  const [breadcrumb, setBreadcrumb] = useState("");

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split('/');
    const threadId = pathArray[pathArray.length - 2];

    fetchBreadcrumbByThreadId(threadId).then(data => {
      setBreadcrumb(data)
      console.log(data)
    })
  }, [editorRef])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(tags);
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    if (editorRef.current.getContent().length > 0 && tags.length > 0) {
      const path = location.pathname;
      const pathArray = path.split("/");
      const initialPostId = pathArray[pathArray.length - 2];
      const requestBody = JSON.stringify({
        post: {
          tag: tags.join(),
          content: editorRef.current.getContent(),
          creator: localStorage.getItem("userId")
        },
        initial_post: parseInt(initialPostId),
        reply_post: parseInt(parent)
      })

      if(type === "nested") {
        replyNestedPost(requestBody)
        .then(data => {
          window.alert("Berhasil Membuat Nested Reply Post")
          router.push(`/forum/${pid}`);
        })
      } else {
        replyPost(requestBody)
        .then(data => {
          window.alert("Berhasil Membuat Reply Post")
          router.push(`/forum/${parent}`);
        })
      }
    } else {
      window.alert("Gak boleh kosong bos")
    }
  };
  const handleChangeTag = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(event);
  };
  const tagOptions = ["pertanyaan", "pendapat", "bingung"];

  return (
    <>
    <Navbar />
      <main className={styles.main}>
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
          <a className="font-bold">Buat Postingan</a>
        </div>
        <div className="text-center font-bold">
          <h1>Tulis Postingan</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <TextEditor editorRef={editorRef}></TextEditor>
          <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
          <Select
            className="bg-white w-1/2 text-sm"
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
          <div className="flex flex-row-reverse gap-2">
            <input
              type="submit"
              value="Simpan"
              className="bg-green text-white p-2 rounded cursor-pointer"
            />
            <button className="bg-white text-black p-2 rounded cursor-pointer w-16" onClick={() => router.push(`/forum/${pid}`)}>
              Batal
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
