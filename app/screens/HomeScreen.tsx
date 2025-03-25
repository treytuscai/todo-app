import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);

  // Load tasks from AsyncStorage
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  };

  const saveTasks = async (updatedTasks: any) => {
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask', { saveTasks, tasks })} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 10 } });

export default HomeScreen;