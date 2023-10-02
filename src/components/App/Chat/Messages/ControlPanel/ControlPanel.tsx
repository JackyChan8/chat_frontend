import style from "./ControlPanel.module.scss";

import { Dispatch, FormEvent, SetStateAction } from "react";

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  sendMessage: (e: FormEvent) => void;
};

const ControlPanel = ({ text, setText, sendMessage }: Props) => {
  return (
    <form
      onSubmit={sendMessage}
      className={style.messages__control}
    >
      <div className={style.messages__control__input}>
        <textarea
          value={text}
          placeholder="Send Message..."
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {/* <button className={style.messages_control__atach_image}>
          <i className="pi pi-paperclip"></i>
        </button> */}
        <button
          type="submit"
          disabled={!text.length && true}
          className={style.messages_control__send}
        >
          <i className="pi pi-send"></i>
        </button>
      </div>
    </form>
  );
};

export default ControlPanel;
