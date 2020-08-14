import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import Header from "../../components/Header";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import styles from "./styles";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  
  async function loadFavorites() {
    await AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        setFavorites(JSON.parse(response));
      }
    });
  }

  useFocusEffect(() => {
    React.useCallback(() => {
      loadFavorites();
    }, [])
  });

  return (
    <View style={styles.container}>
      <Header title="Meus Proffys Favoritos" />

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited
            />
          )
        })}
      </ScrollView>
    </View>
  );
}
