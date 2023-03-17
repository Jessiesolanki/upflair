import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProduct from "../Src/Screens/MyProductScreens/MyProduct";
import UpdateProduct from "../Src/Screens/MyProductScreens/UpdateProduct";
import AddNewProduct from "../Src/Screens/MyProductScreens/AddNewProduct";
import ImageIcon from "../Src/Components/ImageIcon";
import ProductDetails from "../Src/Screens/HomeScreens/ProductDetails";
import AddShipping from "../Src/Screens/MySellesScreens/AddShipping";
const Stack = createNativeStackNavigator();

const MyProductStack = () => {
  const navigation = useNavigation();
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="MyProduct">
      <Stack.Screen
        name="MyProduct"
        component={MyProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="My Product Details"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddShipping"
        component={AddShipping}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewProduct"
        component={AddNewProduct}
        options={{
          headerLeft: () => (
            <ImageIcon
              containerStyle={{ marginRight: 15 }}
              onPress={() => navigation.navigate("MyProduct")}
              name={"back"}
            />
          ),
          title: "Add New Product",
        }}
      />
    </Stack.Navigator>
  );
};

export default MyProductStack;
