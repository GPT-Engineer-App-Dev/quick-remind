import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Input, Button, VStack, HStack, Checkbox, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <ChakraProvider>
      <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
        <Heading mb={4}>Todo App</Heading>
        <HStack mb={4}>
          <Input 
            placeholder="Add a new task" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
          />
          <Button onClick={addTask} colorScheme="teal">Add</Button>
        </HStack>
        <VStack spacing={4} align="stretch">
          {tasks.map((task, index) => (
            <HStack key={index} spacing={4}>
              <Checkbox 
                isChecked={task.completed} 
                onChange={() => toggleTaskCompletion(index)}
              >
                {task.text}
              </Checkbox>
              <IconButton 
                icon={<DeleteIcon />} 
                onClick={() => deleteTask(index)} 
                colorScheme="red" 
                aria-label="Delete task"
              />
            </HStack>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;