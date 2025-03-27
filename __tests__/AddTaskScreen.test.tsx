import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTaskScreen from '../app/addtask';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage and hooks
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

describe('AddTaskScreen', () => {
  const mockRouterBack = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ back: mockRouterBack });
    useLocalSearchParams.mockReturnValue({ tasks: '[]' }); // No tasks initially
    AsyncStorage.setItem.mockResolvedValue(); 
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddTaskScreen />);

    expect(getByPlaceholderText('Enter Task')).toBeTruthy();
    expect(getByPlaceholderText('Enter Section/Category')).toBeTruthy();
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('updates task input when user types', () => {
    const { getByPlaceholderText } = render(<AddTaskScreen />);
    const taskInput = getByPlaceholderText('Enter Task');

    fireEvent.changeText(taskInput, 'New Task');
    expect(taskInput.props.value).toBe('New Task');
  });

  it('updates section input when user types', () => {
    const { getByPlaceholderText } = render(<AddTaskScreen />);
    const sectionInput = getByPlaceholderText('Enter Section/Category');

    fireEvent.changeText(sectionInput, 'Work');
    expect(sectionInput.props.value).toBe('Work');
  });
});
