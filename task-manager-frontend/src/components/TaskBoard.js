import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';
import { updateTask } from '../features/tasks/taskSlice';

const TaskBoard = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    const [columns, setColumns] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    useEffect(() => {
        setColumns({
            todo: tasks.filter(task => task.status === 'To Do'),
            inProgress: tasks.filter(task => task.status === 'In Progress'),
            done: tasks.filter(task => task.status === 'Done')
        });
    }, [tasks]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        
        // If there's no destination, or the destination is the same as the source, do nothing
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        // Identify the task and its new status
        const taskId = draggableId;
        const newStatus = destination.droppableId;

        // Update task status
        const updatedTask = tasks.find(task => task.id === taskId);
        updatedTask.status = newStatus;

        // Dispatch update to Redux store
        dispatch(updateTask(updatedTask));

        // Manually update columns for instant feedback
        setColumns((prevColumns) => {
            const sourceColumn = Array.from(prevColumns[source.droppableId]);
            const destinationColumn = Array.from(prevColumns[destination.droppableId]);
            
            // Remove task from source and add to destination
            const [movedTask] = sourceColumn.splice(source.index, 1);
            destinationColumn.splice(destination.index, 0, movedTask);

            return {
                ...prevColumns,
                [source.droppableId]: sourceColumn,
                [destination.droppableId]: destinationColumn
            };
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {Object.entries(columns).map(([key, tasks]) => (
                    <Droppable droppableId={key} key={key}>
                        {(provided) => (
                            <TaskColumn
                                title={key === 'todo' ? 'To Do' : key === 'inProgress' ? 'In Progress' : 'Done'}
                                tasks={tasks}
                                innerRef={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {task.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </TaskColumn>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
