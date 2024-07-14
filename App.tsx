import {StyleSheet, Text, SafeAreaView, Button, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';
import {observer} from 'mobx-react-lite';
import timerStore from './timerStore.tsx';

const App = observer(() => {
  useEffect(() => {
    // Set the target time received from the API
    timerStore.setTargetTime('19:09:00');
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Remaining Time: {timerStore.remainingTime}</Text>
        <Button title="Delivered" onPress={() => timerStore.onDelivered()} />
      </View>
    </SafeAreaView>
  );
});

export default App;

const styles = StyleSheet.create({});
