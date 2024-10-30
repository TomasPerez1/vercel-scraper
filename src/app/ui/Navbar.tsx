"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const userPaths = [
    { path: "/create-scrap", content: "Generar consulta" },
    { path: "/handle-scrap", content: "Administrar consultas" },
  ];

  return (
    <nav className="mb-8 h-[7rem] px-1 py-2 w-full border-b-2 bg-[#171717] border-secondary flex flex-row items-center gap-14">
      <img className="ml-2" src="../../../images/pp_logo1.png" />

      <span className="w-fit flex gap-14 items-center">
        {userPaths.map((userPath, index) => {
          return (
            <div
              className={`p-2 rounded-lg bg-[#252525] h-fit font-semibold uppercase  text-xl text-md ${
                pathname === userPath.path &&
                "bg-opacity-100 border-[4px] !bg-[#434343]  border-secondary"
              }`}
              key={index}
            >
              <Link className={`p-2`} href={userPath.path}>
                {userPath.content}
              </Link>
            </div>
          );
        })}
      </span>
    </nav>
  );
}
