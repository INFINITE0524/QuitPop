import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UUID_KEY = "userUUID";

export const anonymousLogin = async () => {
  try {
    // 先檢查本地是否已有 UUID
    const storedUUID = await AsyncStorage.getItem(UUID_KEY);
    if (storedUUID) {
      console.log("已存在的 UUID:", storedUUID);
      return { uid: storedUUID };
    }

    // 若無，則進行匿名登入
    const userCredential = await signInAnonymously(auth);
    const uid = userCredential.user.uid;

    // 存入 AsyncStorage
    await AsyncStorage.setItem(UUID_KEY, uid);
    console.log("匿名登入成功，UUID:", uid);

    return userCredential.user;
  } catch (error) {
    console.error("匿名登入失敗:", error.message);
    return null;
  }
};

export const getStoredUUID = async () => {
  return await AsyncStorage.getItem(UUID_KEY);
};
