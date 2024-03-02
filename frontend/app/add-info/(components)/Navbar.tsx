import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-400  sticky top-0 h-[100vh] min-w-[16rem] flex flex-col gap-4 p-8">
      <h2 className="text-xl text-black font-semibold">Job Recommendation</h2>
      <ul className="flex flex-col gap-4">
        <Link href={"/add-info/"}>Basic info</Link>
        <Link href={"/add-info/Experience"}>Experience</Link>
        <Link href={"/add-info/Qualifications"}>Qualifications</Link>
        <Link href={"/add-info/Projects"}>Projects</Link>
        <Link href={"/add-info/Contact"}>Contact</Link>
      </ul>
    </div>
  );
};

export default Navbar;
