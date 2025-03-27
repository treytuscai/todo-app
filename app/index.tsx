import React, { useCallback, useState } from "react";
import { View, SectionList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import TaskItem from "./components/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
    id: string;
    title: string;
    completed: boolean;
    category: string;
}

interface Section {
    title: string;
    data: Task[];
}

const groupTasksByCategory = (tasks: Task[]): Section[] => {
    return tasks.reduce((sections: Section[], task) => {
        const sectionIndex = sections.findIndex((sec) => sec.title === task.category);
        if (sectionIndex !== -1) {
            sections[sectionIndex].data.push(task);
        } else {
            sections.push({ title: task.category, data: [task] });
        }
        return sections;
    }, []);
};

const HomeScreen = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>({});
    const router = useRouter();

    const loadTasks = async () => {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const saveTasks = async (updatedTasks: Task[]) => {
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

    const toggleSection = (title: string) => {
        setCollapsedSections(prev => ({
            ...prev,
            [title]: prev[title] === undefined ? false : !prev[title],
        }));
    };

    const groupedSections = groupTasksByCategory(tasks);
    const sections = groupedSections.map(section => ({
        title: section.title,
        data: collapsedSections[section.title] !== undefined
            ? (collapsedSections[section.title] ? [] : section.data)
            : []  // default to collapsed
    }));

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
                )}
                renderSectionHeader={({ section: { title } }) => {
                    const isCollapsed = collapsedSections[title] !== undefined ? collapsedSections[title] : true;
                    return (
                        <TouchableOpacity
                            style= {styles.sectionHeaderContainer}
                            onPress={() => toggleSection(title)}>
                            <Text style={styles.arrow}>{isCollapsed ? "▲" : "▼"}</Text>
                            <Text style={styles.sectionHeader}>{title}</Text>
                        </TouchableOpacity>
                    );
                }}
                stickySectionHeadersEnabled/>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push({ pathname: '/addtask', params: { tasks: JSON.stringify(tasks) } })}>
                    <Text style={styles.addButtonText}>+ Add Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 20,
        paddingBottom: 100,
    },
    sectionHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 0,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
    },
    arrow: {
        fontSize: 18,
        marginRight: 10,
        color: "#5cb85c",
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    footer: {
        backgroundColor: "#5cb85c",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
    },
    addButton: {
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 40,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        marginTop: 10,
    },
    addButtonText: {
        color: "#5cb85c",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default HomeScreen;
