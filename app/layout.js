import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "SafeCheck",
  description: "Controllo sicurezza in 2 minuti per freelance e piccoli business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}