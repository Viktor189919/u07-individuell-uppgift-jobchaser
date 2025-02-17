"use client"

import React, { useContext } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";

export default function MainLayout({ children }: {children: React.ReactNode}) {
    
    const pathName = usePathname();

    const themeContext = useContext(ThemeContext);

    if(!themeContext) {
        throw new Error("Themecontext does not have a valid value")
    }

    const { darkTheme } = themeContext;

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@100..900&display=swap" rel="stylesheet" />
            </head>
            <body>
                <div id="root" style={darkTheme ? {backgroundColor: "black", color: "white"} : {backgroundColor: "white", color: "black"}}>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
};