import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import TaskForm from '../components/TaskForm';

const CreateTaskPage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>Create New Task</Typography>
                <TaskForm />
            </Paper>
        </Container>
    );
};

export default CreateTaskPage;
