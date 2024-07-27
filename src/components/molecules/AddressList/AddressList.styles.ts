import { createStyleSheet } from "react-native-unistyles";

export const ITEM_HEIGHT = 70;

export const addressListStyles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: theme.colors.white,
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: theme.colors.addressBtnFg,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: ITEM_HEIGHT,
    width: "100%",
    display: "flex",
  },
  rowBack: ({ leftActionActivated }) => ({
    alignItems: "center",
    // backgroundColor: ",
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "blue",
    // height: ITEM_HEIGHT,
    justifyContent: "space-between",
    paddingLeft: 15,
    backgroundColor: leftActionActivated
      ? theme.colors.Green500
      : "transparent",
  }),
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    // backgroundColor: "blue",
    width: 25,

    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: theme.colors.Red700,
    right: 0,
    // opacity: 0.8,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
}));
