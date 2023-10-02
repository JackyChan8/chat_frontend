type Photos = {
  filename: string;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  photo: Photos;
};

export type Message = {
  id: number;
  text: string;
  author: User;
  created_at: Date;
};

export interface MessagesSliceState {
  messages: Array<Message>;
  message: string;
  isLoading: boolean;
  statusCode: number | null;
}
