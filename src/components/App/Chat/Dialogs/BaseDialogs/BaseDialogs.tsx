import style from "./BaseDialogs.module.scss";

import { useEffect } from "react";

import Dialog from "../Dialog/Dialog";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { selectProfile } from "@/redux/profile/selectors";
import {
  changeLastMessage,
  incrementCountMessages,
} from "@/redux/chat/dialogs/slice";

// Socket
import socketChat from "@/socket/socket";
import { selectDialogs } from "@/redux/chat/dialogs/selectors";

const BaseDialogs = () => {
  const dispatch = useAppDispatch();
  const { profile } = useSelector(selectProfile);
  const { dialogs, currentDialogId } = useSelector(selectDialogs);

  console.log('profile: ', profile);
  console.log('dialogs: ', dialogs);

  useEffect(() => {
    // Get New Message
    socketChat.on("server:new_message", (message: any) => {
      if (
        profile?.id === message.dialog.authorId ||
        profile?.id === message.dialog.partnerId
      ) {
        // Change LastMessage
        dispatch(
          changeLastMessage({
            dialogId: message.dialog.dialogId,
            text: message.message.text,
          })
        );
        // Change Count Messages
        dispatch(incrementCountMessages(message.dialog.dialogId));
      }
    });

    return () => {
      socketChat.removeListener("server:new_message");
    };
  }, []);
  return (
    <div className={style.dialogs}>
      <div className={style.dialogs__title}>
        <h2>Диалоги</h2>
        <div className={style.dialogs__search}>
          <li className="pi pi-search"></li>
          <input type="text" placeholder="Поиск.." />
        </div>
        <div className={style.dialogs__users}>
          {dialogs.length && profile  ?
            dialogs.map((el) =>
              el.author.id === profile.id ? (
                <Dialog
                  key={el.id}
                  id={el.id}
                  count={el.unreadCount}
                  firstName={el.partner.firstName}
                  lastName={el.partner.lastName}
                  lastMessage={el.lastMessage}
                  photo={el.partner.photo.filename}
                  isActive={el.id === currentDialogId}
                />
              ) : (
                <Dialog
                  key={el.id}
                  id={el.id}
                  count={el.unreadCount}
                  firstName={el.author.firstName}
                  lastName={el.author.lastName}
                  lastMessage={el.lastMessage}
                  photo={el.author.photo.filename}
                  isActive={el.id === currentDialogId}
                />
              )
            ) : <h1>Empty</h1>}
        </div>
      </div>
    </div>
  );
};

export default BaseDialogs;
