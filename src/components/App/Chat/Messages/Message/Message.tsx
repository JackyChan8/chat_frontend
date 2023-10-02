import style from "./Message.module.scss";

import moment from 'moment';

import Image from "next/image";

import { SERVER_STORAGE } from "@/constants";

type Props = {
  id: number;
  photo: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  text: string;
};

const MessageReceive = ({ id, photo, firstName, lastName, createdAt, text }: Props) => {
  return (
    <div className={style.messages__message_received}>
      <div className={style.message_user_avatar}>
        <Image
          src={`${SERVER_STORAGE}/${photo}`}
          alt="user_photo"
          width={33}
          height={33}
        ></Image>
      </div>
      <div className={style.message_info}>
        <div className={style.messages_message_receiver_user}>
          <p className={style.message_name}>{firstName}</p>
          <p className={style.message_created_at}>{moment(createdAt).format('LT')}</p>
        </div>
        <div className={style.message}>
          <div className={style.message_text}>
            <p>{text}</p>
          </div>
          <div className={style.message_more}>
            <button>
              <i className="pi pi-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageSend = ({ id, photo, firstName, lastName, createdAt, text }: Props) => {
  return (
    <div className={style.messages__message_send}>
      <div className={style.message_info}>
        <div className={style.messages_message_receiver_user}>
          <p className={style.message_created_at}>{moment(createdAt).format('LT')}</p>
          <p className={style.message_name}>{firstName} {lastName}</p>
        </div>
        <div className={style.message}>
          <div className={style.message_more}>
            <button>
              <i className="pi pi-ellipsis-v"></i>
            </button>
          </div>
          <div className={style.message_text}>
            <p>{text}</p>
          </div>
        </div>
      </div>
      <div className={style.message_user_avatar}>
        <Image
          src={`${SERVER_STORAGE}/${photo}`}
          alt="user_photo"
          width={33}
          height={33}
        ></Image>
      </div>
    </div>
  );
};

export { MessageReceive, MessageSend };
