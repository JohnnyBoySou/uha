import { StyleSheet, Dimensions } from "react-native"

const DIMENSIONS = Dimensions.get("window")
export const SHEET_HEIGHT = 520
export const SHEET_OVER_DRAG = 20

export const styles = StyleSheet.create({
  container: {
    height: SHEET_HEIGHT,
    width: DIMENSIONS.width,
    backgroundColor: "#1E1F23",
    position: "absolute",
    top: -30,
    zIndex: 99,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    margin: 24,
  },
  dragIcon: {
    marginTop: 16,
    alignSelf: "center",
  },
})