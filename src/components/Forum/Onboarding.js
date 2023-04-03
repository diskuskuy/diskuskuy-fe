import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, A11y]);

export default function Onboarding({ data }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="justify-center items-center flex inset-0 fixed"
      >
        <Dialog.Overlay
          className="bg-black"
          style={{
            position: "fixed",
            opacity: "0.5",
            top: "-5%",
            height: "110vh",
            width: "100%",
          }}
        />
        <div className="bg-white p-2 z-10 box-content rounded-[30px] w-[70%] max-w-[430px] border-white py-4">
          <Swiper
            style={{
              width: "100%",
              height: "100%",
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data.map((obj, i) => (
              <SwiperSlide>
                <div className="flex flex-col justify-center mb-12">
                  {/* {" "} */}
                  {/* <img
                  src="/images/onboarding-app/first-step.png"
                  className="h-[250px]"
                  alt=""
                />{" "} */}
                  <Dialog.Title className="font-bold text-center text-lg mt-6 mx-16">
                    {/* {" "} */}
                    {obj.title}
                  </Dialog.Title>
                  <Dialog.Description className="text-center text-[17px] font-medium mt-4 mx-16">
                    {obj.description}
                  </Dialog.Description>
                  {i == data.length-1 &&
                  <Dialog.Description
                  className="text-black underline text-center text-[16px] font-medium font-bold mt-12 mx-14 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Dialog.Description>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Dialog>
    </>
  );
}
