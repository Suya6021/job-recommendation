import { Inter } from "next/font/google";
import Navbar from "./(components)/Navbar";

export default function AddInfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="">
        <Navbar></Navbar>
      </div>
      <div className="w-full bg-slate-50 p-2 lg:px-32">{children}</div>
    </div>
  );
}
