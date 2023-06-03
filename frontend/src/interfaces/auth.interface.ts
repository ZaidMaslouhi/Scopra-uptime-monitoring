import { User } from "firebase/auth";

export interface UserInfo {
  id: string;
  email: string;
  password?: string;
  username?: string;
  photoURL?: string;
  phoneNumber?: string;
  defaultProject?: string;
  token?: string;
}

function toUserInfo(user: User | null): UserInfo | null {
  if (!user) return null;
  return {
    id: user.uid,
    email: user.email,
    username: user.displayName || "",
    photoURL: user.photoURL || "",
    phoneNumber: user.phoneNumber || "",
  } as UserInfo;
}

export { toUserInfo };
