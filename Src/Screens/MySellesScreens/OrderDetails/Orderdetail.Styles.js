import { StyleSheet } from "react-native"
import { wp,hp } from "../../../Components/Responsive"


const styles = StyleSheet.create({
    SubmitTitle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 18
    },
    SubmitButton: {
        backgroundColor: Colors.pinkColor,
        color: '#FFFFFF',
        height: 65, width: '100%', borderRadius: 8, marginVertical: 15,
        alignItems: 'center', justifyContent: 'center',
        width: wp(85),
        marginTop: hp(8),
        marginBottom: 100
    },
    CostIncluded: { marginTop: hp(4) },
    PriceTitle: { marginTop: hp(4) },
    ShippingCost: { flexDirection: "row", justifyContent: "space-between", paddingRight: wp(10) },
    Shipping: { fontSize: 15, marginLeft: 14 },
    Radio: { justifyContent: "center", alignItems: "center", height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.pinkColor },
    PriceContainer: { marginTop: hp(5), flexDirection: "row" },
    Condition: { marginTop: hp(2), fontSize: 15 },
    Category: { marginTop: hp(3) },
    DescriptionDetail: { marginTop: 5, color: Colors.blackColor, fontSize: 15 },
    Description: { marginTop: hp(5), color: Colors.black50 },
    TitleDetail: { marginTop: 4, color: Colors.blackColor, fontSize: 15 },
    Title: { marginTop: hp(3), color: Colors.black50 },
    BottomButtonContainer: { height: 65, justifyContent: "center", alignItems: "center", width: 65, borderRadius: 5 },
    DetailBody: { flex: 1, paddingHorizontal: wp(8), backgroundColor: Colors.backgroundColorW },
    BottomRightIcon: { alignItems: "flex-end", marginTop: 15, height: 65, width: 85, backgroundColor: Colors.backgroundColorW, position: 'absolute', right: 0 },
    BottomImages: { marginLeft: "-11%", flex: 1, zIndex: -1 },
    Body: {
        // borderBottomLeftRadius: 50,
        height: hp(48),
        width: wp(100),
        // alignSelf: "flex-end",
        overflow: 'hidden',
        flexDirection: "row"
    },
    ColorContainer: {
        height: "40%",
        width: "100%",
        backgroundColor: "white",
        marginTop: "-15%",
        borderTopRightRadius: 27,
        borderBottomRightRadius: 27,
        justifyContent: 'flex-end',
        paddingBottom: "40%"
    },
    Color: { height: 25, width: 25, borderRadius: 12.5, backgroundColor: Colors.black70, marginTop: "35%" },
    ConditionButton: { flex: 1, justifyContent: 'center', alignItems: "center", borderRadius: 8 }
})

export default styles