import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faGamepad, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { View, Text, ActivityIndicator } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import StatsScreen from './screens/StatsScreen';
import { anonymousLogin } from './services/authService';
import { saveUserData, getUserData } from './services/firestoreService';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // 存放 Firestore 內的資料

  useEffect(() => {
    const login = async () => {
      const loggedInUser = await anonymousLogin();
      setUser(loggedInUser);
      
      if (loggedInUser) {
        // 儲存或更新 Firestore 內的使用者資料
        await saveUserData(loggedInUser.uid);

        // 從 Firestore 讀取使用者資料
        const data = await getUserData(loggedInUser.uid);
        setUserData(data);
      }

      setLoading(false);
    };
    login();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            if (route.name === 'Collection') {
              icon = faBook;
            } else if (route.name === 'Home') {
              icon = faGamepad;
            } else if (route.name === 'Stats') {
              icon = faChartBar;
            }
            return <FontAwesomeIcon icon={icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Collection" component={CollectionScreen} options={{ title: '收集冊' }} />
        <Tab.Screen name="Home" options={{ title: '戳戳樂' }}>
          {() => <HomeScreen user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Stats" component={StatsScreen} options={{ title: '統計' }} />
      </Tab.Navigator>

      {/* 顯示 UUID 與 Firestore 內的使用者資訊 */}
      <View style={{ alignItems: 'center', padding: 10 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <>
            <Text>UUID: {user.uid}</Text>
            <Text>Firestore 創建時間: {userData?.createdAt}</Text>
          </>
        )}
      </View>
    </NavigationContainer>
  );
}
