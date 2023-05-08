import TextEditor from "@/components/Forum/TextEditor";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import styles from "@/styles/CreateForum.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { editPost, fetchPost } from "@/api/edit-reply-api";
import { toast } from "react-hot-toast";

export default function EditPost() {
  const editorRef = useRef(null);
  const router = useRouter();
  const [tags, setTags] = React.useState([]);
  const [content, setContent] = useState("");
  const { pid, parent, type } = router.query;

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split('/');
    const postId = pathArray[pathArray.length - 1];
    fetchPost(postId)
    .then(data => {
      setContent(data?.content ?? "")
      const tagData = data.tag.toLowerCase()
      setTags(tagData.split(","))
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
      const threadId = pathArray[pathArray.length - 3];
      const postId = pathArray[pathArray.length - 1];
      const requestBody = JSON.stringify({
        tag: tags.join(),
        content: editorRef.current.getContent()
      })

    editPost(requestBody, postId)
      .then(data => {
        toast.success("Berhasil mengedit post")
        router.push(`/forum/${threadId}`);
      })
      
      
    } else {
      toast.error("Harap isi konten")
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
            Forum Diskusi Minggu ke-1
          </a>
          <ChevronRightIcon />
          <a className="font-bold">Edit Postingan</a>
        </div>
        <div className="text-center font-bold">
          <h1>Tulis Postingan</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <TextEditor editorRef={editorRef} defaultValue={content}></TextEditor>
          <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
          <Select
            className="bg-white w-1/2 text-sm"
            multiple
            required
            value={tags}
            onChange={handleChangeTag}
          >
            {tagOptions.map((name) => (
              <MenuItem key={name} value={name} className="text-sm" selected={tags.includes(name)}>
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
