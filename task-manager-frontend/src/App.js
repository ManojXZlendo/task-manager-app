import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import DashboardPage from './pages/DashboardPage';
import CreateTaskPage from './pages/CreateTaskPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/create-task" element={<CreateTaskPage />} />
                </Routes>
            </Router>
        </Provider>
        </DndProvider>
    );
};

export default App;
