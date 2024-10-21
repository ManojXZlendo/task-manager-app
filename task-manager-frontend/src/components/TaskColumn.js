import React from 'react';
import { Paper, Typography } from '@mui/material';

const TaskColumn = ({ title, tasks, innerRef, children, ...props }) => (
    <Paper ref={innerRef} {...props} style={{ flex: 1, padding: '16px', margin: '8px', minHeight: '400px' }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        {children}
    </Paper>
);

export default TaskColumn;
