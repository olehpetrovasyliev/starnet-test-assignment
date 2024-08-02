import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "@xyflow/react/dist/style.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend test assignment",
  description:
    "Test assignment for applying on frontend developer position to Star Navy company",
};

const starJedi = localFont({
  src: [
    {
      path: "../../public/fonts/StarJedi.woff2",
      weight: "700",
    },
  ],
  variable: "--font-jedi",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${starJedi.variable} h-max bg-hero-bg bg-cover bg-center bg-fixed`}
      >
        {children}
      </body>
    </html>
  );
}
