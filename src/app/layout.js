import Header from "./components/Header";
import MarginY from "./components/MarginY";
import Wrapper from "./components/Wrapper";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Hygee",
  description: "website Hygee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Wrapper>
          <Header />
          <MarginY>{children}</MarginY>
        </Wrapper>
      </body>
    </html>
  );
}
