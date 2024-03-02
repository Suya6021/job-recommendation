import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center p-4  px-10 bg-white shadow-sm">
      <ul>
        <Link href={"/add-info"} className="text-black font-semibold">
          Add Information
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
