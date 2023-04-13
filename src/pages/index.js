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
import { createWeek, fetchWeeksData } from "@/api/home";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateWeekPopUp from "@/components/Home/CreateWeekPopUp";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [weeksData, setWeeksData] = useState([]);
  const [showCreateWeekPopUp, setShowCreateWeekPopUp] = useState(false);
  const [weekNameInput, setWeekNameInput] = useState("");

  useEffect(() => {
    fetchWeeksData().then((data) => setWeeksData(data));
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
      <main className={styles.main}>
        <div className="flex flex-col gap-5">
          <div className="block p-6 h-44 bg-cover bg-[url('/header.png')] bg-[#646E9E] border rounded-lg text-white">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
              {courseName}
            </h5>
            <p className="font-normal">({term})</p>
          </div>
          <div className="block p-6 bg-white border rounded-lg">
            <div className="flex flex-row gap-2">
              <div className="basis-1/2 flex flex-col gap-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Selamat Datang
                </h5>
                <p>
                  di mata kuliah {courseName} Semester {term}
                </p>
                <p>{courseDescription}</p>
                <div className="flex flex-row items-center gap-2">
                  <img src="/pdf-icon.png" width={"30px"} />
                  <div className="flex flex-col">
                    <p className="font-bold">
                      Buku Rancangan Pengajaran Sistem Interaksi
                    </p>
                    <p>(Revisi 1 September 2020)</p>
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Tim Pengajar
                </h5>
                <div className="flex flex-row flex-wrap gap-2">
                  {dosenInfo.map((object, i) => (
                    <DosenInfo
                      key={i}
                      photoUrl={object.photoUrl}
                      name={object.name}
                      teachingClass={object.teachingClass}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button
            startIcon={<AddIcon />}
            variant="filled"
            className="normal-case text-black bg-white w-40 rounded-lg"
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
          {!(weeksData && weeksData.length > 0) && (
            <div className="flex flex-row justify-center">
              <CircularProgress color="inherit" />
            </div>
          )}
          {/* TODO: tambahin id pake week keberapa*/}
          {weeksData &&
            weeksData.length > 0 &&
            weeksData.map((week, i) => (
              <div className="block p-6 my-3 bg-white border border-gray-200 rounded-lg flex flex-col gap-2" id='1'>
                <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {week.name}
                </h6>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  className="normal-case text-black bg-white w-40 rounded-lg"
                  onClick={() => router.push(`week/${week.id}/create-thread`)}
                >
                  Buat Thread
                </Button>
                {week.threads.length > 0 && (
                  <div>
                    <p className="font-normal text-gray-700 ">
                      Forum Diskusi {week.name}
                    </p>
                    <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                    {week.threads.map((thread) => (
                      <div className="grid grid-cols-2 mt-2">
                        <div className={styles.threadCard}>
                          <div className="grid grid-cols-6">
                            <div className="col-start-1 col-end-6 group flex items-center">
                              <img
                                className="shrink-0 h-12 w-12 rounded-full"
                                src="/teacher-img.png"
                                alt=""
                              />
                              <div className="rtl:mr-3 ml-3">
                                <p className="font-normal text-green-700">
                                  Thread
                                </p>
                                <h6 className="tracking-tight text-gray-900">
                                  {thread.title}
                                </h6>
                                <p className="text-xs w-full m-0 p-0">
                                  Fulan bin Fulan | 7 Maret 2023 (17.00 WIB)
                                </p>
                              </div>
                            </div>
                            <div className="col-end-7 col-span-1 p-2">
                              <Link href={"/forum/" + thread.id}>
                                <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                                  Lihat
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
