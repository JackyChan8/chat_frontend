import style from "./Logo.module.scss";

import Image from "next/image";

type Props = {
  height?: number;
  width?: number;
};

export const Logo = ({ height = 60, width = 60 }: Props) => {
  return (
    <div className={style.logo}>
      <Image
        src="/Main/logo.svg"
        width={width}
        height={height}
        alt="logo"
      ></Image>
    </div>
  );
};
