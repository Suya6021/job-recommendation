"use client";
import Link from "next/link";
import { useRef } from "react";

export default function Step1() {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInput.current && fileInput.current.click();
  };

  const handleFileChange = () => {};

  return (
    <main className="grid place-items-center min-h-screen">
      <div className="wrapper bg-white shadow-md rounded-md p-10 flex flex-col gap-10 w-1/2 mt-10">
        <div className="Header text-center text-black font-semibold text-2xl flex flex-col gap-1">
          <h3>Step-2</h3>
          <h1 className="text-sm font-medium">Verify your details</h1>
        </div>
        <div className="main-hero flex flex-col gap-3 p-6 items-center border-dashed border rounded-xl border-black">
          <div className="bg-[#f4f4f4] w-full px-4 py-3 rounded-md">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-lg text-black font-semibold">
                Basic Details
              </h1>
              <div className="grid grid-cols-2 grid-rows-2 place-content-stretch">
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f4f4f4] w-full px-4 py-3 rounded-md">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-lg text-black font-semibold">Education</h1>
              <div className="grid grid-cols-2 grid-rows-2 place-content-stretch">
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">Institution</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">Duration</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">Degree</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">Field</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f4f4f4] w-full px-4 py-3 rounded-md">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-lg text-black font-semibold">
                Certifications
              </h1>
              <div className="grid grid-cols-2 grid-rows-2 place-content-stretch">
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f4f4f4] w-full px-4 py-3 rounded-md">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-lg text-black font-semibold">Skills</h1>
              <div className="grid grid-cols-2 grid-rows-2 place-content-stretch">
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">First Name</h3>
                  <div className="p-2 bg-white text-gray-400 rounded-md">
                    <p>Info</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-2 rounded-md border-black text-center py-2 hover:cursor-pointer font-semibold">
          <Link href={"/step-1"}>Next</Link>
        </div>
      </div>
    </main>
  );
}
