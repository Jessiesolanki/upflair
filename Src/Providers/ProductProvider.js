import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { API, ERROR, LOADING } from ".";
import { AppContext } from "./AppProvider";
import { AuthContext } from "./AuthProvider";
import { api_base_url } from ".";


export const ProductContext = React.createContext()

export default ProductProvider = ({ children }) => {

    const { setLoading } = useContext(AppContext)
    const { userData } = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [brands, setBrands] = useState([])
    const [pastSearches, setPastSearches] = useState([])

    useEffect(() => {
        getBrands()
        if (!userData?.accessToken) return
        getSizes()
        getColors()
        getCategories()
        getPastSearches()
    }, [userData])

    const getCategories = () => API.get('seller/getCategory').then(res => setCategories(res.data.data))

    const getColors = () => API.get('getColor').then(res => setColors(res.data.data))

    const getSizes = () => API.get('getSize').then(res => setSizes(res.data.data))

    const getBrands = () => API.get('getBrand').then(res => setBrands(res.data.data))

    const getSubCategories = (params, setState) => params?.category_id ? API.post('seller/getSubCategory', params).then(res => setState(res.data.data)) : null

    const getPastSearches = () => API.post('list-searched-product').then(res => setPastSearches(res.data.data.rows))

    const addProduct = async (data, onSuccess) => {



        var myHeaders = new Headers();
        myHeaders.append("x-access-token", userData.accessToken);
        const {
            description,
            go_shippo,
            height,
            length,
            price,
            product_brand_id,
            product_category_id,
            product_image,
            product_name,
            product_size_id,
            product_subcat_id,
            shipping_price,
            weight,
            width
        } = data
     
        let images = []
      
       
       
        var formdata = new FormData();
       
        product_image?.map((e)=>{
     
           formdata.append("product_image",{ type: e?.type, uri: e?.uri, name: e?.fileName },e?.uri)
           
        })
      
        formdata.append("product_name",product_name);
        formdata.append("description",description);
        formdata.append("product_size_id", product_size_id);
        formdata.append("product_category_id", product_category_id);
        formdata.append("product_brand_id", product_brand_id);
        formdata.append("price",price);
      
        formdata.append("product_subcat_id", product_subcat_id);
        formdata.append("shipping_price", shipping_price);
        formdata.append("go_shippo", go_shippo);
        formdata.append("length", length);
        formdata.append("height", height);
        formdata.append("width", width);
        formdata.append("weight", weight);


        // formdata.append("product_name", "Demo Product2");
        // formdata.append("description", "This is demo product");
        // formdata.append("product_size_id", "14");
        // formdata.append("product_category_id", "37");
        // formdata.append("product_brand_id", "13");
        // formdata.append("price", "1350.2");
        // // formdata.append("product_image", fileInput.files[0], "/path/to/file");
        // formdata.append("product_subcat_id", "24");
        // formdata.append("shipping_price", "7.45");
        // formdata.append("go_shippo", "true");
        // formdata.append("length", "12.5");
        // formdata.append("height", "2.3");
        // formdata.append("width", "4.6");
        // formdata.append("weight", "5");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

       
        fetch(api_base_url+"seller/addProduct", requestOptions)
            .then(response => response.text())
            .then(onSuccess)
            .catch(error => console.log('error', error));


        // setLoading(true)
        // var myHeaders = new Headers();
        //





        // fetch(api_base_url+"seller/addProduct", requestOptions)
        //     .then(response => response.text())
        //     .then(onSuccess)
        //     .catch(error => console.log('error----in addProduct--------------------->', error))
        //     .finally(() => setLoading(false))
    }

    const selectBrands = (params, onSuccess) => {
        setLoading(true)
        API.post('addUserBrand', { ...params, id: userData.id })
            .then(onSuccess)
            .catch(err => { console.log(err, err.response) })
            .finally(() => setLoading(false))
    }

    const updateProduct = async (data, onSuccess) => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", userData.accessToken);

        var formdata = convertToFormData(data)

        console.log(JSON.stringify(formdata, null, 2))

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://54.201.160.69:3208/api/seller/updateProduct", requestOptions)
            .then(response => response.text())
            .then((text) => { onSuccess(); console.log(JSON.stringify(text, null, 2)) })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
    }

    const getProductDetails = (id) => API.post('detail-of-product', { product_id: id })

    const getProductComments = (id) => API.post('getAllComments', { product_id: id })

    const commentOnProduct = (params) => API.post('sendComment', params)

    const replyToComment = (params) => API.post('sendReply', params)

    const getSellerProductDetails = (id, setState) => {
        console.log(id, 'sd');
        setState(LOADING)
        API.post('seller/getProductById', { id: id })
            .then((res) => setState(res.data.data))
            .catch(err => { console.log(err, err.response); setState(ERROR) })
    }
    const updateActiveUnactive = (id, status) => {
        // setState(LOADING)
        console.log('data')
        API.post('seller/productStatusUpdate', { id: id, status: status })
            .then((res) => getSellerProductDetails(id, text))
            .catch(err => { console.log(err, err.response); })
    }
    const deleteProduct = (id, onSuccess) => {
        setLoading(true)
        API.post('seller/deleteProduct', { id })
            .then(onSuccess)
            .catch(err => console.log(err, err.response))
            .finally(() => setLoading(false))
    }

    const getSellerProducts = (params, setState) => {
        setState(LOADING)
        API.post('seller/getProduct', params)
            .then(res => setState(res.data.data.rows))
            .catch(err => { console.log(err, err.response); setState(ERROR) })
    }

    const getProducts = params => API.post('list-all-products', { limit: 10, ...params })

    const getProductsBySellerId = params => API.post('getAllSellerProduct', { limit: 10, ...params })

    const getColorsBySubcategory = params => API.post('getColorBySubcat', params)

    const getSizesBySubcategory = params => API.post('getSizeBySubcat', params)

    return (
        <ProductContext.Provider value={{
            addProduct,
            categories,
            getSubCategories,
            colors,
            sizes,
            getSellerProducts,
            getProducts,
            updateProduct,
            deleteProduct,
            getProductDetails,
            getSellerProductDetails,
            updateActiveUnactive,
            brands,
            selectBrands,
            pastSearches,
            getProductComments,
            commentOnProduct,
            replyToComment,
            getProductsBySellerId,
            getColorsBySubcategory,
            getSizesBySubcategory
        }} >
            {children}
        </ProductContext.Provider>
    )
}

const convertToFormData = params => {
    let formData = new FormData()
    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === 'object' && value?.length > 0) value.forEach(item => formData.append(key, ({ ...item, name: item.fileName })))
        else formData.append(key, value)
    })
    return formData
}