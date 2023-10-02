type Photo = {
  filename: string;
};

type Users = {
  id: number;
  firstName: string;
  lastName: string;
  photo: Photo;
};

export interface UsersSliceState {
  users: Users[];
  message: string;
  isLoading: boolean;
  statusCode: number | null;
};
