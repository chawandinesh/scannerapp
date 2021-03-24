import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {BottomSheet, Icon, ListItem} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {height, width} = Dimensions.get('window');
export default class ScannerApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      isVisible: false,
    };
  }
  list = [
    {title: 'List Item 1'},
    {title: 'List Item 2'},
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red', alignItems: 'center'},
      titleStyle: {color: 'white'},
      onPress: () => {
        this.setState({isVisible: false});
      },
    },
  ];

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <Icon
            name="settings"
            type="feather"
            onPress={() => this.setState({isVisible: true})}
          />
        </View>
      ),
    });
  }

  takeFromGallery = () => {
    const options = {
      mediaType: 'photo',
      maxHeight: height * 0.7,
      maxWidth: width * 0.95,
      quality: 1,
      base64: true,
    };
    launchImageLibrary(options, e => {
      this.setState({
        imageUrl: e.uri,
        isVisible: true,
      });
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({imageUrl: data.uri, isVisible:true});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.imageUrl ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              source={{uri: this.state.imageUrl}}
              style={{height: height * 0.7, width: width * 0.95}}
            />
            {/* <View
              style={{
                height: height * 0.2,
                alignItems: 'center',
                width: width,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={this.takeFromGallery.bind(this)}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: height * 0.02,
                  }}>
                  Gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: height * 0.02,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: height * 0.02,
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: height * 0.02,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        ) : (
          <>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              onTextRecognized={e =>
                e.textBlocks.length ? this.takePicture() : null
              }
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({barcodes}) => {
                // console.log(barcodes);
              }}
            />
          </>
        )}
        <BottomSheet
          isVisible={this.state.isVisible}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#23527C',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#db88d4',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
              this.takeFromGallery();
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#9f8',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#FF6666',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </BottomSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    height: height * 0.6,
    width: width,
    alignSelf: 'center',
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
