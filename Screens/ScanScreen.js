import React from "react"
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native"
import {BarCodeScanner} from "expo-barcode-scanner"
import * as Permissions from "expo-permissions"

class ScanScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal"
        }
    }

    getCameraPermissions = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status==="granted",
            buttonState:"clicked",
            scanned: false
        })
    }

    handleBarCodeScanned = async ({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal"
        })
    }

    render(){
        if (this.state.buttonState==="clicked"&&this.state.hasCameraPermissions) {
            return(
                < BarCodeScanner 
                    onBarCodeScanned = {
                        this.state.scanned?
                        undefined:
                        this.handleBarCodeScanned
                    }
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(this.state.buttonState==="normal"){
        return(
            <View>
                <View>
                <TouchableOpacity style = {Styles.ScanButton} 
                onPress = {this.getCameraPermissions}>
                    <Text>Scan</Text>
                </TouchableOpacity>
                </View>
                <Text>
                    {
                        this.state.hasCameraPermissions===true?
                        this.state.scannedData: 
                        "Request camera permission"
                    }
                </Text> 
            </View>
        )
        }
    }
}

const Styles = StyleSheet.create({
    ScanButton: {
        backgroundColor: "#ff0000",
        padding: 10,
        margin: 10,
        height: 50
    }
})

export default ScanScreen