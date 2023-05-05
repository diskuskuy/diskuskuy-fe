import { fetchProfileData } from "@/api/auth";
import { useEffect, useState } from "react";
import {
  deleteCookie,
} from 'cookies-next'
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter()
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    fetchProfileData().then((data) => setProfileData(data));
  }, []);

  return (
    <div
      className="section"
      style={{
        width: "300px",
        height: "150px",
      }}
    >
      <div className="flex flex-row items-center gap-2">
        <a
          onClick={() => {}}
          className="cursor-pointer"
          style={{
            position: "relative",
            width: "50px",
            height: "50px",
          }}
        >
          <img src="/default-prof-pic.png" alt="prof-pic" className="rounded-full"/>
          <img
            src="/edit-profile-pic.png"
            alt="edit-profile-picture"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "20px",
            }}
          />
        </a>
        <div className="flex flex-col">
          <p className="font-bold text-lg">{profileData.name}</p>
          <p className="text-xs">{profileData.nim}</p>
          <a className="text-xs text-blue cursor-pointer"
          onClick={() => {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/png, image/jpeg")

            input.onchange = function () {
              var file = this.files[0];
              console.log(file)
              // TODO: integrate with be
            };
            input.click();
          }}>
            Ubah foto profil
          </a>
        </div>
      </div>
      <div className="h-[0.5px] bg-grey"></div>
      <a onClick={() => {
        deleteCookie('auth');
        router.replace("/login");
      }} className="text-xs cursor-pointer">
        Logout
      </a>
    </div>
  );
}
