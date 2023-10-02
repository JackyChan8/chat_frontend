import style from "./Dialog.module.scss";

import Image from "next/image";

import { SERVER_STORAGE } from "@/constants";
import { useAppDispatch } from "@/redux/store";
import { setCurrentDialogId } from "@/redux/chat/dialogs/slice";

type Props = {
  id: number;
  photo: string;
  firstName: string;
  lastName: string;
  lastMessage: string;
  count: number;
  isActive: boolean;
};

const Dialog = ({
  id,
  count,
  photo,
  firstName,
  lastName,
  lastMessage,
  isActive,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(setCurrentDialogId(id))}
      className={`${style.dialogs__user} ${isActive && style.dialog_active}`}
    >
      <div className={style.dialogs__user_avatar}>
        <Image src={`${SERVER_STORAGE}/${photo}`} height={50} width={50} alt="user_photo"></Image>
      </div>
      <div className={style.dialogs__user_name}>
        <p>
          {firstName} {lastName}
        </p>
        <p>{lastMessage}</p>
      </div>
      {count > 0 && (
        <div className={style.dialogs__count_messages}>
          <p>{count}</p>
        </div>
      )}
    </div>
  );
};

export default Dialog;
