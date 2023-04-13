import TextEditor from "@/components/Forum/TextEditor";
import React, { useRef, useState, ChangeEvent } from "react";
import styles from "@/styles/CreateForum.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function CreatePost() {
  const editorRef = useRef(null);
  const router = useRouter();
  const [tags, setTags] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(tags);
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    if (editorRef.current.getContent().length > 0 && tags.length > 0) {
      router.push("/forum/1");
    }
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(event);
  };
  const names = ["Pertanyaan", "Pendapat", "Bingung"];
  return (
    <>
    <Navbar />
      <main className={styles.main}>
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
          <a className="font-bold">Buat Postingan</a>
        </div>
        <div className="text-center text-2xl font-bold">
          <h2>Tulis Postingan</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <TextEditor editorRef={editorRef}></TextEditor>

          <div className="mt-5">
            {/* <FormControl sx={{ m: 1, width: 300 }}> */}
            <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
            <Select
              className="bg-white"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={tags}
              onChange={handleChange}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {/* </FormControl> */}
            <div className="flex flex-row-reverse gap-2">
              <input
                type="submit"
                value="Simpan"
                className="bg-[#2ECC71] text-white p-2 rounded cursor-pointer"
              />
              <input
                value="Batal"
                className="bg-[#FFFFFF] text-black p-2 rounded cursor-pointer w-16"
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
