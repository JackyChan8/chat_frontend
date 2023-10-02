import Link from "next/link";

import style from "./Buttons.module.scss";

export const ButtonConnect = () => {
  return (
    <Link href='auth/signin'>
      <button className={style.btn_connect}>
        Присоединиться
      </button>
    </Link>
  )
};

