import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import TaskTable from "../components/TaskTable";
import TaskBoard from "../components/TaskBoard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
      {/* Dashboard Header */}
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        style={{ fontWeight: 600, color: "#3f51b5" }}
      >
        Task Dashboard
      </Typography>

      {/* Create Task Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create-task"
          style={{
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Create New Task
        </Button>
      </div>

      {/* Task Sections */}
      <Grid container spacing={4}>
        {/* Tasks Table Section */}
        <Grid item xs={12} md={6}>
          <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: 500, color: "#2c3e50" }}
              >
                Tasks Table
              </Typography>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "2rem 0",
                  }}
                >
                  <CircularProgress color="primary" />
                </div>
              ) : (
                <TaskTable tasks={tasks} />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Task Board Section */}
        <Grid item xs={12} md={6}>
          <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: 500, color: "#2c3e50" }}
              >
                Task Board
              </Typography>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "2rem 0",
                  }}
                >
                  <CircularProgress color="primary" />
                </div>
              ) : (
                <TaskBoard />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
