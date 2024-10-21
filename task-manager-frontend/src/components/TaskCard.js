import React from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    return (
        <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskCard;
