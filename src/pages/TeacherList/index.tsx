import React, { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import Header from "../../components/Header";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons"

import styles from "./styles";
import api from "../../services/api";

export default function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function handleFilterSubmit() {
    loadFavorites();

    api
      .get("/classes", {
        params: {
          subject,
          week_day,
          time,
        }
      })
      .then(({ data }) => {
        setTeachers(data);
        setIsFiltersVisible(false);
      });
  }

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const teachersFavoritedIds = JSON.parse(response).map((teacher: Teacher) => {
          return teacher.id;
        })
        setFavorites(teachersFavoritedIds);
      }
    })
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Proffys Disponíveis" 
        headerRight={(
          <BorderlessButton onPress={() => {
            setIsFiltersVisible(!isFiltersVisible)
          }}>
            <Feather name="filter" size={20} color="#fff"/>
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matérias</Text>
            <TextInput
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria ?"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia ?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário ?"
                />
              </View>
            </View>
            <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </Header>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}
