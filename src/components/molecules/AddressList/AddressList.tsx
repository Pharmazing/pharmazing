import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";
import { Icon } from "../../atoms";

const ITEM_HEIGHT = 70;

export function AddressList() {
  const [listData, setListData] = useState(
    Array(12)
      .fill("")
      .map((_, i) => ({
        key: `${i}`,
        text: `item #${i}`,
        initialLeftActionState: i % 2 !== 0,
      })),
  );

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: string) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const onLeftActionStatusChange = (rowKey: any) => {
    console.log("onLeftActionStatusChange", rowKey);
  };

  const onRightActionStatusChange = (rowKey: any) => {
    console.log("onRightActionStatusChange", rowKey);
  };

  const onRightAction = (rowKey: any) => {
    console.log("onRightAction", rowKey);
  };

  const onLeftAction = (rowKey: any) => {
    console.log("onLeftAction", rowKey);
  };

  const VisibleItem = (props: any) => {
    console.log("left state", props.leftActionState);

    const {
      rowHeightAnimatedValue,
      rightActionState,
      leftActionState,
      data,
      removeRow,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[
          styles.rowFront,
          { height: rowHeightAnimatedValue },
          leftActionState && { backgroundColor: "lightgreen" },
          //   {borderWidth: 1, borderColor: 'blue'}
        ]}
      >
        <TouchableHighlight
          onPress={() => console.log("You touched me")}
          style={styles.rowFront}
          // color when pressed
          underlayColor={"#AAA"}
        >
          <View>
            <Text>I am {data.item.text} in a SwipeListView</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data: { item: { key: any } }, rowMap: any) => {
    const rowHeightAnimatedValue = new Animated.Value(ITEM_HEIGHT);
    return (
      <VisibleItem
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        data={data}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = (props: any) => {
    const {
      leftActionActivated,
      rightActionActivated,
      swipeAnimatedValue,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[
          styles.rowBack,
          { height: rowHeightAnimatedValue },
          leftActionActivated && { backgroundColor: "#72AE68" },
        ]}
      >
        {!rightActionActivated && (
          <Text style={{ width: 75 }}>Make Primary</Text>
        )}
        {/* {!leftActionActivated && (
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={onClose}
                    >
                        <Text style={styles.backTextWhite}>Closed</Text>
                    </TouchableOpacity>
                )} */}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              { width: rowActionAnimatedValue },
            ]}
          >
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}
            >
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-70, -15],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Icon name="TrashIcon" color={"#fff"} />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(ITEM_HEIGHT);
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        onRowDidOpen={onRowDidOpen}
        leftOpenValue={75}
        rightOpenValue={-75}
        leftActivationValue={200}
        rightActivationValue={-250}
        leftActionValue={0}
        rightActionValue={-400}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: ITEM_HEIGHT,
    width: "100%",
    display: "flex",
  },
  rowBack: {
    alignItems: "center",
    // backgroundColor: ",
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "blue",
    // height: ITEM_HEIGHT,
    justifyContent: "space-between",
    paddingLeft: 15,
  },
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
    backgroundColor: "#B00000",
    right: 0,
    // opacity: 0.8,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
});
