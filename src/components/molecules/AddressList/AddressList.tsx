import React, { useEffect, useRef, useState } from 'react';
import { Animated, ListRenderItemInfo, TouchableOpacity } from 'react-native';

import { RowMap, SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Box, Icon, Typography } from '../../atoms';
import { useStyles } from 'react-native-unistyles';
import { ITEM_HEIGHT, addressListStyles } from './AddressList.styles';
import { AddressListProps, ListDataType } from './AddressList.types';
import AlertAsync from 'react-native-alert-async';
import { useDimensions } from '../../../utils';
import { useUser } from '../../../utils/context';

const LEFT_SWIPE_THRESHOLD = -75;
const RIGHT_ACTION_ACTIVATION_THRESHOLD = -250;
const RIGHT_ACTION_FULL_WIDTH = -700;

export function AddressList({
  openEditModal,
  editModalOpen,
  onDeleteAddress,
}: AddressListProps) {
  const { dimensions } = useDimensions();
  const { address } = useUser();
  const open = useRef(false);
  const { styles, theme } = useStyles(addressListStyles);
  const loadAddresses = () =>
    address?.map(
      (
        {
          addressLine1,
          addressLine2,
          addressId,
          city,
          country,
          zip,
          parish,
          primary,
          latitude,
          longitude,
        }: any,
        i: number
      ) => ({
        key: `${i}`,
        addressId,
        addressLine1,
        addressLine2,
        parish,
        primary,
        city,
        country,
        zip,
        latitude,
        longitude,
      })
    );
  const [listData, setListData] = useState<ListDataType[]>(
    loadAddresses() as ListDataType[]
  );

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  useEffect(() => {
    setListData(loadAddresses() as ListDataType[]);
  }, [address]);

  const deleteRow = async (rowMap: any, rowKey: any, id: string) => {
    // i want to move the async behavior for deleting to this fn entirely, animations hooked up to the success
    // delete address from local state only once the mutation is successful
    const { data } = await onDeleteAddress(id);
    if (!data?.deleteAddress?.success) {
      return false;
    }
    closeRow(rowMap, rowKey);
    return data;
  };

  const onRightActionStatusChange = (rowKey: any) => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = (rowKey: any, rowMap: any) => {
    console.log('onRightAction', rowKey, rowMap);
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
      if (rightActionState && rightActionActivated && !open.current) {
        open.current = true;
        const choice = await AlertAsync(
          'Delete Address',
          `Are you sure you want to delete ${data.item.addressLine1}?`,
          [
            {
              text: 'Yes',
              onPress: () => Promise.resolve('yes'),
            },
            {
              text: 'No, go back',
              onPress: () => Promise.resolve('no'),
            },
          ],
          {
            cancelable: true,
            onDismiss: () => Promise.resolve('no'),
          }
        );
        if (choice === 'yes') {
          const result = await onDelete();
          if (result) {
            Animated.timing(rowHeightAnimatedValue, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          } else {
            onClose();
          }
        } else if (choice === 'no') {
          onClose();
        }
        open.current = false;
      }
    })();

    return (
      <Animated.View
        style={[styles.rowFront(), { height: rowHeightAnimatedValue }]}
      >
        <Box style={styles.rowFrontContent}>
          <Icon
            onPress={() => {
              console.warn('LocationIcon pressed', data.item);
            }}
            name="LocationIcon"
            color={data.item.primary ? theme.colors.Red700 : ''}
          />
          <Box style={{ flex: 1, gap: theme.size.layout.sm }}>
            <Typography size="md" weight="500">
              {`${data.item.addressLine1}${data.item.addressLine2 ? `, ${data.item.addressLine2}` : ''}`}
            </Typography>
            <Typography size="sm" style={{ opacity: 0.8 }}>
              {`${data.item.city ? `${data.item.city}` : ''}${data.item.parish ? `, ${data.item.parish}` : ''}${data.item.zip ? `, ${data.item.zip}` : ''}${data.item.country ? `, ${data.item.country}` : ''}`}
            </Typography>
          </Box>
          <TouchableOpacity
            onPress={() => {
              openEditModal(data);
            }}
          >
            <Icon name="EditIcon" />
          </TouchableOpacity>
        </Box>
      </Animated.View>
    );
  };

  const renderItem = (
    data: ListRenderItemInfo<ListDataType>,
    rowMap: RowMap<ListDataType>,
    rowHeightAnimatedValue: Animated.Value
  ) => {
    return (
      <VisibleItem
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        data={data}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={async () =>
          await deleteRow(rowMap, data.item.key, data?.item.addressId)
        }
      />
    );
  };

  const HiddenItemWithActions = (props: any) => {
    const {
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
                  'Delete Address',
                  `Are you sure you want to delete ${data.item.addressLine1}?`,
                  [
                    {
                      text: 'Yes',
                      onPress: () => Promise.resolve('yes'),
                    },
                    {
                      text: 'No, go back',
                      onPress: () => Promise.resolve('no'),
                    },
                  ],
                  {
                    cancelable: true,
                    onDismiss: () => Promise.resolve('no'),
                  }
                );
                if (choice === 'yes') {
                  const result = await onDelete();
                  if (result) {
                    Animated.timing(rowHeightAnimatedValue, {
                      toValue: 0,
                      duration: 200,
                      useNativeDriver: false,
                    }).start(() => {
                      // onDelete();
                    });
                  } else {
                    onClose();
                  }
                } else if (choice === 'no') {
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
                          extrapolate: 'clamp',
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

  const renderSwipeRow = (
    data: ListRenderItemInfo<ListDataType>,
    rowMap: RowMap<ListDataType>
  ) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(ITEM_HEIGHT);
    return (
      <SwipeRow
        preview={data?.index === 0}
        style={styles.addressRow({
          isLast: data?.index === listData.length - 1,
        })}
        disableRightSwipe
        disableLeftSwipe={data.item.primary && listData.length > 1}
        rightOpenValue={LEFT_SWIPE_THRESHOLD}
        rightActivationValue={RIGHT_ACTION_ACTIVATION_THRESHOLD}
        rightActionValue={RIGHT_ACTION_FULL_WIDTH}
        onRightAction={onRightAction}
        onRightActionStatusChange={onRightActionStatusChange}
      >
        {renderHiddenItem(
          data,
          rowMap,
          rowActionAnimatedValue,
          rowHeightAnimatedValue
        )}
        {renderItem(data, rowMap, rowHeightAnimatedValue)}
      </SwipeRow>
    );
  };

  const renderHiddenItem = (
    data: ListRenderItemInfo<ListDataType>,
    rowMap: RowMap<ListDataType>,
    rowActionAnimatedValue: Animated.Value,
    rowHeightAnimatedValue: Animated.Value
  ) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={async () =>
          await deleteRow(rowMap, data.item.key, data?.item.addressId)
        }
      />
    );
  };

  return (
    <SwipeListView
      style={{
        pointerEvents: editModalOpen ? 'none' : 'auto',
        opacity: editModalOpen ? 0.5 : 1,
      }}
      data={listData}
      renderItem={renderSwipeRow}
      closeOnScroll={false}
    />
  );
}
