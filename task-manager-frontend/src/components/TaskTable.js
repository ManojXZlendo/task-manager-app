import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, CheckCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTask,
} from "../features/tasks/taskSlice";
import TaskForm from "./TaskForm";

const TaskTable = ({ tasks }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editTask, setEditTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = async (taskId) => {
    await dispatch(deleteTask(taskId));
    dispatch(fetchTasks());
  };

  const handleMarkComplete = async (task) => {
    const updatedTask = { ...task, status: "Done" };
    await dispatch(updateTask(updatedTask));
    dispatch(fetchTasks());
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async (updatedTask) => {
    await dispatch(updateTask(updatedTask));
    dispatch(fetchTasks());
    setIsEditModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedTasks = tasks.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  const paginatedTasks = sortedTasks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={order}
                  onClick={() => handleSort("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow key={task.id} hover>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Mark as Complete">
                    <IconButton
                      onClick={() => handleMarkComplete(task)}
                      color="success"
                    >
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton
                      onClick={() => handleDelete(task._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Task">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(task)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={tasks.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Task Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        
        <TaskForm
          task={editTask}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
        />
      </Dialog>
    </Paper>
  );
};

export default TaskTable;
