import React from "react";
import { View, Modal, TouchableOpacity, StyleSheet, Text } from "react-native"

const MyModal = (props) => {
    return (
        <Modal
            visible={props.visible}
            animationType="none"
            onRequestClose={() => props.closeModal()}
            transparent={true}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={() => props.closeModal()} activeOpacity={1} style={styles.topView} />
                <View style={styles.midView}>
                    <TouchableOpacity onPress={() => props.closeModal()} activeOpacity={1} style={styles.leftView} />
                    <View style={styles.mainView}>
                        <Text>Are you sure you want to remove this item?</Text>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.touch1} onPress={() => props.closeModal()}><Text>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.touch2} onPress={() => { props.pressOk(); props.closeModal() }}><Text style={styles.remove}>Remove</Text></TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => props.closeModal()} activeOpacity={1} style={styles.rightView} />
                </View>
                <TouchableOpacity onPress={() => props.closeModal()} activeOpacity={1} style={styles.bottomView} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    topView: {
        flex: 1,
    },
    midView: {
        flexDirection: "row",
    },
    leftView: {
        flex: 1,
    },
    mainView: {
        width: 250,
        height: 150,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 15,
        justifyContent: "space-between"
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    touch1: {
        width: 80,
        height: 35,
        borderWidth: 0.5,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    touch2: {
        width: 80,
        height: 35,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center"
    },
    remove: {
        color: "white"
    },
    rightView: {
        flex: 1,
    },
    bottomView: {
        flex: 1,
    }
})

export default MyModal;