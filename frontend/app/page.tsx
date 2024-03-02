"use client";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInput.current && fileInput.current.click();
  };

  const handleFileChange = () => {};

  return (
    <main className="grid place-items-center min-h-screen">
      <div className="wrapper bg-white shadow-md rounded-md p-10 flex flex-col gap-10">
        <div className="Header text-center text-black font-semibold text-2xl">
          <h1>Upload your Resume</h1>
        </div>
        <div className="main-hero flex flex-col gap-3 p-6 items-center border-dashed border rounded-xl border-black">
          <div className="text-4xl font-semibold w-3/4 text-center">
            <p>Drag & drop your resume here</p>
          </div>
          <div>
            <div
              className="cursor-pointer text-center px-4 py-2 rounded-lg bg-black text-white"
              onClick={handleButtonClick}
            >
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={handleFileChange}
              />
              <p className="">Browse from this device</p>
            </div>
          </div>
        </div>
        <div className="connect flex flex-col text-center gap-2 w-full font-semibold text-lg">
          <div>
            <p>Connect your LinkedIn account: </p>
          </div>
          <div className="flex w-full">
            <div className="text-white bg-black px-3 py-1 rounded-l-md">
              Link
            </div>
            <div className="w-full">
              <input
                type="text"
                className="w-full px-6 py-1 outline-none bg-[#f4f4f4] rounded-r-md font-normal"
                placeholder="https://www.linkedin.com/in/himan-miku/"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
