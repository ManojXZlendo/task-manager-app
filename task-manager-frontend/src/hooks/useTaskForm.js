import { useState } from 'react';

const useTaskForm = () => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const resetForm = () => {
        setTaskData({
            title: '',
            description: '',
            assignedTo: '',
            dueDate: ''
        });
    };

    return {
        taskData,
        handleInputChange,
        resetForm
    };
};

export default useTaskForm;
