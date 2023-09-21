import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "📚 MiduBooks",
  description: "Los libros de midu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="px-4 m-auto max-w-screen-lg grid min-h-screen grid-rows-[60px,1fr,60px] gap-4">
          <nav className="flex items-center text-2xl">📚 MiduBooks</nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center gap-[6px]">
            With <span className="text-red-600">❤</span> for
            <a
              className="unset gradient-link tracking-wider font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#11c7f5] to-[#1f98c9] hover:after:bg-gradient-to-r hover:after:from-[#2a7192] hover:after:to-[#4fb2b9]"
              href="https://github.com/Cachilox"
              target="_blank"
            >
              {" "}
              @Cachilo
            </a>
          </footer>
        </main>
      </body>
    </html>
  );
}
