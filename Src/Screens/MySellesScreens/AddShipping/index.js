import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import Colors from "../../../Assets/Colors";
import { hp, wp } from "../../../Components/Responsive";
import Box from "../../../Assets/box_outline.png";
// import Target from '../../../Assets/target.png'

import ImageIcon from "../../../Components/ImageIcon";
import Fedex from "../../../Assets/fedex.png";
import { OrderContext } from "../../../Providers/OrderProvider";
import { IMAGE_BASE_URL } from "../../../Constant/BaseURL";
import FastImage from "react-native-fast-image";
import { RowRadio } from "../OrderDetails/ShipingComponent";
import { useEffect } from "react";
import { ProductContext } from "../../../Providers/ProductProvider";
export default function AddShipping(props) {
  const {
    createGoShippo,
    SuccesOrderDetail,
    setSuccessOrderDetail,
    OrderDetals,
    createGoShippoTransaction,
    getShipmentImage,
  } = useContext(OrderContext);
  const { addProduct } = useContext(ProductContext);
  // const { getOrderDetail, OrderDetals } = useContext(OrderContext)
  const FilledDetails = props.route.params;

  // console.log(FilledDetails.route)

  const [Length, setLength] = useState("12.5");
  const [Width, setWidth] = useState("9.5");
  const [Height, setHeight] = useState("0.75");
  const [Weight, setWeight] = useState("0");
  const [RateDetail, setRateDetail] = useState([]);
  const [ActiveUSPS, setActiveUSPS] = useState(1);
  const [GoShippoDetail, setGoShippoDetail] = useState(null);
  const [MatchedBox, setMatchedbox] = useState(0); //null
  const [Uspsimg, setUspsimg] = useState(null);
  const [isActiveSelfShip, setActiveSlefShip] = useState(false);
  const [SelfShipPrice, setSelfShipPrice] = useState("");
  const [SelfShipError, setSelfShipError] = useState(false);
  const [BoxDetail, setBoxDetail] = useState({
    staticboxdetail: {
      price: 7.4,
    },
  });

  // for errors.....
  const [DimensionError, setDimensionError] = useState(-1);
  const [USPSError, setUSPSError] = useState(false);

  const ProducDetails = [
    { name: "length", OnChange: setLength, value: Length },
    { name: "Width", OnChange: setWidth, value: Width },
    { name: "Height", OnChange: setHeight, value: Height },
  ];

  var DimensionDetail = {
    W: parseInt(Width),
    H: parseFloat(Height),
    l: parseInt(Length),
    We: parseInt(Weight),
  };

  const CalculateShippment = () => {
    if (Length == "") {
      setDimensionError(0);
    } else if (Width == "") {
      setDimensionError(1);
      console.log("op");
    } else if (Height == "") {
      setDimensionError(2);
      console.log("op");
    } else {
      getShipmentImage((image) => {
        setUspsimg(image.data.data);
        setDimensionError(3);

        const { W, H, l } = DimensionDetail;

        const Pricedetail = (price) => {
          setBoxDetail({
            staticboxdetail: {
              price,
            },
          });
        };

        if (W < 10 && l < 13 && H < 1) {
          console.log("small size");
          setMatchedbox(0);
          Pricedetail(7.4);
        } else if (l <= 8.68 && W <= 5.43 && H <= 1.75) {
          // console.log('medium')
          setMatchedbox(1);
          Pricedetail(7.9);
        } else if (l <= 12.25 && W <= 12.25 && H <= 6) {
          setMatchedbox(2);
          Pricedetail(19.3);
          console.log("large size");
        } else {
          setMatchedbox(3);
          Pricedetail(0);
          setActiveUSPS(false);
          console.log("it does not match any crieteria");
        }
      });

  
    }
  };

  // console.log(BoxDetail,'BoxDetail')

  const GoShippo = (e) => {
    
 
  
    if (FilledDetails.route === "home") {
      let BoxSizeDetail = {
        length: DimensionDetail.l,
        height: DimensionDetail.H,
        width: DimensionDetail.W,
        weight: DimensionDetail.We,
      };

      let ProductAddDetail = { ...FilledDetails, ...BoxSizeDetail };
      ProductAddDetail.go_shippo = ActiveUSPS;
      if (ActiveUSPS) {
        ProductAddDetail.shipping_price = BoxDetail.staticboxdetail.price;
      } else {
        ProductAddDetail.shipping_price = SelfShipPrice;
      }
      console.log(JSON.stringify(ProductAddDetail),'oooiippp----------->')
     
      addProduct(ProductAddDetail, () => {
        console.log("successfully data is submited---------->");
        props.navigation.navigate('Home')
      });
    } else {
      if (!ActiveUSPS) {
        console.log("please fill price");
        setSelfShipError(true);
      } else if (MatchedBox !== null) {
       

      
      }
    }

    //! this is shiiping function....................... another method 

    // if (ActiveUSPS != -1) {
    //   const { amount, shipment, object_id } = e;

    //   const Detail = {
    //     rate_object_id: object_id,
    //     shipment_id: shipment,
    //     order_id: OrderDetals?.id,
    //     amount: amount,
    //     shippment_image: GoShippoDetail.provider_image_200,
    //   };

    //   createGoShippoTransaction(Detail, (e) => {
    //     setSuccessOrderDetail(e.data);
    //     props.navigation.navigate("My Order Detail");
    //   });
    // } else {
    //   setUSPSError(true);
    // }
  };

  useEffect(() => {}, [BoxDetail]);
  const isBoxError = MatchedBox == 3;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingTop: 3,
        flex: 1,
        backgroundColor: Colors.backgroundColorW,
        paddingHorizontal: wp(8),
      }}
    >
      <Text style={styles.Headingtitle}>Shipping Details</Text>
      {FilledDetails?.product_name ? (
        <>
          <Text style={[styles.Headingtitle, { marginTop: 9 }]}>
            Product name
          </Text>
          <Text style={[styles.SemiTitle, { marginBottom: 9 }]}>
            {" "}
            {FilledDetails.product_name}
          </Text>

          <Text style={[styles.Headingtitle, { marginTop: 9 }]}>Price</Text>
          <Text style={[styles.SemiTitle, { marginBottom: 9 }]}>
            {" "}
            {"$" + FilledDetails.price}
          </Text>
        </>
      ) : (
        <View style={styles.ShipContainer}>
          <View>
            <Text style={styles.SemiTitle}> Ships From</Text>
            <TextInput value="23909" style={styles.Ship} />
          </View>
          <Image />
          <ImageIcon name={"target"} size={20} />
        </View>
      )}

      {/*  */}

      <Text style={styles.Headingtitle}>Weight</Text>

      <View style={styles.WeightContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.SemiTitle}> Product Weight</Text>
          <TextInput
            keyboardType="numeric"
            placeholderTextColor={"black"}
            placeholder="0"
            onChangeText={setWeight}
            value={Weight}
            style={styles.DetailContainer}
          />
        </View>
        <Image />
        <Text style={styles.Lbs}>Lbs</Text>
      </View>

      <Text style={[styles.Headingtitle, { marginVertical: hp(2) }]}>
        Enter Dimensions
      </Text>
      <View style={styles.DimensioContainer}>
        {ProducDetails.map((e, s) => (
          <View
            style={{
              ...styles.BoxBody,
              borderColor: DimensionError == s ? "red" : Colors.pinkColor,
            }}
          >
            <Text style={styles.BoxTitle}>{e.name}</Text>

            <TextInput
              value={e.value}
              placeholder="  0"
              placeholderTextColor={"black"}
              keyboardType="numeric"
              onChangeText={e.OnChange}
              style={{
                marginTop: "-18%",
              }}
            />
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                width: "70%",
                marginTop: "-15%",
              }}
            />
          </View>
        ))}
        <TouchableOpacity
          onPress={CalculateShippment}
          style={{
            borderColor: Colors.pinkColor,
            height: 72,
            width: wp(18.5),
            borderWidth: 1,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: wp(3),
            backgroundColor: Colors.pinkColor,
          }}
        >
          <Text style={{ fontSize: 12, color: Colors.white }}>Calculate</Text>
          <Text style={{ fontSize: 12, color: Colors.white }}>Shipping</Text>

          {/* <Text style={{ fontSize: 18, marginTop: "5%" }}>75</Text> */}
        </TouchableOpacity>
      </View>

      {/* <Text style={[styles.Headingtitle, { marginTop: hp(2) }]}>Dimentions</Text>
            <Text style={[styles.SemiTitle, { marginTop: hp(2) }]}>Does Your item Fit in Any of These Boxes?</Text> */}

      {
        <DimensionBoxes
          error={DimensionError == 3}
          value={MatchedBox}
          dimensionDetail={{
            Width,
            Height,
            Weight,
          }}
          onBoxSelect={(e) => {
            setBoxDetail(e);
            setMatchedbox(e.activebox);
          }}
          data={RateDetail.boxSizes}
        />
      }

      <Text style={[styles.Headingtitle, { marginTop: hp(2) }]}>
        USPS Flat Rates
      </Text>
      {/* {RateDetail?.shipmentadd?.rates_list?.map((e, s) => ( */}
      {DimensionError == 3 && (
        <View
          style={{
            borderWidth: 0.5,
            borderColor: USPSError ? "red" : "white",
            marginLeft: wp(5),
            marginTop: hp(2),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <RowRadio
            error={isBoxError}
            onPress={() => {
              if (!isBoxError) {
                setActiveUSPS(true);
              }
              setGoShippoDetail(BoxDetail.staticboxdetail.price);
              setUSPSError(false);
            }}
            value={ActiveUSPS}
          />
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: Uspsimg }}
            style={{
              opacity: isBoxError ? 0.3 : 1,
              borderRadius: 5,
              height: 40,
              width: 100,
            }}
          ></FastImage>
          <Text
            style={{
              color: isBoxError ? Colors.black50 : Colors.pinkColor,
              fontSize: 16,
            }}
          >
            {isBoxError ? "Not Available" : BoxDetail.staticboxdetail.price}{" "}
            {!isBoxError && (
              <Text
                style={{
                  color: isBoxError ? Colors.black50 : Colors.blackColor,
                }}
              >
                {"1-3"} Days
              </Text>
            )}
          </Text>
        </View>
      )}
      {/* marginTop: hp(3), */}
      <View
        style={{
          flexDirection: "row",
          marginLeft: wp(5),
          marginTop: hp(2),
          height: hp(5),
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* setActiveSlefShip(!isActiveSelfShip) */}
        <View style={{ flexDirection: "row" }}>
          <RowRadio
            error={false}
            onPress={() => setActiveUSPS(!ActiveUSPS)}
            value={!ActiveUSPS}
          />
          <Text style={[styles.Headingtitle, { marginLeft: 15 }]}>
            Self Ship
          </Text>
        </View>

        {!ActiveUSPS && (
          <TextInput
            value={SelfShipPrice}
            placeholder="0.00"
            keyboardType="numeric"
            onChangeText={setSelfShipPrice}
            placeholderTextColor={Colors.blackColor}
            style={{
              borderWidth: 1,
              height: "100%",
              width: "55%",
              borderRadius: 4,
              borderColor: SelfShipError ? Colors.red : Colors.pinkColor,
              paddingHorizontal: wp(3),
            }}
          />
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.pinkColor,
          color: "#FFFFFF",
          height: 65,
          width: "100%",
          borderRadius: 8,
          marginVertical: 15,
          alignItems: "center",
          justifyContent: "center",
          width: wp(85),
          marginTop: hp(8),
          marginBottom: 100,
        }}
        activeOpacity={0.5}
        onPress={() => GoShippo(GoShippoDetail)}
      >
        <Text
          style={{
            color: "#FFFFFF",
            paddingVertical: 10,
            fontSize: 18,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  BoxTitle: { fontSize: 13, color: Colors.black50, marginBottom: "5%" },
  BoxBody: {
    borderColor: Colors.pinkColor,
    height: 72,
    width: wp(18.5),
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(3),
  },
  DimensioContainer: { flexDirection: "row", marginLeft: -8 },
  Lbs: { fontSize: 12, color: Colors.black50 },
  DetailContainer: { flex: 1, marginTop: -10, fontSize: 18, color: "black" },
  WeightContainer: {
    marginLeft: wp(5),
    marginTop: hp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Ship: { marginTop: -10, fontSize: 18, color: "black" },
  ShipContainer: {
    marginLeft: wp(5),
    marginTop: hp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Headingtitle: {
    fontSize: 15,
    color: "black",
  },
  SemiTitle: {
    fontSize: 12,
    color: Colors.black50,
  },
});

const DimensionBoxes = ({
  value,
  data,
  onBoxSelect,
  dimensionDetail,
  error,
}) => {
  const [SelectedBox, setSelectedBox] = useState(value);
  // value||
  const BoxDetail = [
    {
      name: "Flat Rate Envelope",
      price: 7.4,
      length: "12.5",
      width: "9.5",
      height: "0.75",
    },
    {
      name: "Small Flat Rate Box",
      price: 7.9,
      length: "8.68",
      width: "5.43",
      height: "1.75",
    },
    {
      name: "Large Flat Rate Box",
      price: 19.3,
      length: "12.25",
      width: "12.25",
      height: "6",
    },
  ];

  useEffect(() => {
    setSelectedBox(value);
  }, [value]);
  console.log(value, "value");
  // console.log(dimensionDetail, '')
  // useEffect(() => {
  //     if (data) {
  //         onBoxSelect({ boxdetail: data[0], staticboxdetail: BoxDetail[0] })
  //     }

  // }, [])

  return (
    <View
      style={{
        marginTop: hp(2),
        flexDirection: "row",
        height: 150,
        width: wp(89),
        marginLeft: -10,
      }}
    >
      {/* {error && ( */}
      <>
        {BoxDetail?.map((e, s) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedBox(s);
              onBoxSelect({
                boxdetail: e,
                staticboxdetail: BoxDetail[s],
                activebox: s,
              });
            }}
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              marginHorizontal: 10,
            }}
          >
            {s == SelectedBox && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  backgroundColor: "white",
                  right: 5,
                  top: 5,
                  zIndex: 1,
                }}
              >
                <ImageIcon
                  name="right"
                  iconStyle={{ tintColor: Colors.pinkColor }}
                  size={10}
                />
              </View>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1.3,
                backgroundColor:
                  s == SelectedBox ? Colors.pinkColor : "transparent",
              }}
            >
              <Image
                source={Box}
                style={{
                  tintColor: s == SelectedBox ? "white" : Colors.pinkColor,
                  height: "60%",
                  width: "60%",
                  resizeMode: "contain",
                }}
              />
              <Text
                numberOfLines={2}
                style={{
                  textAlign: "center",
                  color: s == SelectedBox ? "white" : "black",
                  fontSize: 12,
                }}
              >
                {e.name}
              </Text>
            </View>
            <View
              style={{
                flex: 0.8,
                justifyContent: "space-around",
                paddingLeft: wp(3),
              }}
            >
              <Text style={{ fontSize: 11 }}>
                L - {BoxDetail[s].length} 1/4
              </Text>
              <Text style={{ fontSize: 11 }}>W - {BoxDetail[s].width} 1/4</Text>
              <Text style={{ fontSize: 11 }}>
                H - {BoxDetail[s].height} 1/4
              </Text>
              {/* <Text style={{ fontSize: 11 }}>L  -   {e.length}  1/4</Text>
                        <Text style={{ fontSize: 11 }}>W  -  {e.width}  1/4</Text>
                        <Text style={{ fontSize: 11 }}>H  -   {e.height}  1/4</Text> */}
            </View>
          </TouchableOpacity>
        ))}
      </>
      {/* )} */}
    </View>
  );
};
