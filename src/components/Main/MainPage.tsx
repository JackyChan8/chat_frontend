import style from './MainPage.module.scss';

import Image from "next/image";

import { Logo } from '../Utils/Logo/Logo';
import { ButtonConnect } from '../Utils/Buttons/Buttons';

const MainPage = () => {
    return (
        <div className={style.main_page}>
            <header>
                <Logo />
                <div className={style.auth_link}>
                    <ButtonConnect />
                </div>
            </header>
            <main>
                <div className={style.welcome_block}>
                    <h1>Лучшее решение для общения. Попробуйте наш чат.</h1>
                    <p>Многие люди используют наш чат. Присоединяйся и общайся.</p>
                    <div className={style.welcome_block__btn}>
                        <ButtonConnect />
                    </div>
                </div>
                <div className={style.welcome_img}>
                    <Image src="/Main/one_image.png" width={400} height={500} alt="one_image"></Image>
                </div>
            </main>
        </div>
    )
}

export default MainPage;