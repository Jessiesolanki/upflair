import React, { useRef, useMemo, useEffect, useState, useContext } from 'react'
import { View } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import { shadow } from '../Assets/Styles';
import { AppContext } from '../Providers/AppProvider';

export default CustomModal = ({ children }) => {
    const bottomSheetRef = useRef(null);
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const { modal, setModal } = useContext(AppContext)

    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    useEffect(() => {
        console.log(!!modal)
        let timeout
        if (modal?.children && modal?.visible!=false) timeout = setTimeout(() => bottomSheetRef.current?.snapToIndex(0), 100)
        if (modal?.visible == false) bottomSheetRef.current?.close()
        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [modal])

    if (!modal?.children) return null

    return (
        <BottomSheet
            ref={bottomSheetRef}
            enablePanDownToClose
            backgroundStyle={{ ...shadow }}
            backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} animatedPosition={-1} />}
            onClose={() => setModal(null)}
            index={-1}
            animatedIndex={0}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}>

            <BottomSheetView style={{}} onLayout={handleContentLayout} >

                {modal?.children}
            </BottomSheetView>

        </BottomSheet>
    );
};

