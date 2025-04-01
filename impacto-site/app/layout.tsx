import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { defaultSEO } from "@/utils/seo";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap", // Optimize font loading
  fallback: ["system-ui", "sans-serif"], // Fallback fonts
  preload: true, // Preload font files
});

export const metadata: Metadata = {
  metadataBase: new URL('https://impactoautomation.com'),
  title: {
    template: "%s | Impacto Automation AI",
    default: defaultSEO.title,
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: defaultSEO.icons,
  openGraph: {
    ...defaultSEO.openGraph,
    title: {
      template: "%s | Impacto Automation AI",
      default: defaultSEO.title,
    },
    description: defaultSEO.description,
  },
  twitter: defaultSEO.twitter,
  authors: [{ name: "Impacto Team" }],
  creator: "Impacto Automation AI",
  publisher: "Impacto Automation AI",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: "Technology",
  other: {
    "google-site-verification": "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        {/* Add DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Add preconnect for external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col w-full max-w-full overflow-x-hidden`}>
        <Navbar />
        <main className="flex-grow w-full max-w-full">
          {children}
        </main>
        <Footer />
        
        {/* Google Analytics script will be added when you have a valid ID */}
        {/* Uncomment and replace 'G-XXXXXXXXXX' with your actual ID when ready */}
        {/*
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        */}
      </body>
    </html>
  );
}
