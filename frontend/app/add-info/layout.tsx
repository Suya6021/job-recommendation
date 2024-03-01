import { Inter } from "next/font/google";

import Navbar from "./(components)/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <div className="">
            <Navbar></Navbar>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
