import { RootState } from "../stores";

export const selectUserToken = (state: RootState) => state.user.user?.token;