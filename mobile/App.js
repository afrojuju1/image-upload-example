import React from 'react';
import {Platform, StyleSheet, Button, View, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
// <Props>
const createFormData = (photo, body) => {
  const data = new FormData()
  console.log('[createFormData] photo: ', photo)
  console.log('[createFormData] body: ', body)

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace("file://", "")
  })

  Object.keys(body).forEach(key => {
    data.append(key, body[key])
  })

  return data
}

export default class App extends React.Component {
  state = {
    photo: null,
  }

  handleUploadPhoto = () => {
    const url = 'http://localhost:3000/api/upload'
    const body = createFormData(this.state.photo, { userId: '123' })
    fetch(url, {method: 'POST', body})
      .then(response => response.json())
      .then(response => {
        console.log('[handleUploadPhoto] success!')
        alert('Upload Successful')
        this.setState({ photo: null })
      })
      .catch(error => {
        console.log('[handleUploadPhoto] error ', error)
        alert('Upload image failed!')
      })
  }

  handleChoosePhoto = () => {
    const options = { noData: true }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('response: ', response)
        this.setState({ photo: response })
      }
    })
  }

  render() {
    const { photo } = this.state
    // const source = photo ? require(photo.uri) : null
    return (
      <View style={styles.container}>
        {photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri, isStatic: true }}
              style={styles.image}
            />
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button title="Select a picture" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 300,
    height: 300,
    // fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
