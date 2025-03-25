import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TaskItemProps {
  task: { id: string; title: string; completed: boolean };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.task}>
      <Text style={[styles.text, task.completed && styles.completed]}>{task.title}</Text>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: { padding: 10, flexDirection: 'row', justifyContent: 'space-between' },
  text: { fontSize: 18 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { color: 'red' },
});

export default TaskItem;