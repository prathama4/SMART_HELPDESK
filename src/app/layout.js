import "./globals.css";
import Navbar from "./components/Navbar"; // ✅ THIS IS CORRECT

export const metadata = {
  title: "Smart IT Helpdesk",
  description: "College IT Helpdesk Ticketing System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
