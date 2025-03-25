import React, { useCallback } from "react";
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import TaskItem from './components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [tasks, setTasks] = React.useState<{ id: string; title: string; completed: boolean }[]>([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

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
            <Button
                title="Add Task"
                onPress={() => router.push({ pathname: '/addtask', params: { tasks: JSON.stringify(tasks) } })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 }
});

export default HomeScreen;
