import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center p-4  px-10 bg-slate-700">
      <ul>
        <Link href={"/add-info"} className="text-white font-semibold">Add Information</Link>
      </ul>
    </div>
  );
};

export default Navbar;
