// services/gameService.js
import { db } from '../firebaseConfig';
import { doc, setDoc, increment } from 'firebase/firestore';

/**
 * 點擊按鈕後更新 Firestore 的 bigBtn
 * @param {string} userId 使用者 UID
 */
export const incrementBigBtn = async (userId) => {
  const userRef = doc(db, "users", userId);
  try {
    await setDoc(userRef, {
      bigBtn: increment(1)
    }, { merge: true });

    console.log("✅ bigBtn 已增加");
  } catch (error) {
    console.error("❌ 增加 bigBtn 時出錯:", error);
  }
};
