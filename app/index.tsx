import React, { useCallback } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        style={styles.taskItem}
                    />
                )}
                contentContainerStyle={styles.taskList}
            />
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push({ pathname: '/addtask', params: { tasks: JSON.stringify(tasks) } })}
                >
                    <Text style={styles.addButtonText}>+ Add Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
        paddingBottom: 100,
    },
    taskList: {
        paddingBottom: 20,
    },
    footer: {
        backgroundColor: '#5cb85c',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 40,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        marginTop: 20,
    },
    addButtonText: {
        color: '#5cb85c', // Green text to match theme
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
