import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/Types';

type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTask'>;
type AddTaskScreenRouteProp = RouteProp<RootStackParamList, 'AddTask'>;

interface AddTaskScreenProps {
  navigation: AddTaskScreenNavigationProp;
  route: AddTaskScreenRouteProp;
}

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation, route }) => {
    const [task, setTask] = useState('');
    const { saveTasks, tasks } = route.params; // Get tasks from params
  
    const addTask = () => {
      if (task.trim().length === 0) return;
      const newTask = { id: uuid.v4() as string, title: task, completed: false };
      saveTasks([...tasks, newTask]);
      navigation.goBack();
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          onChangeText={setTask}
          value={task}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    );
  };