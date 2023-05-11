import TextEditor from "@/components/Forum/TextEditor";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import styles from "@/styles/CreateThread.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { editPost, fetchPost } from "@/api/edit-reply-api";
import { toast } from "react-hot-toast";
import { fetchBreadcrumbByThreadId } from "@/api/forum-api";
import Head from "next/head";
import { getCookies } from "cookies-next";

export default function EditPost() {
  const editorRef = useRef(null);
  const router = useRouter();
  const [tags, setTags] = React.useState([]);
  const [content, setContent] = useState("");
  const { pid, parent, type } = router.query;
  const [breadcrumb, setBreadcrumb] = useState("");

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split("/");
    const postId = pathArray[pathArray.length - 1];
    const threadId = pathArray[pathArray.length - 3];
    fetchPost(postId).then((data) => {
      setContent(data?.content ?? "");
      const tagData = data.tag.toLowerCase();
      setTags(tagData.split(","));
    });
    fetchBreadcrumbByThreadId(threadId).then((data) => {
      setBreadcrumb(data);
    });
  }, [editorRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editorRef.current.getContent().length > 0 && tags.length > 0) {
      const path = location.pathname;
      const pathArray = path.split("/");
      const threadId = pathArray[pathArray.length - 3];
      const postId = pathArray[pathArray.length - 1];
      const requestBody = JSON.stringify({
        tag: tags.join(),
        content: editorRef.current.getContent(),
      });

      editPost(requestBody, postId).then((data) => {
        toast.success("Berhasil mengedit post");
        router.push(`/forum/${threadId}`);
      });
    } else {
      toast.error("Harap isi konten");
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
  };
  const tagOptions = ["pertanyaan", "pendapat", "bingung"];

  return (
    <>
      <Head>
        <title>Edit Postingan</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.mainContent}>
          <div className="flex flex-row items-center text-xs pb-5">
            <a className="cursor-pointer" href="/">
              Sistem Interaksi Genap 2022/2023
            </a>
            <ChevronRightIcon />
            {/* TODO: replace #{num} pake week keberapa & nama week*/}
            <a className="cursor-pointer" href="/#4">
              Forum Diskusi {breadcrumb.week_name}
            </a>
            <ChevronRightIcon />
            <a className="font-bold">Edit Postingan</a>
          </div>
          <div className="section">
            <h2 className="font-bold text-center">Edit Postingan</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
              <label className="font-bold">Konten</label>
              <div className="h-1 w-5 bg-grey"></div>
              <TextEditor
                editorRef={editorRef}
                defaultValue={content}
              ></TextEditor>
              <label className="font-bold">Tag</label>
              <div className="h-1 w-5 bg-grey"></div>
              <Select
                className="bg-white w-1/2 text-sm"
                multiple
                required
                value={tags}
                onChange={handleChangeTag}
              >
                {tagOptions.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    className="text-sm"
                    selected={tags.includes(name)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <div className="flex flex-row gap-5 mt-10 justify-end">
                <button
                  className="w-1/4 bg-white border text-black p-2 rounded cursor-pointer"
                  onClick={() => router.push(`/forum/${pid}`)}
                >
                  Batal
                </button>
                <input
                  type="submit"
                  value="Simpan"
                  className="w-1/4 bg-green text-white p-2 rounded cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  if (!getCookies({ req, res })?.auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}