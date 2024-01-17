import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SettingHeader from "./ui/SettingHeader";
import {
  ADD,
  ARROW_RIGHT,
  BG_ADD_SET_WORD,
  IC_ARROW_LEFT,
  IC_ARROW_RIGHT,
  WIDTH,
} from "../constants/Constant";
import { Entypo } from "@expo/vector-icons";

import WordCard from "./ui/WordCard";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import { fetchKeyWords, selectKeyWord } from "../redux/slices/setOfWordSlice";
import { responsiveHeight } from "react-native-responsive-dimensions";

const SetOfWords = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // when startAminationLeftRight == true , start antimation scrolleing a little bit from left to right than back to left
  const [scrollStep,setScrollStep] = useState(100)
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Dispatch the fetchAllPlayers action when the component mounts
    dispatch(fetchKeyWords());
  }, [dispatch]);

  const { words, errorMessage , keyWordSelected } = useSelector((state) => state.words);

  const scrollToLeft = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
      setScrollStep(100)
    }
  };

  const scrollToRight = () => {
    if (scrollViewRef.current) {
        let currentX = scrollViewRef.current.contentOffset ? scrollViewRef.current.contentOffset.x : 0;
      setScrollStep(scrollStep+150)
      scrollViewRef.current.scrollTo({ x: currentX + scrollStep, animated: true });
    }
  };

  return (
    <>
      <SettingHeader
        title={"Set Of Words"}
        iconLeft={ARROW_RIGHT}
        iconRight={ARROW_RIGHT}
        link={"SetOfWordsView"}
      />

      <View style={styles.container}>
        {words.length != 0 && (
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal
            scrollEventThrottle={16}
            style={styles.scrollView
            }
          >
            {words &&
              words.map((word, index) => <WordCard key={index} word={word} />)}
          </ScrollView>
        )}
        {words.length === 0 && (
          <View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                width: 100,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("SetOfWordsView")}
            >
              <Entypo name={ADD} size={24} color="white" />
              <Image
                source={BG_ADD_SET_WORD}
                style={styles.bgSetWord}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          disabled={words.length === 0 ? true : false}
          onPress={() => scrollToLeft()}
          style={[styles.icLeft, { opacity: words.length === 0 ? 0 : 100 }]}
        >
          <Image style={styles.img} source={IC_ARROW_LEFT} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={words.length === 0 ? true : false}
          onPress={() => scrollToRight()}
          style={[styles.icRight, { opacity: words.length === 0 ? 0 : 100 }]}
          >
          <Image style={styles.img} source={IC_ARROW_RIGHT} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SetOfWords;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: responsiveHeight(7),
  },
  scrollView: {
    width: WIDTH,
    height: responsiveHeight(7),
  },
  img: {
    width: WIDTH / 20,
    height: WIDTH / 10,
  },
  icLeft: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  icRight: {
    position: "absolute",
    right: 4,
    top: 10,
  },
  bgSetWord: {
    position: "absolute",
    zIndex: -1,
  },
});
