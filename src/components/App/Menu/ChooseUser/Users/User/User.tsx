import style from "./User.module.scss";

import { Dispatch, SetStateAction } from "react";

import Image from "next/image";

// Redux
import { useAppDispatch } from "@/redux/store";
import { deleteUser } from "@/redux/users/slice";
import { reqCreateDialog } from "@/redux/chat/dialogs/asyncActions";

import { SERVER_STORAGE } from "@/constants";

type Props = {
  id: number;
  firstName: string;
  lastName: string;
  photo: string | null;
  setUsers: Dispatch<SetStateAction<number | null>>;
};

const User = ({ id, firstName, lastName, photo, setUsers }: Props) => {
  const dispatch = useAppDispatch();

  const createDialog = (partnerId: number) => {
    // Create Dialog
    dispatch(
      reqCreateDialog({
        partnerId: partnerId,
      })
    );
    // Delete User
    dispatch(deleteUser(partnerId));

    setUsers(id);
  };

  return (
    <div className={style.user}>
      <Image
        src={photo ? `${SERVER_STORAGE}/${photo}` : '/App/Menu/Header/avatar.png'}
        alt="photo"
        height={150}
        width={150}
      ></Image>
      <button className={style.create_dialog} onClick={() => createDialog(id)}>
        <li className="pi pi-plus-circle"></li>
      </button>
      <h2>{firstName}</h2>
      <h3>{lastName}</h3>
    </div>
  );
};

export default User;
