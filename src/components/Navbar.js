import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "@nextui-org/react";
import ProfileComponent from "./Profile";

export default function Navbar() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2 bg-green w-full p-2 text-white">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/diskuskuy-logo.png"
            alt="diskuskuy"
            width={130}
            height={25}
          />
        </Link>
      </div>
      <div className="flex items-center mx-5">
        <Dropdown>
          <Dropdown.Button light>
            <div className="rounded-full ml-2">
              <img
                src="/teacher-img.png"
                alt="profile-picture"
                width={"35px"}
              />
            </div>
          </Dropdown.Button>
          <Dropdown.Menu css={{ padding: "0px" }}>
            <Dropdown.Item
              key="profile"
              css={{ height: "100%", width: "100%", padding: "0px" }}
            >
              <ProfileComponent />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
