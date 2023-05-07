import { fetchProfileData } from "@/api/auth";
import { useEffect, useState } from "react";
import {
  deleteCookie,
} from 'cookies-next'
import { useRouter } from "next/router";
import firebase from "@/utils/firebase";
import axios from "axios";

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
          className="cursor-pointer h-12 w-12 relative"
        >
          <img src={profileData.photo_url} alt="prof-pic" className="rounded-full object-cover h-12 w-12"
          />
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
            input.setAttribute("accept", "image/png, image/jpeg, image/jpg ")

            input.onchange = function () {
              var file = this.files[0];
              const upload = firebase
              .storage()
              .ref(`/photo_profile/${localStorage.getItem('userId')}/`)
              .child(file.name)
              .put(file)

              upload.then(() => {
                upload.snapshot.ref.getDownloadURL().then((url) => {
                  axios.put(`${process.env.NEXT_PUBLIC_BE_URL}/auth/profile/`, {
                    photo_url: url,
                  }, {headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                  }},
                  ).then(() => {
                    localStorage.setItem('photoUrl', url)
                    window.alert("Berhasil Mengubah Foto Profil")
                    window.location.reload()
                  })
                })
                })
              
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
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        router.replace("/login");
      }} className="text-xs cursor-pointer">
        Logout
      </a>
    </div>
  );
}
