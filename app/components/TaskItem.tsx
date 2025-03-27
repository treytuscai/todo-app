import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

interface TaskItemProps {
  task: { id: string; title: string; completed: boolean };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.task}>
        <Text style={[styles.text, task.completed && styles.completed]}>{task.title}</Text>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  task: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  delete: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default TaskItem;
