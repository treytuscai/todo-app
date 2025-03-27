import { useLocalSearchParams, useRouter } from 'expo-router';
import { TextInput, Text, Button, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import uuid from 'react-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = () => {
    const [task, setTask] = useState('');
    const [section, setSection] = useState("");
    const router = useRouter();
    const params = useLocalSearchParams();
    const tasks = params.tasks ? JSON.parse(params.tasks as string) : [];

    const addTask = async () => {
        if (task.trim().length === 0) return;
        const newTask = {
            id: uuid(),
            title: task,
            completed: false,
            category: section.trim() || "Uncategorized"
        };
        const updatedTasks = [...tasks, newTask];
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
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
                <Button title="Add Task" onPress={addTask} color="#5cb85c" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});

export default AddTaskScreen;