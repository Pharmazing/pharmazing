import { createStyleSheet } from "react-native-unistyles";

export const ITEM_HEIGHT = 70;

export const addressListStyles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  backTextWhite: {
    color: theme.colors.white,
  },
  rowFrontContent: {
    gap: theme.size.margin.lg,
    // borderWidth: 1,
    // borderColor: 'blue',
    height: "100%",
    width: "100%",
    padding: theme.size.margin.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  rowFront: (/*{ leftActionState }: { leftActionState?: boolean }*/) => ({
    alignItems: "center",

    backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: 'red',
    // borderBottomColor: theme.colors.Gray200,
    // borderBottomWidth: 1,
    justifyContent: "center",
    height: ITEM_HEIGHT,
    width: "100%",
    display: "flex",
  }),
  rowBack: (/*{ leftActionActivated }*/) => ({
    alignItems: "center",
    // backgroundColor: ",
    flex: 1,
    flexDirection: "row",
    // height: ITEM_HEIGHT,
    justifyContent: "space-between",
    paddingLeft: 15,
    // backgroundColor: leftActionActivated
    //   ? theme.colors.Green500
    //   : "transparent",
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
  // backRightBtnLeft: {
  //   backgroundColor: "blue",
  //   right: 75,
  // },
  backRightBtnRight: {
    backgroundColor: theme.colors.Red700,
    right: 0,
    // opacity: 0.8,
  },
  trash: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
}));
