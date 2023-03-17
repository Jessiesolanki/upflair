import React, { useState, useRef, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import Colors from "../../../Assets/Colors";
import { wp } from "../../../Components/Responsive";
import dummyData from "./Dummydata";
import Styles from "./Orderdetail.Styles";
import { Picker } from "@react-native-picker/picker";
import { OrderContext } from "../../../Providers/OrderProvider";

export default function VerticalStepIndicator({ orderid, orderstatus }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { UpdateOrderDetail } = useContext(OrderContext);
  const [selectedStatus, setSelectedstatus] = useState("Select Status");
  const [ShippmentPosition, setShippmentPosition] = useState(0);
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 40,
  }).current;

  const renderPage = (rowData) => {
    const item = rowData.item;
    return (
      <View style={styles.rowItem}>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const UpdateOrderStatus = () => {
    console.log(selectedStatus, "selectedStatus");
    let status = selectedStatus === "Delivered" ? "4" : "3";
    if (selectedStatus !== "Select Status") {
      UpdateOrderDetail({ id: orderid, status: status }, (e) => {
        setModalVisible(false);
        if (e.data.status == 3) {
          setShippmentPosition(1);
        } else {
          setShippmentPosition(2);
        }
      });
    }
  };

  const Checkstatus = () => {
    if (orderstatus == 3) {
      setShippmentPosition(1);
    } else {
      setShippmentPosition(2);
    }
  };

  useEffect(Checkstatus, []);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000080",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 300,
              width: wp(90),
              backgroundColor: "white",
              borderRadius: 18,
              paddingHorizontal: 30,
              paddingVertical: 25,
            }}
          >
            <Text>Change status</Text>
            <TouchableOpacity
              onPress={open}
              style={{
                marginTop: 30,
                height: 50,
                borderWidth: 1,
                borderRadius: 9,
                borderColor: Colors.pinkColor,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <Picker
                ref={pickerRef}
                selectedValue={selectedStatus}
                onValueChange={(itemValue) => {
                  if (itemValue !== "Select Status") {
                    setSelectedstatus(itemValue);
                    close();
                  }
                }}
              >
                <Picker.Item label="Select Status" value="Select Status" />
                <Picker.Item label="Shipped" value="Shipped" />
                <Picker.Item label="Delivered" value="Delivered" />
              </Picker>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={UpdateOrderStatus}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 60,
                backgroundColor: Colors.pinkColor,
                borderRadius: 8,
                marginTop: 40,
              }}
            >
              <Text style={Styles.SubmitTitle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={styles.stepIndicatorStyles}
            stepCount={4}
            direction="vertical"
            currentPosition={ShippmentPosition}
            labels={dummyData.data.map((item) => item.title)}
          />
        </View>
        <FlatList
          style={{ flexGrow: 1 }}
          data={dummyData.data}
          renderItem={renderPage}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      <TouchableOpacity
        style={Styles.SubmitButton}
        activeOpacity={0.5}
        onPress={() => setModalVisible(true)}
      >
        <Text style={Styles.SubmitTitle}>Change Status</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    paddingHorizontal: 20,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "#333333",
    paddingVertical: 16,
    fontWeight: "600",
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: "#606060",
    lineHeight: 24,
    marginRight: 8,
  },
  stepIndicatorStyles: {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: "#fe7013",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#aaaaaa",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: "#000000",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
    labelColor: "#666666",
    labelSize: 15,
    currentStepLabelColor: "#fe7013",
  },
});
