"use client";
import style from "./Chat.module.scss";

import { useRef, useEffect } from "react";

// PrimeReact
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { selectDialogs } from "@/redux/chat/dialogs/selectors";
import { reqGetDialogs } from "@/redux/chat/dialogs/asyncActions";
import { selectProfile } from "@/redux/profile/selectors";
import { reqGetMyInfo } from "@/redux/profile/asyncActions";
import { addDialog } from "@/redux/chat/dialogs/slice";

// Socket
import socketChat from "@/socket/socket";

import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import PartnerInfo from "./PartnerInfo/PartnerInfo";

const Chat = () => {
  const dispatch = useAppDispatch();
  const { profile } = useSelector(selectProfile);
  const { dialogs, isLoading, currentDialogId } = useSelector(selectDialogs);

  const toast = useRef<Toast>(null);

  const showMessage = (
    severity: "success" | "info" | "warn" | "error" | undefined,
    summary: string,
    detail: string,
    life: number
  ) => {
    toast.current?.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };

  // Get Dialogs
  useEffect(() => {
    dispatch(reqGetDialogs());
  }, [dispatch]);

  // Socket
  useEffect(() => {
    // Connect to socket
    socketChat.connect();
    socketChat.on("connect_error", (err: any) => {
      if (err.message === "Invalid credentials") {
        console.log("Invalid credentials");
      }
    });

    // Notification New Message
    socketChat.on("server:new_message:notify", (message: any) => {
      if (message.userId === profile?.id) {
        showMessage("info", "", message.text, 3000);
      }
    });

    // Notification New Dialog
    socketChat.on("server:new_dialog:notify", (message: any) => {
      console.log("message: ", message);
      if (message.userId === profile?.id) {
        showMessage("info", "", "С вами создали диалог", 3000);
        dispatch(addDialog(message.dialog));
      }
    });
    return () => {
      socketChat.off("connect_error");

      // Remove Listener Notification New Message
      socketChat.removeListener("server:new_message:notify");
      // Remove Listener Notification New Dialog
      socketChat.removeListener("server:new_dialog:notify");
    };
  }, [dialogs.length]);

  // Get My Info
  useEffect(() => {
    if (!profile) {
      dispatch(reqGetMyInfo());
    }
  }, [dispatch, profile]);
  return (
    <div className={style.chat}>
      {isLoading ? (
        <div className={style.loading}>
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <Dialogs dialogs={dialogs} isLoading={isLoading} />
          <Messages currentDialogId={currentDialogId} />
          <PartnerInfo currentDialogId={currentDialogId} />
        </>
      )}
      <div>
        <Toast ref={toast} position="top-right" />
      </div>
    </div>
  );
};

export default Chat;
