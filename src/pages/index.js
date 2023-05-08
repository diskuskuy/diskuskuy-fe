import React, { useState, useEffect } from "react";

import Link from "next/link";
import styles from "@/styles/Home.module.css";
import DosenInfo from "@/components/Home/DosenInfo";
import {
  courseName,
  courseDescription,
  term,
  dosenInfo,
} from "@/api/dummy/home";
import { createWeek, fetchDosenData, fetchWeeksData } from "@/api/home-api";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateWeekPopUp from "@/components/Home/CreateWeekPopUp";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import moment from "moment";
import { getCookie } from "cookies-next";
import { isObjectEmpty } from "@/utils/util";
import { hasCookie } from 'cookies-next'

export default function Home() {
  const router = useRouter();
  const [weeksData, setWeeksData] = useState([]);
  const [dosenData, setDosenData] = useState([]);
  const [showCreateWeekPopUp, setShowCreateWeekPopUp] = useState(false);
  const [weekNameInput, setWeekNameInput] = useState("");
  const [isLecturer, setIsLecture] = useState(false);
  const [isAuth, setIsAuth] = useState(false)

  // const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
  // const isLecturer = role == 'lecturer' ? true : false;

  useEffect(() => {
    fetchWeeksData().then((data) => setWeeksData(data));
    fetchDosenData().then((dosenData) => setDosenData(dosenData));
    setIsAuth(localStorage.getItem('token') != null)
    setIsLecture(
      getCookie("auth")
        ? JSON.parse(getCookie("auth"))?.role === "lecturer"
        : false
    );
  }, []);

  const handleShowCreateWeekPopUp = () => {
    setShowCreateWeekPopUp(true);
  };

  const handleCloseCreateWeekPopUp = () => {
    setShowCreateWeekPopUp(false);
  };

  const handleSaveActionPopUp = () => {
    createWeek(weekNameInput).then((data) => {
      if (data) window.location.reload();
    });
  };

  const handleWeekNameInputChange = (event) => {
    setWeekNameInput(event.target.value);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {!isAuth && <p>Anda Harus Login</p>}
        {isAuth && (
          <div className="flex flex-col gap-5">
            <div className="block p-6 h-44 bg-cover bg-[url('/header.png')] bg-purple rounded-lg text-white">
              <h1 className="mb-2 font-bold tracking-tight">{courseName}</h1>
              <p className="font-normal">({term})</p>
            </div>
            <div className="section">
              <div className="flex flex-row gap-2">
                <div className="basis-1/2 flex flex-col gap-5">
                  <h1 className="mb-2 font-bold tracking-tight text-gray-900">
                    Selamat Datang
                  </h1>
                  <p>
                    di mata kuliah {courseName} Semester {term}
                  </p>
                  <p>{courseDescription}</p>
                
                </div>
                <div className="basis-1/2">
                  <h1 className="mb-2 font-bold tracking-tight text-gray-900">
                    Tim Pengajar
                  </h1>
                  <div className="flex flex-row flex-wrap gap-2">
                    {dosenData.map((dosen, i) => (
                      <DosenInfo
                        key={i}
                        photoUrl={dosen?.lecturer.photo_url}
                        name={dosen?.lecturer.name}
                        nim={dosen?.nim}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {isLecturer && (
              <>
                <Button
                  startIcon={<AddIcon />}
                  variant="filled"
                  className="normal-case text-black font-bold bg-white w-40 rounded-lg"
                  onClick={handleShowCreateWeekPopUp}
                >
                  Tambah Week
                </Button>
                <CreateWeekPopUp
                  open={showCreateWeekPopUp}
                  onClose={handleCloseCreateWeekPopUp}
                  onSaveAction={handleSaveActionPopUp}
                  inputValue={weekNameInput}
                  handleInputChange={handleWeekNameInputChange}
                />
              </>
            )}
            {!(weeksData && weeksData.length > 0) && (
              <div className="flex flex-row justify-center">
                <CircularProgress color="inherit" />
              </div>
            )}
            {/* TODO: tambahin id pake week keberapa*/}
            {weeksData &&
              weeksData.length > 0 &&
              weeksData.map((week, i) => (
                <div className="section" key={week.id} id={week.id}>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="mb-2 font-bold tracking-tight text-gray-900">
                      {week.name}
                    </h1>
                    {isLecturer && (
                      <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        className="normal-case text-black font-bold bg-white w-40 rounded-lg"
                        onClick={() =>
                          router.push(`week/${week.id}/create-thread`)
                        }
                      >
                        Buat Thread
                      </Button>
                    )}
                  </div>
                  {week.threads.length > 0 && (
                    <>
                      <p className="font-bold text-gray-700">
                        Forum Diskusi {week.name}
                      </p>
                      <div className="h-1 w-5 bg-grey"></div>
                      {week.threads.map((thread, i) => (
                        <div className={styles.threadCard} key={i}>
                          <div className="group flex items-center">
                            <img
                              className="h-12 w-12 rounded-full object-cover"
                              src={thread.initial_post.post.creator_photo_url}
                              alt=""
                            />
                            <div className="rtl:mr-3 ml-3">
                              <p className="font-normal text-green">Thread</p>
                              <h6 className="tracking-tight text-gray-900">
                                {thread.title}
                              </h6>
                              {console.log(thread)}
                              <p className="text-xs w-full m-0 p-0">
                                {thread?.initial_post?.post?.creator_name} |{" "}
                                {moment(
                                  thread?.discussion_guide?.deadline
                                )?.format("LLL")}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row gap-2">
                            <Link href={"/forum/" + thread.id}>
                              <button className="bg-transparent hover:bg-green text-green font-semibold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded">
                                Lihat
                              </button>
                            </Link>
                            {isLecturer && (
                              <Link href={`/forum/${thread.id}/edit`}>
                                <button className="bg-transparent hover:bg-green text-green font-semibold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded">
                                  Edit
                                </button>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
          </div>
        )}
      </main>
    </>
  );
}
