import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CustomWebView from './CustomWebView';

export function ExternalBrowser() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomWebView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

