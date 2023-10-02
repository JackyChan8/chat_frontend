"use client";
import style from './ChooseUser.module.scss';

import { useRef, useState, useEffect } from "react";

// PrimeReact
import { Toast } from "primereact/toast";

// Redux
import { useSelector } from 'react-redux';
import { selectProfile } from "@/redux/profile/selectors";
import { reqGetMyInfo } from '@/redux/profile/asyncActions';
import { selectDialogs } from '@/redux/chat/dialogs/selectors';

// Socket
import socketChat from '@/socket/socket';
import { useAppDispatch } from '@/redux/store';
import { addDialog } from '@/redux/chat/dialogs/slice';

import Users from './Users/Users';

const ChooseUser = () => {
    const [user, setUsers] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const { statusCode, message } = useSelector(selectDialogs);
    const { profile } = useSelector(selectProfile);
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

    useEffect(() => {
        if (statusCode === 201 && message  === "Dialog successfully create") {
          showMessage("success", "Успех", "Диалог успешно создан", 4000);

          // Send Notify Partner
          socketChat.emit('dialog:create:notify', {
            authorId: profile?.id,
            partnerId: user,
          });
        }
      }, [statusCode]);
    
    // Get My Info
    useEffect(() => {
      if (!profile) {
        dispatch(reqGetMyInfo());
      }
    }, [dispatch, profile]);

    useEffect(() => {
      // Notification New Message
      socketChat.on("server:new_message:notify", (message: any) => {
        if (message.userId === profile?.id) {
          showMessage('info', '', 'Пришло сообщение', 3000);
        }
      });

      // Notification New Dialog
      socketChat.on("server:new_dialog:notify", (message: any) => {
        if (message.userId === profile?.id) {
          showMessage('info', '', 'С вами создали диалог', 3000);
          dispatch(addDialog(message.dialog));
        }
      })

      return () => {
        // Remove Listener Notification New Message
        socketChat.removeListener("server:new_message:notify");
        // Remove Listener Notification New Dialog
        socketChat.removeListener("server:new_dialog:notify");
      };
    }, [profile])
    return (
        <div className={style.choose_menu}>
            <h1>Пользователи</h1>
            <Users setUsers={setUsers} />
            <div>
                <Toast ref={toast} position="top-right" />
            </div>
        </div>
    )
}

export default ChooseUser;