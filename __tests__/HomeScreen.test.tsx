import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../app/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const renderHomeScreen = () => {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('HomeScreen', () => {
  it('should render the home screen and display tasks', async () => {
    const { getByText } = renderHomeScreen();
    expect(getByText('Task 1')).toBeTruthy();
  });

  it('should navigate to AddTask screen when "Add Task" button is pressed', () => {
    const { getByText } = renderHomeScreen();
    const addButton = getByText('Add Task');
    fireEvent.press(addButton);
    expect(addButton).toBeTruthy();
  });
});
