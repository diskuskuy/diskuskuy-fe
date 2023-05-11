import Link from "next/link";
import { Dropdown } from "@nextui-org/react";
import ProfileComponent from "./Profile";
import { getCookie } from "cookies-next";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Navbar() {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(
      getCookie("auth") ? JSON.parse(getCookie("auth"))?.token != null : false
    );
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 bg-green w-full px-12 py-2 text-white">
      <div>
        <Link href="/">
          <img
            src="/images/diskuskuy-logo.svg"
            alt="diskuskuy"
            width={130}
            height={25}
            priority="false"
          ></img>
        </Link>
      </div>
      {!isAuth ? (
        <button sx={{ color: "#fff" }} onClick={() => router.push("/login")}>
          Login
        </button>
      ) : (
        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex flex-row items-center cursor-pointer">
              <img
                className="rounded-full object-cover h-10 w-10"
                src={
                  JSON.parse(getCookie("auth"))?.photo_url
                    ? JSON.parse(getCookie("auth"))?.photo_url
                    : "/images/default-prof-pic.png"
                }
                alt="profile-picture"
              />
              <ExpandMoreIcon fontSize="large" />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu css={{ padding: "0px" }}>
            <Dropdown.Item
              key="profile"
              css={{ height: "100%", width: "100%", padding: "0px" }}
            >
              <ProfileComponent />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
