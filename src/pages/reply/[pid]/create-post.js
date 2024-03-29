import TextEditor from "@/components/Forum/TextEditor";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import styles from "@/styles/CreateThread.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { replyPost, replyNestedPost } from "@/api/reply-post-api";
import { toast } from "react-hot-toast";
import ErrorIcon from "@mui/icons-material/Error";
import { fetchBreadcrumbByThreadId } from "@/api/forum-api";
import { getCookie, getCookies } from "cookies-next";
import Head from "next/head";

export default function CreatePost() {
  const editorRef = useRef(null);
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [isContentEmpty, setIsContentEmpty] = useState(false);
  const { pid, parent, type } = router.query;
  const [breadcrumb, setBreadcrumb] = useState("");
  const [isSubmit, setIsSubmit] = useState(true);

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split("/");
    const threadId = pathArray[pathArray.length - 2];

    fetchBreadcrumbByThreadId(threadId).then((data) => {
      setBreadcrumb(data);
    });
  }, [editorRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmit) {
      if (editorRef.current.getContent().length > 0 && tags.length > 0) {
        setIsContentEmpty(false);
        const path = location.pathname;
        const pathArray = path.split("/");
        const initialPostId = pathArray[pathArray.length - 2];
        const requestBody = JSON.stringify({
          post: {
            tag: tags.join(),
            content: editorRef.current.getContent(),
            creator: JSON.parse(getCookie("auth"))?.user_id,
          },
          initial_post: parseInt(initialPostId),
          reply_post: parseInt(parent),
        });

        if (type === "nested") {
          replyNestedPost(requestBody).then((data) => {
            toast.success("Berhasil membuat nested reply post");
            router.push(`/forum/${pid}`);
          });
        } else {
          replyPost(requestBody).then(() => {
            toast.success("Berhasil membuat reply post");
            router.push(`/forum/${parent}`);
          });
        }
      } else {
        setIsContentEmpty(true);
      }
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

  const handleCancel = () => {
    setIsSubmit(false);
    router.push(`/forum/${pid}`)
  }

  return (
    <>
      <Head>
        <title>Balas Postingan</title>
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
            <a className="font-bold">Balas Postingan</a>
          </div>
          <div className="section">
            <h2 className="font-bold text-center">Balas Postingan</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 text-sm"
            >
              <label className="font-bold">Konten</label>
              <div className="h-1 w-5 bg-grey"></div>
              <TextEditor editorRef={editorRef}></TextEditor>
              {isContentEmpty && (
                <p className="text-amber text-xs">
                  <ErrorIcon />{" "}
                  <span className="text-black">
                    Please fill out this field.
                  </span>
                </p>
              )}
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
                  <MenuItem key={name} value={name} className="text-sm">
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <div className="flex flex-row gap-5 mt-10 justify-end">
                <button
                  className="w-1/4 bg-white border text-black p-2 rounded cursor-pointer"
                  onClick={handleCancel}
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