import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { formatDateDeadline } from "@/utils/util";

SwiperCore.use([Navigation, Pagination, A11y]);

export default function Onboarding({ data, deadline }) {
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
        <div className="bg-white z-10 box-content rounded-[30px] w-[70%] max-w-[430px] border-white py-4 px-10">
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
          >
            {data.map((obj, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col justify-center text-xs items-center text-justify mb-12">
                  <img
                    src={obj.picUrl}
                    className="h-[150px]"
                    alt=""
                  />{" "}
                  <Dialog.Title className="font-bold text-lg mt-6">
                    {obj.title}
                  </Dialog.Title>
                  <Dialog.Description className="font-medium mt-4">
                    {i == 2 ? formatDateDeadline(deadline) : obj.description}
                  </Dialog.Description>
                  {obj.moreDescription &&
                    <Dialog.Description className="font-medium mt-4">
                      {obj.moreDescription}
                    </Dialog.Description>
                  }
                  {obj.hint &&
                    <>
                      <p className="font-bold text-center mt-4">
                        Hints
                      </p>
                      <Dialog.Description className="font-medium mt-4">
                        {obj.hint}
                      </Dialog.Description>
                    </>
                  }
                  {obj.moreHint &&
                    <Dialog.Description className="font-medium mt-4">
                      {obj.moreHint}
                    </Dialog.Description>
                  }
                  {i == data.length - 1 && (
                    <Dialog.Description
                      className="text-black underline text-center mt-4 font-medium cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </Dialog.Description>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Dialog>
    </>
  );
}
