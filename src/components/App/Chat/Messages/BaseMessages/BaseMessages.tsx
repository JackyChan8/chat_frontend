import style from "./BaseMessages.module.scss";

import { useRef, useState, useEffect, FormEvent } from "react";

// Redux
import { useAppDispatch } from "@/redux/store";
import { Message } from "@/redux/chat/messages/types";
import { addMessage } from "@/redux/chat/messages/slice";
import { changeLastMessage, incrementCountMessages, setCountMessagesZero } from "@/redux/chat/dialogs/slice";

// Socket
import socketChat from "@/socket/socket";

import ControlPanel from "../ControlPanel/ControlPanel";
import { MessageReceive, MessageSend } from "../Message/Message";

type ChangeReadMessageChat = {
  userId: number;
  dialogId: number;
}

type Props = {
  currentDialogId: number | null;
  userId: number;
  messages: Array<Message>;
};

const BaseMessages = ({ currentDialogId, userId, messages }: Props) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    // Send Message
    const payload = { authorId: userId, dialogId: currentDialogId, text: text };
    socketChat.emit("message:post", payload);
    setText("");
  };

  useEffect(() => {
    // Get New Message
    socketChat.on(
      "server:new_message",
      (message: any) => {
        if (message.dialog.dialogId === currentDialogId) {
          // Add new Message in Redux
          dispatch(addMessage(message.message));
          // Change LastMessage
          dispatch(
            changeLastMessage({
              dialogId: message.dialog.dialogId,
              text: message.message.text,
            })
          );

          // Change Read Status All Messages in Dialog
          socketChat.emit("messages:read", {
            dialogId: currentDialogId,
            userId: userId,
          })
        } else {
          // Check My Id in dialog
          const authorId = message.dialog.authorId;
          const partnerId = message.dialog.partnerId;
          if (authorId === userId || partnerId === userId) {
            // Change LastMessage
            dispatch(
              changeLastMessage({
                dialogId: message.dialog.dialogId,
                text: message.message.text,
              })
            );
            // Change Count Messages
            dispatch(incrementCountMessages(message.dialog.dialogId))
          }
        }
      },
    );

    socketChat.on("server:read_message", (message: ChangeReadMessageChat) => {
      if (message.userId === userId) {
        // Change Count Messages Redux
        dispatch(
          setCountMessagesZero(message.dialogId)
        );
      }
    });

    return () => {
      socketChat.removeListener("server:new_message");
      socketChat.removeListener("server:read_message");
    };
  }, []);

  // Scroll Down Messages and Change Read Status
  let mainContentRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 999999);
      // Change Read Status All Messages in Dialog
      socketChat.emit("messages:read", {
        dialogId: currentDialogId,
        userId: userId,
      })
      // Change Count Messages Redux
      dispatch(
        setCountMessagesZero(currentDialogId)
      );
    }
    return () => {
      mainContentRef.current = null;
    };
  }, [currentDialogId, messages.length])
  return (
    <div className={style.messages}>
      <div className={style.messages__block} ref={mainContentRef}>
        {messages.map((el: Message) =>
          el.author.id === userId ? (
            <MessageSend
              key={el.id}
              id={el.id}
              firstName={el.author.firstName}
              lastName={el.author.lastName}
              text={el.text}
              createdAt={el.created_at}
              photo={el.author.photo.filename}
            />
          ) : (
            <MessageReceive
              key={el.id}
              id={el.id}
              firstName={el.author.firstName}
              lastName={el.author.lastName}
              text={el.text}
              createdAt={el.created_at}
              photo={el.author.photo.filename}
            />
          )
        )}
      </div>
      <ControlPanel text={text} setText={setText} sendMessage={sendMessage} />
    </div>
  );
};

export default BaseMessages;
