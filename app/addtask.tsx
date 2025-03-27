import { useLocalSearchParams, useRouter } from 'expo-router';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import uuid from 'react-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = () => {
    const [task, setTask] = useState('');
    const [section, setSection] = useState('');
    const router = useRouter();
    const params = useLocalSearchParams();
    const tasks = params.tasks ? JSON.parse(params.tasks as string) : [];

    const addTask = async () => {
        if (task.trim().length === 0) return;
        const newTask = {
            id: uuid(),
            title: task,
            completed: false,
            category: section.trim() || 'Uncategorized',
        };
        const updatedTasks = [...tasks, newTask];
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Add a New Task</Text>
                <TextInput
                    placeholder="Enter Task"
                    onChangeText={setTask}
                    value={task}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Section/Category"
                    onChangeText={setSection}
                    value={section}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTask}>
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
        marginTop: 16,
        justifyContent: 'flex-start',
    },
    content: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    addButton: {
        backgroundColor: '#5cb85c',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddTaskScreen;
