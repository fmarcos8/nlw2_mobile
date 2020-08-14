import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import ladingImg from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";

import styles from "./styles";
import api from "../../services/api";

export default function Landing() {
  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("/connections").then((response: any) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  function handleNavigateToGiveClassesPage() {
    navigate("GiveClasses");
  }

  function handleNavigateToStudyPages() {
    navigate("Study");
  }

  return (
    <View style={styles.container}>
      <Image source={ladingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {"\n"}
        <Text style={styles.titleBold}>O que deseja fazer ?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de{" "}
        {totalConnections > 1 || totalConnections == 0
          ? `${totalConnections} Conexões ja Realizadas`
          : `${totalConnections} Conxão Realizada`}{" "}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}
