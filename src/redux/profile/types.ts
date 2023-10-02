type Photo = {
  filename: string;
};

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  photo: Photo;
};

export interface ProfileSliceState {
  profile: Profile | null;
  message: string;
  isLoading: boolean;
  statusCode: number | null;
}
