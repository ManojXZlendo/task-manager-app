import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';

const steps = ['Task Details', 'Assign Team Members', 'Set Deadlines'];

const TaskForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: ''
    });

    const dispatch = useDispatch();

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1);
        } else {
            handleSubmit();
        }
    };
    
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = () => {
        dispatch(addTask(taskData));
        // Reset form and close wizard
        setTaskData({
            title: '',
            description: '',
            assignedTo: '',
            dueDate: ''
        });
        setActiveStep(0);
    };

    const isStepOptional = (step) => step === 1;

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Task Title"
                            name="title"
                            value={taskData.title}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={taskData.description}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Assigned To"
                            name="assignedTo"
                            value={taskData.assignedTo}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Due Date"
                            name="dueDate"
                            type="date"
                            value={taskData.dueDate}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h4" align="center" gutterBottom>Task Creation Wizard</Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box mt={4}>
                {renderStepContent(activeStep)}
                <Box display="flex" justifyContent="space-between" mt={3}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                        color="secondary"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        color="primary"
                    >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TaskForm;
