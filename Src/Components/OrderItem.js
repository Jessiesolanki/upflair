import React, { useMemo, useContext, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { Rating } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Assets/Colors";
import { IMAGE_BASE_URL } from "../Constant/BaseURL";
import { OrderContext } from "../Providers/OrderProvider";
import { useEffect } from "react";
export default OrderItem = ({ item, type }) => {
  const navigation = useNavigation();
  const { UpdateOrderDetail, setOrderDetails,OrderDetals } = useContext(OrderContext);

  const [ButtonUpdate, setButtonUpdate] = useState(true);



  const status = useMemo(() => {
    switch (item?.status) {
      case 0:
        return { status: "Pending" };
      case 1:
        return { status: "Received" };
      case 2:
        return { status: "In Progress" };
      case 3:
        return { status: "Shipped" };
      case 4:
        return { status: "Delivered" };
      case 5:
        return { status: "Cancelled" };
      case 6:
        return { status: "Return" };
      case 7:
        return { status: "Refund" };
    }
  }, [item]);

 useEffect(()=>{

 },[OrderDetals])

  const UpdateOrderStatus = () => {
    UpdateOrderDetail({ id: item.id, status: "5" }, (e) => {});
  };

  const DetailNavigate = () => {
    setOrderDetails(item);
    console.log(item,'this is hte item')
    UpdateOrderDetail({ id: item.id, status: "1" }, (e) => {
      setButtonUpdate(false);
    });
  };

  const ProcessingButtons = () => (
    <>
      {type == "1" && (
        <>
          {ButtonUpdate &&
          status.status != "Received" &&
          status.status != "Shipped" ? (
            <>
              <Button title="Accept" onPress={DetailNavigate} />
              <Button title="Cancel" onPress={UpdateOrderStatus} />
            </>
          ) : status.status == "Received" ? (
            <Button
              title="View"
              onPress={() => {
                setOrderDetails(item);
                navigation.navigate("My Order Detail", {
                  order: item,
                  status: status.status,
                });
              }}
            />
          ) : (
            <Button
              title="Shipped"
              onPress={() => {
                setOrderDetails(item);
                navigation.navigate("My Order Detail", {
                  order: item,
                  status: status.status,
                });
              }}
            />
          )}
        </>
      )}
    </>
  );

//   const StatusButtons = useMemo(() => {
//     switch (type) {
//       case "1":
//         return ProcessingButtons();
//       case "2":
//         return () => <></>;
//       case "3":
//         return () => <></>;
//     }
//   }, [type]);

  return (
    <TouchableOpacity
      disabled={true}
      // onPress={() => navigation.navigate('My Order Detail', { order: item })}
      style={{ flexDirection: "row" }}
    >
      <FastImage
        style={{ height: 65, width: 65, borderRadius: 5 }}
        source={{
          uri: IMAGE_BASE_URL + item?.product?.product_imgs[0]?.product_img,
        }}
      />

      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {item.product.product_name}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
        >
          <Text>${item.price.toFixed(2)}</Text>
          {item.seller && (
            <View
              style={{
                width: 1,
                backgroundColor: Colors.black50,
                alignSelf: "stretch",
                marginHorizontal: 10,
              }}
            />
          )}
          {item.seller && (
            <Text style={{ color: Colors.black50 }}>
              @{item.seller?.username}
            </Text>
          )}
        </View>
      </View>
      <View>
        <Text>{status.status}</Text>

        {type==1&&<ProcessingButtons/>}
      </View>
    </TouchableOpacity>
  );
};

const Button = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center",
      height: 18,
      width: 53,
      backgroundColor: Colors.pinkColor,
      marginTop: 5,
      alignSelf: "flex-end",
    }}
  >
    <Text
      style={{ color: Colors.white, fontSize: 12, fontFamily: "Foundation" }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
