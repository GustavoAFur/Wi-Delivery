import React, { useState, useRef } from 'react';
import { StyleSheet, View, Button, TextInput, StatusBar, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { WebView } from 'react-native-webview';

export function CustomWebView() {
  const [url, setUrl] = useState('https://blog.stackademic.com/unlocking-seamless-web-browsing-in-react-native-with-react-native-inappbrowser-reborn-7ea8c4381a49');
  const webViewRef = useRef<WebView>(null);

  const handleOpenLink = async () => {
    try {
      await InAppBrowser.open(url);
    } catch (error) {
      console.error('Failed to open link:', error);
    }
  };
  return (
    <TouchableOpacity 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onPress={handleOpenLink}
    >
      <Text>Open Link</Text>
    </TouchableOpacity>
  );
};

