import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const webviewRef = useRef(null)
  
  
  backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack()
  }
  
  frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward()
  }

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={styles.flexContainer}>
        <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={backButtonHandler}>
            <Text style={styles.button}>&#60; Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={frontButtonHandler}>
            <Text style={styles.button}>Forward &#62;</Text>
          </TouchableOpacity>
        </View>
        <WebView
            style={styles.webview}
            originWhitelist={['*']}
            source={{ uri: 'http://tipografi.info/sq/' }}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                color='black'
                size='large'
                style={styles.flexContainer}
              />
            )}
            ref={webviewRef}
            onNavigationStateChange={navState => {
              setCanGoBack(navState.canGoBack)
              setCanGoForward(navState.canGoForward)
              setCurrentUrl(navState.url)
            }}
            
        />
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#696969'
  },
  button: {
    color: 'white',
    fontSize: 18
  }
});
