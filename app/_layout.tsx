import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#5cb85c' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: 'Default Title',
      }}>
    <Stack.Screen name="index" options={{ headerTitle: 'To-Do List'}} />
    <Stack.Screen name="addtask" options={{ headerTitle: 'Add Task'}} />
    </Stack>
  );
}