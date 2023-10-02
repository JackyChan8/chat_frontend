type Photos = {
  filename: string;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  photo: Photos;
};

export type Dialog = {
  id: number;
  lastMessage: string;
  author: User;
  partner: User;
  unreadCount: number;
};

export interface DialogsSliceState {
  dialogs: Array<Dialog>;
  message: string;
  isLoading: boolean;
  currentDialogId: number | null;
  statusCode: number | null;
}

export type DialogUpdateLastMessage = {
  text: string;
  dialogId: number;
}
