import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { HEIGHT, WIDTH, orange_color } from "../constants/Constant";

export const globalStyles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {
    width: WIDTH,
    height: HEIGHT,
    position: "absolute",
    zIndex: 0,
    top: 0,
    left: 0,
  },
  titleButton: {
    color: "#ffffff",
    fontSize: responsiveFontSize(2.6),
    fontWeight: "bold",
  },
  title: {
    fontSize: responsiveFontSize(2.6),
    color: "#FFF",
    fontWeight: "bold",
  },
  largeTitle: {
    fontSize: responsiveFontSize(3.2),
    color: "#FFF",
    fontWeight: "400",
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: responsiveFontSize(1.8),
    color: "#FFF",
    fontWeight: "bold",
  },
  buttonStart: {
    width: responsiveWidth(68),
    height: responsiveHeight(8),
    backgroundColor: orange_color,
    color: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  errorTextStyle: {
    color: orange_color,
  },
  timerStyle: {
    fontSize: 43,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    marginVertical: 16,
  },
});
