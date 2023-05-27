import { User } from "firebase/auth";

interface UserInfo {
  uid: string;
  email: string;
  password?: string;
  username?: string;
  photoURL?: string;
  phoneNumber?: string;
}

function toUserInfo(user: User | null): UserInfo | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    username: user.displayName || "",
    photoURL: user.photoURL || "",
    phoneNumber: user.phoneNumber || "",
  } as UserInfo;
}

export { UserInfo, toUserInfo };
