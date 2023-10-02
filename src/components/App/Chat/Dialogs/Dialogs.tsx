import style from './Dialogs.module.scss';

// PrimeReact
import { ProgressSpinner } from "primereact/progressspinner";

// Redux
import { Dialog as DialogType } from "@/redux/chat/dialogs/types";

import BaseDialogs from "./BaseDialogs/BaseDialogs";


type Props = {
  dialogs: Array<DialogType>;
  isLoading: boolean;
};

const Dialogs = ({ dialogs, isLoading }: Props) => {
  return isLoading
    ? <ProgressSpinner />
    : dialogs.length ? <BaseDialogs /> : <p className={style.withoutDialogs}>У вас нет диалогов</p>
};

export default Dialogs;
