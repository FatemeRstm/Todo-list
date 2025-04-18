import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  // State برای ذخیره لیست تودو
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // useEffect برای بارگذاری داده‌ها از LocalStorage (در صورت وجود)
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // ذخیره تغییرات در LocalStorage هر بار که tasks تغییر می‌کنه
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // تابع برای اضافه کردن تسک جدید
  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); // پاک کردن ورودی پس از افزودن تسک
    }
  };

  // تابع برای تغییر وضعیت تکمیل شدن یک تسک
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // تابع برای حذف یک تسک
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3" align="center" gutterBottom>
          To-Do List
        </Typography>

        {/* <TextField
          fullWidth
          label="New Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{
            mb: 2
            ,"& .MuiOutlinedInput-root": {
            "& fieldset": {
            borderColor: "#F42272", // رنگ اولیه بوردر
              },
      "&:hover fieldset": {
        borderColor: "#d81b63", // هنگام هاور
      },
    }}
        /> */}
        <TextField
          fullWidth
          label="New Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{
            mb: 2,
          }}
        />

        <Button
          fullWidth
          sx={{ backgroundColor: "#F42272", fontSize: " 1.2rem" }}
          variant="contained"
          onClick={addTask}
        >
          Add Task
        </Button>
        <List sx={{ mt: 2 }}>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              Button
              onClick={() => toggleTaskCompletion(index)}
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteTask(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
