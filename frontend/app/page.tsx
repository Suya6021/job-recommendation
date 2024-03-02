"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const fileInput = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState<File | undefined>();

  const handleButtonClick = () => {
    fileInput.current && fileInput.current.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPdfFile(file);
  };

  const uploadPdf = async () => {
    const formData = new FormData();
    formData.append("pdf", pdfFile as Blob);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <main className="grid place-items-center min-h-screen">
      <div className="wrapper bg-white shadow-md rounded-md p-10 flex flex-col gap-10">
        <div className="Header text-center text-black font-semibold text-2xl flex flex-col gap-1">
          <h3>Step-1</h3>
          <h1 className="text-sm font-medium">Upload your Resume</h1>
        </div>
        <div className="main-hero flex flex-col gap-4 p-6 items-center border-dashed border rounded-xl border-black">
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
                onClick={handleButtonClick}
              />
              <p className="">Browse from this device</p>
            </div>
          </div>
        </div>
        <div className="connect flex flex-col text-center gap-2 w-full font-semibold text-lg">
          <div className="text-sm">
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
        <div className="w-full border-2 rounded-md border-black text-center py-2 hover:cursor-pointer font-semibold">
          <button
            onClick={() => {
              uploadPdf();
              router.push("/step-1");
            }}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
