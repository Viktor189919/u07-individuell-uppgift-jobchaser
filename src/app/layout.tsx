import MainLayout from "@/components/MainLayout";
import ThemeProvider from "@/context/ThemeContext";
import AuthorizedProvider from "@/context/AuthorizedContext";
import UserNameProvider from "@/context/UserNameContext";
import "@/styles/globals.css";

export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
       
        <ThemeProvider>
        <UserNameProvider>
            <AuthorizedProvider>
                <MainLayout>{children}</MainLayout>
            </AuthorizedProvider>
        </UserNameProvider>
        </ThemeProvider>

    )
}