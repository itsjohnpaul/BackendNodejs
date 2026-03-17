import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;

    await axios.post("http://localhost:3000/todos", {
      text: text
    });

    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    fetchTodos();
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;

    await axios.put(`http://localhost:3000/todos/${id}`, {
      text: editText
    });

    setEditId(null);
    setEditText("");
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">

      <div className="bg-gray-800 p-6 rounded-2xl w-[350px] shadow-lg">

        <h1 className="text-white text-xl mb-4 text-center font-bold">
          Todo App
        </h1>

        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task"
            className="flex-1 p-2 rounded bg-gray-700 text-white outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 px-3 rounded text-white hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        {todos.map((todo) => (
          <div key={todo._id} className="bg-gray-700 p-3 rounded mb-2">

            {editId === todo._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-600 text-white rounded"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => updateTodo(todo._id)}
                    className="bg-green-500 px-2 py-1 text-white rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 px-2 py-1 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white">{todo.text}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditId(todo._id);
                      setEditText(todo.text);
                    }}
                    className="bg-yellow-500 px-2 py-1 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-500 px-2 py-1 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;