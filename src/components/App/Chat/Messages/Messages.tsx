import style from "./Messages.module.scss";

import { useEffect } from "react";

// PrimeReact
import { ProgressSpinner } from "primereact/progressspinner";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { selectProfile } from "@/redux/profile/selectors";
import { selectMessages } from "@/redux/chat/messages/selectors";
import { reqGetMessages } from "@/redux/chat/messages/asyncActions";

import BaseMessages from "./BaseMessages/BaseMessages";

type Props = {
  currentDialogId: number | null;
};

const Messages = ({ currentDialogId }: Props) => {
  const dispatch = useAppDispatch();
  const { profile } = useSelector(selectProfile);
  const { isLoading, messages, statusCode } = useSelector(selectMessages);

  useEffect(() => {
    if (currentDialogId) {
      // Get messages
      dispatch(reqGetMessages(currentDialogId));
    }
  }, [dispatch, currentDialogId]);

  return (
    <>
      {currentDialogId
      ? (
        isLoading ? <div className={style.preloader}><ProgressSpinner /></div> : messages.length > 0 && profile && (
          <BaseMessages
            currentDialogId={currentDialogId}
            messages={messages}
            userId={profile?.id}
          />
        )
      )
      : (
        <div className={style.not_choose_dialog}>
          <i className="pi pi-inbox"></i>
          <p>Выберите диалог</p>
        </div>
      )}
    </>
  )
};

export default Messages;
