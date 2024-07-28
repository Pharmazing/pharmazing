import React, { useEffect, useState } from "react";
import {
  Text,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";
import { Icon } from "../../atoms";
import { useStyles } from "react-native-unistyles";
import { ITEM_HEIGHT, addressListStyles } from "./AddressList.styles";
import { ListDataType } from "./AddressList.types";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export function AddressList() {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  }, []);

  const { styles, theme } = useStyles(addressListStyles);
  const [listData, setListData] = useState<ListDataType>(
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

  // const onLeftActionStatusChange = (rowKey: any) => {
  //   console.log("onLeftActionStatusChange", rowKey);
  // };

  const onRightActionStatusChange = (rowKey: any) => {
    console.log("onRightActionStatusChange", rowKey);
  };

  const onRightAction = (rowKey: any) => {
    console.log("onRightAction", rowKey);
  };

  // const onLeftAction = (rowKey: any) => {
  //   console.log("onLeftAction", rowKey);
  // };

  const VisibleItem = (props: any) => {
    console.log("left state", props.leftActionState);

    const {
      rowHeightAnimatedValue,
      rightActionState,
      // leftActionState,
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
        style={[styles.rowFront(), { height: rowHeightAnimatedValue }]}
      >
        <TouchableHighlight
          onPress={() => console.log("You touched me")}
          style={styles.rowFront()}
          // color when pressed
          underlayColor={theme.colors.white}
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
      // leftActionActivated,
      rightActionActivated,
      swipeAnimatedValue,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      // onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: dimensions.window.width,
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
        style={[styles.rowBack(), { height: rowHeightAnimatedValue }]}
      >
        {/* {!rightActionActivated && (
          <Text style={{ width: 75 }}>Make Primary</Text>
        )} */}
        {/* {!leftActionActivated && (
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={onClose}
                    >
                        <Text style={styles.backTextWhite}>Closed</Text>
                    </TouchableOpacity>
                )} */}
        {
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
                <Icon name="TrashIcon" color={theme.colors.white} />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        }
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
        // onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        onRowDidOpen={onRowDidOpen}
        rightOpenValue={-75}
        rightActivationValue={-250}
        rightActionValue={-400}
        onRightAction={onRightAction}
        onRightActionStatusChange={onRightActionStatusChange}
        // leftOpenValue={75}
        // leftActivationValue={200}
        // leftActionValue={0}
        // onLeftAction={onLeftAction}
        // onLeftActionStatusChange={onLeftActionStatusChange}
      />
    </View>
  );
}
