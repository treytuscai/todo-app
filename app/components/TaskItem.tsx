import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

interface TaskItemProps {
    task: { id: string; title: string; completed: boolean; category: string };
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.task}>
                <View style={styles.taskContent}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={[styles.text, task.completed && styles.completed]}>
                        {task.title}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 8,
        marginHorizontal: 32,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
    },
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bullet: {
        fontSize: 18,
        marginRight: 8,
        color: "#5cb85c",
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    delete: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 8,
    },
});

export default TaskItem;
