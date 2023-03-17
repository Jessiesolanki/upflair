import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid
} from "react-native";
import Colors from "../../Assets/Colors";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CustomPicker from "../../Components/CustomPicker";
import { shadow } from "../../Assets/Styles";
import ControlledInput from "../../Components/ControlledInput";
import { useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductContext } from "../../Providers/ProductProvider";
import { BASE_URL } from "../../Providers";
import CustomButton from "../../Components/CustomButton";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";

const AddNewProduct = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    categories,
    getColorsBySubcategory,
    getSizesBySubcategory,
    getSubCategories,
    addProduct,
    updateProduct,
    brands,
  } = useContext(ProductContext);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [addPhotoModalVisible, setModalVisible] = useState(false);
  const product = route.params?.product;
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const selectedCategory = watch("product_category_id");
  const selectedSubcategory = watch("product_subcat_id");

  const isFromKycScreen = useMemo(
    () => route.params?.resetNavigationOnSuccess,
    [route]
  );

  const canGoBack = () => {
    const state = navigation.getState();
    return state.routes[0].name != "AddNewProduct";
  };

  useEffect(() => {
    if (!canGoBack()) navigation.setOptions({ headerLeft: undefined });
    if (product) {
      navigation.setOptions({ title: "Update Product" });
      if (product.product_imgs?.[0])
        setSelectedImages(
          product.product_imgs.map((item) => ({
            uri: BASE_URL + item.product_img,
          }))
        );
      reset({ ...product, price: product.price.toString() });
    }
  }, [route]);

  //colors - //////////////////////
  const { data: colors } = useQuery({
    queryKey: ["colors", selectedSubcategory, selectedCategory],
    queryFn: async () =>
      getColorsBySubcategory({ subcategory_id: selectedSubcategory }),
    select: (data) => data?.data?.data,
    enabled:
      !!selectedSubcategory &&
      !!subCategories?.find((subcat) => subcat.id == selectedSubcategory)
        ?.color_status,
  });

  //sizes - //////////////////////
  const { data: sizes } = useQuery({
    queryKey: ["sizes", selectedSubcategory, selectedCategory],
    queryFn: async () =>
      getSizesBySubcategory({ subcategory_id: selectedSubcategory }),
    select: (data) => data?.data?.data,
    enabled:
      !!selectedSubcategory &&
      !!subCategories?.find((subcat) => subcat.id == selectedSubcategory)
        ?.size_status,
  });
  console.log(sizes);
  useEffect(() => {
    setValue("product_subcat_id", undefined);
    getSubCategories({ category_id: selectedCategory }, setSubCategories);
  }, [selectedCategory]);

  const onImageSelected = (res) => {
    setModalVisible(false);
    console.log(" -- -- -- - -- - --res", res);
    if (!res || res.didCancel || !res.assets) return;
    setSelectedImages((cv) => [...cv, ...res.assets]);
  };

  const onSubmit = (data) => {
  

console.log(data,'data=============>')

    if (!selectedImages)
      return Alert.alert("Product Image", "Please select a product image.");
    if (product)
      updateProduct({ ...data, product_image: selectedImages }, () =>
        navigation.goBack()
      );
    else {
        navigation.navigate('AddShipping',{...data,product_image: selectedImages,route:"home"});
     
    }
  };

  const AddPhotoModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addPhotoModalVisible}
        onRequestClose={() => setModalVisible(!addPhotoModalVisible)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -45,
          }}
        >
          <View
            style={{
              height: 150,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              elevation: 8,
              shadowColor: "red",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 5,
            }}
          >
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{ marginTop: -10 }}
                onPress={() => setModalVisible(false)}
              >
                {/* <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: Colors.pinkColor }}>Close</Text> */}
                <Image
                  style={{ width: 25, height: 25, tintColor: Colors.pinkColor }}
                  source={require("../../Assets/close_icon.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                launchImageLibrary(
                  { selectionLimit: 15, mediaType: "mixed" },
                  onImageSelected
                )
              }
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.pinkColor,
                }}
              >
                Pick from Gallery
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 200,
                height: 1,
                backgroundColor: Colors.pinkColor,
                marginVertical: 5,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={async() =>{
                // launchCamera(options?, callback);

                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                  {
                    title: "App Camera Permission",
                    message:"App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                  }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  launchCamera({maxWidth: 300, maxHeight: 400 }, onImageSelected)
                } else {
                  console.log("Camera permission denied");
                }
              }
              }
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.pinkColor,
                }}
              >
                Take Picture{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const AddPhotoItem = () => {
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          width: 90,
          height: 90,
          ...shadow,
          shadowOpacity: 0.2,
          borderRadius: 6,
          marginRight: 16,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require("../../Assets/add.png")}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text style={{ color: Colors.borderColor, fontSize: 12, marginTop: 5 }}>
          Add Media
        </Text>
      </TouchableOpacity>
    );
  };

  const SelectedImageItem = ({ item, hideSeparator, onRemove }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderColor: Colors.borderColor,
          ...shadow,
          borderRadius: 6,
          width: 90,
          height: 90,
          marginRight: hideSeparator ? 0 : 16,
        }}
      >
        <Image
          resizeMode="cover"
          source={item}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 6,
          }}
        />
        <Icon
          onPress={onRemove}
          name="cancel"
          size={34}
          containerStyle={{
            width: "100%",
            height: "100%",
            backgroundColor: "#00000050",
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
          color={"white"}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={5}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <AddPhotoModal />

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#00000020",
            ...shadow,
            shadowOpacity: 0.1,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              fontWeight: "bold",
              margin: 16,
              marginBottom: 0,
            }}
          >
            Upload Images & Videos
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ padding: 16 }}
          >
            <AddPhotoItem />
            {selectedImages.map((item, index, arr) => (
              <SelectedImageItem
                hideSeparator={arr.length - 1 == index}
                item={item}
                key={index}
                onRemove={() =>
                  setSelectedImages((cv) => cv.filter((item, i) => i != index))
                }
              />
            ))}
          </ScrollView>
        </View>

        <ControlledInput
          label={"Product Name (required)"}
          textInputProps={{ placeholder: "Enter Product Name" }}
          controllerProps={{
            name: "product_name",
            control,
            errors,
            rules: { required: true },
          }}
          containerStyle={{ marginBottom: 20 }}
        />

        <CustomPicker
          options={categories.map((category) => ({
            ...category,
            label: category.category_name,
            value: category.id,
          }))}
          controllerProps={{
            name: "product_category_id",
            control,
            errors,
            rules: { required: true },
          }}
          label={"Select Category"}
          containerStyle={{ marginBottom: 20 }}
        />

        <CustomPicker
          options={subCategories.map((subCategory) => ({
            ...subCategory,
            label: subCategory.sub_category_name,
            value: subCategory.id,
          }))}
          controllerProps={{
            name: "product_subcat_id",
            control,
            errors,
            rules: { required: true },
          }}
          label={"Select Sub-Category"}
          emptyMessage={"Please make sure to select a category first."}
          containerStyle={{ marginBottom: 20 }}
        />

        <CustomPicker
          options={brands.map((brand) => ({
            ...brand,
            label: brand.brand_name,
            value: brand.id,
          }))}
          controllerProps={{
            name: "product_brand_id",
            control,
            errors,
            rules: { required: true },
          }}
          label={"Brand Name (required)"}
          containerStyle={{ marginBottom: 20 }}
        />

        <ControlledInput
          label={"Product Description (required)"}
          textInputProps={{ placeholder: "Enter Product Description" }}
          controllerProps={{
            name: "description",
            control,
            errors,
            rules: { required: true },
          }}
          containerStyle={{ marginBottom: 20 }}
        />

        <ControlledInput
          label={"Product Price (incl. of tax; required)"}
          textInputProps={{ placeholder: "Ex. 40" }}
          controllerProps={{
            name: "price",
            control,
            errors,
            rules: { required: true },
          }}
          containerStyle={{ marginBottom: 20 }}
        />

        {sizes && sizes?.length && (
          <CustomPicker
            options={sizes.map((size) => ({
              ...size,
              label: size.size,
              value: size.id,
            }))}
            textInputProps={{ placeholder: "Ex. 40" }}
            controllerProps={{
              name: "product_size_id",
              control,
              errors,
              rules: { required: true },
            }}
            label={"Select Size"}
            containerStyle={{ marginBottom: 20 }}
          />
        )}

        {sizes == null && (
          <CustomPicker
            // options={sizes.map(size => ({ ...size, label: size.size, value: size.id }))}
            textInputProps={{ placeholder: "Ex. 40" }}
            controllerProps={{
              name: "product_size_id",
              control,
              errors,
              rules: { required: true },
            }}
            label={"Select Size"}
            containerStyle={{ marginBottom: 20 }}
          />
        )}
      </ScrollView>

      <View style={{ height: 1, backgroundColor: "#ccc" }} />

      <CustomButton
        onPress={handleSubmit(onSubmit)}
        containerStyle={{
          margin: 20,
          marginBottom: 20 + (isFromKycScreen ? 0 : insets.bottom),
        }}
        label={product ? "Update Product" : "List Product"}
      />
    </KeyboardAvoidingView>
  );
};
export default AddNewProduct;
