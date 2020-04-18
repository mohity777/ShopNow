import ProductOverviewScreen from "../screens/ProductOverviewScreen"
import ProductDetailScreen from "../screens/ProductDetailScreen"
import CartScreen from "../screens/CartScreen";
import OrderScreen from "../screens/OrderScreen";
import UserProductsScreen from "../screens/UserProductsScreen"
import UserEditScreen from "../screens/UserEditScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Zocial"
import Dicon from "react-native-vector-icons/FontAwesome"
import Micon from "react-native-vector-icons/MaterialIcons"
import { createDrawerNavigator } from "@react-navigation/drawer"
import CustomDrawer from "./../components/CustomDrawer";

const Stack1 = createStackNavigator();

const defaultNavigationOptions = {
    headerTitleAlign: "center",
    headerTitleStyle: {
        fontWeight: "bold"
    },
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: "green"
    }
}


const StackScreen1 = () => {
    return (
        <Stack1.Navigator
            screenOptions={defaultNavigationOptions}
        >
            <Stack1.Screen
                name={"ProductOverview"}
                component={ProductOverviewScreen}
                options={({ navigation, route }) => ({
                    title: "All Products",
                    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate("Cart")}><Icon style={{ marginRight: 15 }} size={25} color="white" name="cart" /></TouchableOpacity>,
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}><Dicon style={{ marginLeft: 15 }} size={23} color="white" name="reorder" /></TouchableOpacity>
                })}
            />
            <Stack1.Screen
                name={"ProductDetail"}
                component={ProductDetailScreen}
                options={({ navigation, route }) => ({
                    title: route.params.title
                })}
            />
            <Stack1.Screen
                name={"Cart"}
                component={CartScreen}
                options={{ title: "Cart" }}
            />
        </Stack1.Navigator>
    )
}

const Stack2 = createStackNavigator()

const StackScreen2 = () => {
    return (
        <Stack2.Navigator screenOptions={defaultNavigationOptions}>
            <Stack2.Screen
                name="Order"
                component={OrderScreen}
                options={({ navigation, route }) => ({
                    title: "Orders",
                    headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}><Dicon
                        style={{ marginLeft: 15 }}
                        size={23} color="white"
                        name="reorder" />
                    </TouchableOpacity>
                })} />
        </Stack2.Navigator>
    );
}

const Stack3 = createStackNavigator();

const StackScreen3 = () => {
    return (
        <Stack3.Navigator screenOptions={defaultNavigationOptions}>
            <Stack3.Screen name="UserProducts" component={UserProductsScreen} options={({ navigation, route }) => ({
                title: "Your Products",
                headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}><Dicon
                    style={{ marginLeft: 15 }}
                    size={23} color="white"
                    name="reorder"
                /></TouchableOpacity>,
                headerRight: () => <TouchableOpacity onPress={() => navigation.navigate("UserEdit", { id: undefined })}><Micon
                    style={{ marginRight: 15 }}
                    size={25}
                    color="white"
                    name="library-add"
                /></TouchableOpacity>
            })} />
            <Stack3.Screen name="UserEdit" component={UserEditScreen} options={({ route }) => ({ title: route.params.id ? "Edit Product" : "Add Product" })} />
        </Stack3.Navigator>
    )
}

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerType="front" drawerContentOptions={{ activeTintColor: "green", labelStyle: { fontWeight: "bold", fontSize: 16 } }} drawerContent={(props) => <CustomDrawer {...props} />} >
                <Drawer.Screen name="Home" component={StackScreen1} options={{ drawerIcon: ({ color }) => <Dicon name="home" size={23} color={color} /> }} />
                <Drawer.Screen name="Orders" component={StackScreen2} options={{ drawerIcon: ({ color }) => <Dicon name="reorder" size={23} color={color} /> }} />
                <Drawer.Screen name="User" component={StackScreen3} options={{ drawerIcon: ({ color }) => <Dicon name="user-circle-o" size={23} color={color} /> }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default DrawerScreen;