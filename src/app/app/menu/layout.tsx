import style from '@/components/App/Menu/Main.module.scss';
import Header from "@/components/App/Menu/Header/Header";
import Navbar from "@/components/App/Menu/Navbar/Navbar";

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={style.app_block}>
            <Header />
            <Navbar />
            {children}
        </div>
    )
};