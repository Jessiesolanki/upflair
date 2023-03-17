import React from "react"
import { View, TouchableOpacity, Text ,StyleSheet,Image} from "react-native"
import ImageIcon from "../../../Components/ImageIcon"
import { hp ,wp } from "../../../Components/Responsive"
const ShipingComponent = ({ image }) => {
    console.log(image,'imageimageimage')
    
    return (
        <View style={{
            marginTop: hp(3),
            height: hp(10),
            // backgroundColor: "yellow",
            flexDirection: "row"
        }}>
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ImageIcon name={"arrow_right"} iconStyle={{ transform: [{ rotate: "180deg" }] }} size={15} />
            </TouchableOpacity>
            <View style={{ flex: 4,justifyContent:"center",alignItems:"center" }}>
                <Image source={{ uri:"https://shippo-static.s3.amazonaws.com/providers/75/USPS.png"}} style={{height:"50%",width:"80%",resizeMode:"contain"}}  />
            </View>

            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ImageIcon name={"arrow_right"} size={15} />
            </TouchableOpacity>

        </View>)
}



export const PriceDescription = ({ title,Price }) => (
    <View style={{ marginTop: hp(6), flexDirection: "row", justifyContent: 'space-between', paddingRight: wp(10) }}>
        <Text>{title}</Text>
        <Text>${Price}</Text>
    </View>
)


export  const ConditionButton = () => {

    return (
        <View style={{ height: 67, flexDirection: "row", marginTop: hp(2) }}>
            <TouchableOpacity style={{ ...styles.ConditionButton }}>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>New</Text>
                <Text style={{ fontSize: 12, marginTop: 2 }}>New With Tags Unused</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.ConditionButton, backgroundColor: Colors.pinkColor }}>
                <Text style={{ fontSize: 15, fontWeight: "400", color: Colors.white }}>PreLoved</Text>
                <Text style={{ fontSize: 12, marginTop: 2, color: Colors.white }}>New Without Tags Used</Text>
            </TouchableOpacity>
        </View>
    )
}




 export const RowButton = ({ style, tittle }) => (
    <View style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        ...style
    }}>
        <Text style={{ fontSize: 15 }} >{tittle}</Text>
        <ImageIcon iconStyle={{ transform: [{ rotate: "180deg" }], marginTop: 80, marginRight: -wp(13) }} size={150} name={"backbox"} />
    </View>
)


export    const RowRadio = ({ value, onPress ,title,error}) => {
    // const [Active, setActive] = useState(false)
    return (
        <TouchableOpacity onPress={() => onPress(!value)} style={styles.PriceContainer}>
            <View style={{ justifyContent: "center", alignItems: "center", height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: error?Colors.black50:Colors.pinkColor }}>
                {value && <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor:error?Colors.black50: Colors.pinkColor }}>
                </View>}
            </View>
            {title&& <Text style={styles.Shipping}>Self Shipping</Text>}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    ConditionButton: { flex: 1, justifyContent: 'center', alignItems: "center", borderRadius: 8 }
    // ConditionTittle1:{}
})

export default ShipingComponent