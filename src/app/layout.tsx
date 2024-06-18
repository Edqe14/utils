import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Utility - Home",
  description: "A collection of utility tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <Container>
          <Sidebar />

          <main
            style={{ gridArea: "main" }}
            className="h-screen overflow-y-auto"
          >
            {children}
          </main>
        </Container>
      </body>
    </html>
  );
}
