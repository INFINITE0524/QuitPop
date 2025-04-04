import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { incrementBigBtn } from '../services/gameService';
import { getUserData } from '../services/firestoreService';

export default function HomeScreen({ user }) {
  const [bigBtn, setBigBtn] = useState(0);

  // 初始載入 bigBtn 數值
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        setBigBtn(data?.bigBtn || 0);
      }
    };
    fetchData();
  }, [user]);

  // 按下按鈕後遞增並更新顯示
  const handlePress = async () => {
    if (user) {
      await incrementBigBtn(user.uid);
      const updatedData = await getUserData(user.uid); // 重新取得最新數據
      setBigBtn(updatedData?.bigBtn || 0); // 更新畫面
      Alert.alert('🎉 成功！', '戳戳樂 +1');
    } else {
      Alert.alert('⚠️ 錯誤', '找不到使用者');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>歡迎來到 QuitPop！</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>目前已戳：{bigBtn} 次</Text>
      <Button title="開始戳戳樂" onPress={handlePress} />
    </View>
  );
}
