import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Scrap",
  description: "Herramienta para hacer scraping en la industria inmobiliaria",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {children}
    </div>
  );
}
