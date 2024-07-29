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
import { Box, Icon } from "../../atoms";
import { useStyles } from "react-native-unistyles";
import { ITEM_HEIGHT, addressListStyles } from "./AddressList.styles";
import { ListDataType } from "./AddressList.types";
import AlertAsync from "react-native-alert-async";

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
        addressId: `${i}`,
        addressLine1: "123 Jump Lane",
        addressLine2: "456",
        parish: "Kingston",
        primary: i === 2,
        // initialLeftActionState: i % 2 !== 0,
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
    // console.log("This row opened", rowKey);
  };

  const onRightActionStatusChange = (rowKey: any) => {
    // console.log("onRightActionStatusChange", rowKey);
  };

  const onRightAction = (rowKey: any) => {
    // console.log("onRightAction", rowKey);
  };

  const VisibleItem = (props: any) => {
    const {
      rowHeightAnimatedValue,
      rightActionState,
      rightActionActivated,
      data,
      onClose,
      onDelete,
    } = props;
    (async () => {
      if (rightActionActivated && rightActionState) {
        const choice = await AlertAsync(
          "Delete Address",
          `Are you sure you want to delete ${data.item.addressLine1}?`,
          [
            { text: "Yes", onPress: () => Promise.resolve("yes") },
            { text: "No, go back", onPress: () => Promise.resolve("no") },
          ],
          {
            cancelable: true,
            onDismiss: () => Promise.resolve("no"),
          },
        );

        if (choice === "yes") {
          Animated.timing(rowHeightAnimatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            onDelete();
          });
        } else if (choice === "no") {
          onClose();
        }
      }
    })();

    return (
      <Animated.View
        style={[styles.rowFront(), { height: rowHeightAnimatedValue }]}
      >
        <Box style={styles.rowFrontContent}>
          <Icon
            name="LocationIcon"
            color={data.item.primary ? theme.colors.Red700 : ""}
          />
          <Box style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {data.item.addressLine1}, {data.item.addressLine2}
            </Text>
            <Text>KGN10, Kingston, Jamaica</Text>
          </Box>
          <Icon name="EditIcon" />
        </Box>
      </Animated.View>
    );
  };

  const renderItem = (data: any, rowMap: any) => {
    const rowHeightAnimatedValue = new Animated.Value(ITEM_HEIGHT);
    return (
      <VisibleItem
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        data={data}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
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
      onClose,
      data,
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
              onPress={async () => {
                const choice = await AlertAsync(
                  `Delete Address ${data.item.addressId}`,
                  `Are you sure you want to delete ${data.item.addressLine1}?`,
                  [
                    { text: "Yes", onPress: () => Promise.resolve("yes") },
                    {
                      text: "No, go back",
                      onPress: () => Promise.resolve("no"),
                    },
                  ],
                  {
                    cancelable: true,
                    onDismiss: () => Promise.resolve("no"),
                  },
                );
                if (choice === "yes") {
                  onDelete();
                } else if (choice === "no") {
                  onClose();
                }
              }}
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
        onClose={() => closeRow(rowMap, data.item.key)}
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
        // closeOnRowPress
        // closeOnRowBeginSwipe
        // stickyHeaderHiddenOnScroll
        // stopRightSwipe={-175}
        // leftOpenValue={75}
        // leftActivationValue={200}
        // leftActionValue={0}
        // onLeftAction={onLeftAction}
        // onLeftActionStatusChange={onLeftActionStatusChange}
      />
    </View>
  );
}
