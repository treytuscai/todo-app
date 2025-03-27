import React from "react";
import { render, waitFor, fireEvent, act } from "@testing-library/react-native";
import HomeScreen from "../app/index";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage and hooks
jest.mock("expo-router", () => ({
    useRouter: jest.fn(),
    useFocusEffect: jest.fn()
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));


describe("Home Screen Render", () => {
    it("Home Screen renders correctly and loads tasks", async () => {
        // Mock the router push function
        useRouter.mockReturnValue({
            push: jest.fn(),
        });

        // Mock AsyncStorage.getItem to return a predefined list of tasks
        const mockTasks = [
            { id: "1", title: "Task 1", completed: false, category: "Work" },
            { id: "2", title: "Task 2", completed: true, category: "Personal" },
        ];
        AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockTasks));
        useFocusEffect.mockImplementation((callback) => callback());


        const { getByText } = render(<HomeScreen />);


        await waitFor(() => {
            expect(getByText("Work")).toBeTruthy();
            expect(getByText("Personal")).toBeTruthy();
        });
    });
});

describe("Section Toggle", () => {
    it("toggles section visibility when header is clicked", async () => {
        const mockTasks = [
            { id: "1", title: "Task 1", completed: false, category: "Work" },
            { id: "2", title: "Task 2", completed: true, category: "Work" },
            { id: "3", title: "Task 3", completed: false, category: "Personal" },
        ];
        AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockTasks));
        useFocusEffect.mockImplementation((callback) => callback());

        const { getByText, queryByText } = render(<HomeScreen />);

        await waitFor(() => {
            expect(getByText("Work")).toBeTruthy();
            expect(getByText("Personal")).toBeTruthy();
        });

        // Verify that tasks are initially collapsed
        expect(queryByText("Task 1")).toBeNull();
        expect(queryByText("Task 2")).toBeNull();
        expect(queryByText("Task 3")).toBeNull();

        // Simulate clicking the "Work" section header
        fireEvent.press(getByText("Work"));

        await waitFor(() => {
            expect(getByText("Task 1")).toBeTruthy();
            expect(getByText("Task 2")).toBeTruthy();
        });

        // Simulate clicking the "Work" section header again to collapse it
        fireEvent.press(getByText("Work"));

        await waitFor(() => {
            expect(queryByText("Task 1")).toBeNull();
            expect(queryByText("Task 2")).toBeNull();
        });

        // Simulate clicking the "Personal" section header
        fireEvent.press(getByText("Personal"));

        await waitFor(() => {
            expect(getByText("Task 3")).toBeTruthy();
        });

        // Simulate clicking the "Personal" section header again to collapse it
        fireEvent.press(getByText("Personal"));

        await waitFor(() => {
            expect(queryByText("Task 3")).toBeNull();
        });
    });
});

describe("Task Actions", () => {
    it("completes a task", async () => {
        const mockTasks = [
            { id: "1", title: "Task 1", completed: false, category: "Work" },
        ];
        AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockTasks));
        useFocusEffect.mockImplementation((callback) => callback());

        const { getByText } = render(<HomeScreen />);

        await waitFor(() => {
            expect(getByText("Work")).toBeTruthy();
        });

        
        await act(async () => {
            fireEvent.press(getByText("Work"));
        });
        fireEvent.press(getByText("Task 1"));

        // Wait for the task completion to be reflected
        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith(
                "tasks",
                JSON.stringify([{ id: "1", title: "Task 1", completed: true, category: "Work" }])
            );
        });
    });

    it("deletes a task", async () => {
        const mockTasks = [
            { id: "1", title: "Task 1", completed: false, category: "Work" },
        ];
        AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockTasks));
        useFocusEffect.mockImplementation((callback) => callback());

        const { getByText, queryByText } = render(<HomeScreen />);

        await waitFor(() => {
            expect(getByText("Work")).toBeTruthy();
        });

        await act(async () => {
            fireEvent.press(getByText("Work"));
        });
        fireEvent.press(getByText("X"));

        // Wait for the task to be removed from AsyncStorage
        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith(
                "tasks",
                JSON.stringify([])
            );
            expect(queryByText("Task 1")).toBeNull();
        });
    });
});