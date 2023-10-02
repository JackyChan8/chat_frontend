type Partner = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
};

export interface PartnerSliceState {
  partner: Partner | null;
  message: string;
  isLoading: boolean;
  statusCode: number | null;
};
