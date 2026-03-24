import React, { useEffect, useState } from "react";
import axios from "axios";

function Todo({ username, setPage }) {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const getTodos = async () => {
    const res = await axios.get("http://localhost:3000/todos", {
      headers: { Authorization: token }
    });
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;

    await axios.post(
      "http://localhost:3000/addTodo",
      { text },
      { headers: { Authorization: token } }
    );

    setText("");
    getTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`, {
      headers: { Authorization: token }
    });
    getTodos();
  };

  const updateTodo = async (id) => {
    await axios.put(
      `http://localhost:3000/update/${id}`,
      { text },
      { headers: { Authorization: token } }
    );

    setEditId(null);
    setText("");
    getTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setShowMenu(false);
    setPage("login");
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setText(todo.text);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-purple-600 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-md">
        <h1 className="text-base sm:text-lg md:text-xl font-bold">
          My Todos
        </h1>

        <div className="relative">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold cursor-pointer"
          >
            {username?.charAt(0).toUpperCase()}
          </div>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white text-black rounded-xl shadow-lg p-2 sm:p-3">
              <p className="text-xs sm:text-sm font-semibold mb-2 truncate">
                {username}
              </p>

              <button
                onClick={logout}
                className="w-full text-left text-red-500 hover:bg-gray-100 p-2 rounded-lg text-xs sm:text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6 sm:mt-8 px-3 sm:px-4">
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md flex gap-2 w-full max-w-md">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={addTodo}
            className="bg-purple-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-purple-700 text-sm sm:text-base"
          >
            Add
          </button>

        </div>
      </div>

      <div className="flex justify-center mt-5 sm:mt-6 px-3 sm:px-4">
        <div className="w-full max-w-md">

          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-6 text-sm sm:text-base">
              No tasks yet 🚀
            </p>
          )}

          {todos.map((t) => (
            <div
              key={t._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-3 sm:p-4 mb-3 rounded-xl shadow-sm border gap-2"
            >

              {editId === t._id ? (
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="border p-2 rounded-lg w-full text-sm sm:text-base"
                />
              ) : (
                <span className="text-gray-700 text-sm sm:text-base break-words">
                  {t.text}
                </span>
              )}

              <div className="flex gap-2 justify-end sm:justify-start">

                {editId === t._id ? (
                  <button
                    onClick={() => updateTodo(t._id)}
                    className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(t)}
                    className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(t._id)}
                  className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm"
                >
                  ✕
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Todo;