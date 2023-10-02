import style from './Header.module.scss';

import { Logo } from '@/components/Utils/Logo/Logo';

import AvatarUser from './Avatar/Avatar';
import BadgeNotify from './Badge/BadgeNotify';

const Header = () => {
    return (
        <header className={style.header}>
            <Logo />
            <div className={style.block_user}>
                {/* <BadgeNotify /> */}
                <AvatarUser />
            </div>
        </header>
    )
}

export default Header;