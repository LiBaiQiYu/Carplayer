import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarPlay Hub - 车载互联兼容查询",
  description: "查询车型对 CarPlay、CarLife、HiCar、ICCOA 的支持情况",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var dark = (localStorage.getItem('color-scheme') === 'dark') ||
                    (localStorage.getItem('color-scheme') !== 'light' &&
                     window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
