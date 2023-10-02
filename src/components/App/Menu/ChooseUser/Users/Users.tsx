import style from "./Users.module.scss";

import { Dispatch, SetStateAction, useEffect } from "react";

// PrimeReact
import { ProgressSpinner } from "primereact/progressspinner";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { selectUsers } from "@/redux/users/selectors";
import { reqGetUsers } from "@/redux/users/asyncActions";

// Socket
import socketChat from "@/socket/socket";

import User from "./User/User";

type Props = {
  setUsers: Dispatch<SetStateAction<number | null>>;
};

const Users = ({ setUsers }: Props) => {
  // Redux
  const dispatch = useAppDispatch();
  const { users, isLoading } = useSelector(selectUsers);

  // Get Users
  useEffect(() => {
    dispatch(reqGetUsers());
  }, [dispatch]);

  // Socket
  useEffect(() => {
    // Connect Socket
    if (!socketChat.connected) {
      socketChat.connect();

      socketChat.on("connect_error", (err: any) => {
        if (err.message === "Invalid credentials") {
          console.log("Invalid credentials");
        }
      });
    }
    return () => {
      socketChat.off("connect_error");
    };
  }, []);
  return (
    <div className={style.choose_menu__users}>
      {isLoading ? (
        <div className={style.loading}>
          <ProgressSpinner />
        </div>
      ) : users.length > 0 ? (
        users.map((el) => (
          <User
            key={el.id}
            id={el.id}
            firstName={el.firstName}
            lastName={el.lastName}
            photo={el.photo ? el.photo.filename : null}
            setUsers={setUsers}
          />
        ))
      ) : (
        <h2 style={{ color: "white" }}>Пользователей Нет</h2>
      )}
    </div>
  );
};

export default Users;
