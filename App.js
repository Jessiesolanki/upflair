import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Modal, StatusBar, useColorScheme, View, } from 'react-native';
import { ActivityIndicator, LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './Navigations/Navigator'
import Colors from './Src/Assets/Colors';
import CustomModal from './Src/Components/CustomModal';
import Providers from './Src/Providers';
import { AppContext } from './Src/Providers/AppProvider';
import { QueryClient, QueryClientProvider } from 'react-query'
import { StripeProvider } from '@stripe/stripe-react-native';
import NotificationController from './Src/Utils/NotificationController';

const queryClient = new QueryClient()

LogBox.ignoreAllLogs();

const App = () => {

  return (
    <StripeProvider
      publishableKey="pk_test_NcqscqefIM1i0NzWdXdJGk8C"
    >
      <QueryClientProvider client={queryClient} >
        <Providers>
          <NotificationController />
          <GestureHandlerRootView style={{ flex: 1 }} >
            <NavigationContainer>
              <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent />
              <Navigation />
              <LoadingModal />
              <CustomModal />
            </NavigationContainer>
          </GestureHandlerRootView>
        </Providers>
      </QueryClientProvider>
    </StripeProvider>
  );
};
export default App;


const LoadingModal = () => {
  const { loading } = useContext(AppContext)

  return (
    <View >
      <Modal
        visible={!!loading}
        transparent={true}
        hardwareAccelerated
        statusBarTranslucent
        animationType="fade">
        <View style={{ flex: 1, backgroundColor: "#00000080", alignItems: 'center', justifyContent: 'center' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 30 }}>
            <ActivityIndicator color={Colors.pinkColor} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

