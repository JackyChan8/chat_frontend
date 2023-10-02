import style from "./DescBlock.module.scss";

import Image from "next/image";

import { Logo } from "@/components/Utils/Logo/Logo";

type Props = {
  title: string;
  text: string;
};

const DescBlock = ({ title, text }: Props) => {
  return (
    <div className={style.left_block}>
      <Logo height={100} width={100} />
      <div className={style.logo_form}>
        <Image
          src="/Auth/image.png"
          height={394}
          width={369}
          alt="image"
        ></Image>
      </div>
      <div className={style.left_block__desc}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DescBlock;
