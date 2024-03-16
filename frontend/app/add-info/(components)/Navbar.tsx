"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { twJoin } from "tailwind-merge";

const Navbar = () => {
  let path = usePathname();
  // console.log(path);
  return (
    <div className=" bg-white rounded-md  sticky top-0 h-[100vh] lg:min-w-[24rem] flex flex-col gap-8 p-8">
      <h2 className="text-3xl text-black font-bold border-b-2 border-slate-700 pb-1">
        Resume Builder
      </h2>
      <ul className="flex flex-col gap-4">
        <Link
          href={"/add-info"}
          className={twJoin("nav-items ", path == "/add-info" && "selected")}
        >
          Basic info
        </Link>
        <Link
          className={twJoin(
            "nav-items ",
            path == "/add-info/Experience" && "selected"
          )}
          href={"/add-info/Experience"}
        >
          Experience
        </Link>
        <Link
          className={twJoin(
            "nav-items ",
            path == "/add-info/Qualifications" && "selected"
          )}
          href={"/add-info/Qualifications"}
        >
          Qualifications
        </Link>
        <Link
          className={twJoin(
            "nav-items ",
            path == "/add-info/Projects" && "selected"
          )}
          href={"/add-info/Projects"}
        >
          Projects
        </Link>
        <Link
          className={twJoin(
            "nav-items ",
            path == "/add-info/Contact" && "selected"
          )}
          href={"/add-info/Contact"}
        >
          Contact
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
