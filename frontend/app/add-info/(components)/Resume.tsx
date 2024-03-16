import { useStore } from "@/store/zustand";
import { Poppins } from "next/font/google";
import React from "react";
import { twJoin } from "tailwind-merge";
import { FaRegStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const Resume = () => {
  let store = useStore((state) => state);
  return (
    <div
      className={twJoin(
        "w-full flex flex-col gap-3 justify-start",
        poppins.className
      )}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl text-black font-semibold">{store?.FullName}</h1>
        <h3 className="text-blue-500 text-2xl font-semibold">{store?.Title}</h3>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-semibold border-b-4 pb-1 rounded border-y-slate-400 w-min">
          Experience
        </h2>
        <div className="flex tracking-wide flex-col gap-2 pt-2">
          {store?.Experience?.map((ele) => {
            return (
              <div className="flex flex-col gap-1">
                <div>
                  <div className="text-2xl text-blue-500 font-bold">
                    {ele?.Position}
                  </div>
                  <div className="flex gap-2 text-slate-500 font-bold">
                    {ele?.Company}
                    <span className="flex items-center justify-center">
                      <FaLocationDot></FaLocationDot>
                      {ele?.location}
                    </span>
                  </div>
                  <div className="text-slate-500 text-md">{ele?.duration}</div>
                </div>
                <ul>
                  <li className="text-slate-600 font-semibold tracking-wider">
                    {ele?.desc}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <hr></hr>
      <h2 className="text-3xl font-semibold border-b-4 pb-1 rounded border-y-slate-400 w-min">
        Projects
      </h2>
      <div className="flex tracking-wide flex-col gap-2 pt-2">
        {store?.Project?.map((ele) => {
          return (
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-blue-500 flex gap-2 items-center">
                {ele?.Title}
                <FaExternalLinkAlt />
                {/* <span>{ele?.Url}</span> */}
              </h2>
              <h6 className="text-slate-500 font-semibold">{ele?.duration}</h6>
              <h2 className="text-slate-700 font-semibold">{ele?.desc}</h2>
            </div>
          );
        })}
      </div>
      <hr></hr>
      <h2 className="text-3xl font-semibold border-b-4 pb-1 rounded border-y-slate-400 w-min">
        Education
      </h2>
      <div className="flex flex-col gap-2">
        {store?.Qualifications?.map((ele) => {
          return (
            <div className="flex flex-col justify-start">
              <h2 className="text-2xl font-semibold text-blue-500">
                {ele?.Course}
              </h2>
              <div className="text-slate-600 font-semibold flex items-center gap-2">
                {ele?.College}
                <span className="flex items-center">
                  <FaLocationDot></FaLocationDot>
                  {ele?.location}
                </span>
              </div>
              <h4 className="text-slate-700 font-semibold">{ele?.duration}</h4>
            </div>
          );
        })}
      </div>
      <hr></hr>
      <div>
        <h1 className="text-3xl font-semibold border-b-4 pb-1 rounded border-y-slate-400 w-full">
          Professional Summary
        </h1>
        <h6 className="text-xl text-slate-600 font-bold">{store?.Summary}</h6>
      </div>
    </div>
  );
};

export default Resume;
