import { SAVEUSERINFO } from "./action-type";

export const saveUserInfo = (data) => {
  return {
    type: SAVEUSERINFO,
    data: data
  };
};
