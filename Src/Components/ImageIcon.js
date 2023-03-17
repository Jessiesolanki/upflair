import React, { useMemo } from "react";
import { Image, TouchableOpacity, View } from "react-native";

export default ImageIcon = ({ size = 27, containerStyle, iconStyle, name, color, onPress }) => {

    const image = useMemo(() => {
        switch (name) {
            case 'back': return require('../Assets/arrow_circle.png')
            case 'chat': return require('../Assets/side_bar_chat.png')
            case 'shipping': return require('../Assets/theway.png')
            case 'search': return require('../Assets/wishlist_search.png')
            case 'delete': return require('../Assets/delete.png')
            case 'menu': return require('../Assets/side.png')
            case 'backbox': return require('../Assets/Back_container.png')
            case 'cart': return require('../Assets/side_bar_cart.png')
            case 'filter': return require('../Assets/sort.png')
            case 'add': return require('../Assets/add.png')
            case 'add_white': return require('../Assets/add_white.png')
            case 'arrow_right': return require('../Assets/arrow_right.png')
            case 'add_icon': return require('../Assets/add_icon.png')
            case 'target': return require('../Assets/target.png')
            case 'right': return require('../Assets/right.png')
            
            default:
                break;
        }
    }, [name])

    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} style={[{ justifyContent: 'center', alignItems: 'center' }, containerStyle]} >
            <Image style={[{ width: size, height: size, resizeMode: 'contain', tintColor: color }, iconStyle]} source={image} />
        </TouchableOpacity>
    )
}