export type RootStackParamList = {
    Home: undefined;
    AddTask: {
        saveTasks: (tasks: { id: string; title: string; completed: boolean }[]) => void,
        tasks: { id: string; title: string; completed: boolean }[]
    };
};