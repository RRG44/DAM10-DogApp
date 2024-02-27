import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

  const [image, setImage] = useState(false);
  const [error, setError] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [localImage, setLocalImage] = useState(false);
  const [localImageData, setLocalImageData] = useState(null);

  const fetchDogPic = async () => {
    try {

      setLocalImage(false);
      setLocalImageData(null);

      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageData(data)
      setImage(true);
      setError(null);
    } catch (e) {
      setImage(false);
      setImageData(null);
      setError("Error getting image");
    };
  };

  const pickImage = async () => {
    try {
      
      setImage(false);
      setImageData(null);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setLocalImage(true);
        setLocalImageData(result.assets[0].uri);
        setError(null)
      } 
    } catch (error) {
      setLocalImage(false);
      setLocalImageData(null);
      setError("Error getting image");
    }
  };

  const deleteImage = async () => {
    setImage(false);
    setImageData(null);
    setLocalImage(false);
    setLocalImageData(null);
  };


  return (
    <View style={styles.container}>

      <View style={styles.titleBar}>
        <Text style={styles.title}>🐕 Get a Dog 🐶</Text>
      </View>

      <View style={styles.body}>
        
        <View style={styles.picFrame}>
          {(!image && !localImage) && <Text style={{color: '#555'}}>Dog pic</Text>}
          {(image && !localImageData) && <Image style={{height: '100%', width: '100%'}} source = {{uri: imageData.message}}/>}
          {(localImage && !imageData)  && <Image style={{height: '100%', width: '100%'}} source = {{uri: localImageData}}/>}
        </View>

        <TouchableOpacity 
          style = {styles.btnGetDog}
          onPress={fetchDogPic}>
          <Text style={styles.btnText}>Get a dog 🐾</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style = {styles.btnSelectDog}
          onPress={pickImage}>
          <Text style={styles.btnText}>Upload pic ⬆️</Text>
        </TouchableOpacity>

        {localImage && 
        <TouchableOpacity 
          style = {styles.btnDeleteDog}
          onPress={deleteImage}>
          <Text style={styles.btnText}>Delete pic ❌</Text>
        </TouchableOpacity>
        }

      </View>

    </View>
  );
}

const barColor = '#f2c18d'
const backColor = '#f6f193' 
const greenColor = '#a5dd9b' 
const lightGreenColor = '#c5ebaa' 

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
  },
  titleBar:
  {
    height:'15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: barColor,
  },
  title:
  {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '7%',
  }
  ,
  body:
  {
    height: '95%',
    width: '100%',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: backColor,
  },
  picFrame:
  {
    height: '45%',
    width: '90%',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'white',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGetDog:
  {
    backgroundColor: greenColor,
    width: 250,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnSelectDog:
  {
    backgroundColor: lightGreenColor,
    width: 250,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnDeleteDog:
  {
    backgroundColor: 'crimson',
    width: 250,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnText:
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});