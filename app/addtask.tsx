import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-uuid';

const AddTaskScreen = () => {
  const [task, setTask] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();
  const tasks = params.tasks ? JSON.parse(params.tasks as string) : [];
  
  const addTask = async () => {
    if (task.trim().length === 0) return;
    const newTask = { id: uuid() as string, title: task, completed: false };
    const updatedTasks = [...tasks, newTask];
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    router.back();
  };

  return (
    <View>
      <TextInput placeholder="Enter Task" onChangeText={setTask} value={task} />
      <Button title="Add" onPress={addTask} />
    </View>
  );
};

export default AddTaskScreen;
