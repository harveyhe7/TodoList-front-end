import React, { useState, useEffect } from "react";
import api from "./services/Axios";
import axios from "axios";

const AxiosGetTodoList = () => {
    const [todos, setTodos] = useState([]);
    async function fetchTodos() {
        const { data } = await api.get('/todos');
        setTodos(data);
    }
    useEffect(() => {
        fetchTodos();
    }, []);


    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
};
export default AxiosGetTodoList; 