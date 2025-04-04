import { db } from '../firebaseConfig';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * 將使用者資料存入 Firestore
 * @param {string} userId 使用者的 UUID
 */
export const saveUserData = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      
      // 先檢查文件是否存在
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        // 如果是新用戶，設置 createdAt
        await setDoc(userRef, {
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          bigBtn: 0,
        });
      } else {
        // 如果是既有用戶，只更新 lastLogin
        await setDoc(userRef, {
          lastLogin: new Date().toISOString(),
        }, { merge: true });
      }
      
      console.log("✅ 使用者資料已儲存:", userId);
    } catch (error) {
      console.error("❌ 儲存使用者資料時發生錯誤:", error);
    }
  };
/**
 * 取得 Firestore 內的使用者資料
 * @param {string} userId 使用者的 UUID
 * @returns {Object|null} 使用者資料
 */
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      console.log("📄 使用者資料:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("⚠️ 使用者資料不存在");
      return null;
    }
  } catch (error) {
    console.error("❌ 讀取使用者資料時發生錯誤:", error);
    return null;
  }
};
