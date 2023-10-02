import style from './Navbar.module.scss';

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={style.nav}>
            <Link href="menu">
                <li
                    className={`pi pi-home ${style.link}`}
                ></li>
            </Link>
            <Link href="chat">
                <li
                    className={`pi pi-envelope ${style.link}`}
                ></li>
            </Link>
        </nav>
    )
}

export default Navbar;