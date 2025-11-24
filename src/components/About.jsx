import React, { useState } from "react";

const About = () => {
  const [title, setTitle] = useState("");
  const [disc, setDisc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !disc.trim())
      return alert("Please fill in both fields before adding a task.");

    const newTask = {
      id: Date.now(),
      title,
      disc,
    };

    setMainTask([...mainTask, newTask]);
    setTitle("");
    setDisc("");
  };

  const deleteHandler = (id) => {
    setMainTask(mainTask.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          📝 Task Manager
        </h1>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <input
            type="text"
            value={disc}
            onChange={(e) => setDisc(e.target.value)}
            placeholder="Enter description"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Add
          </button>
        </form>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Task List */}
        <ul className="space-y-4">
          {mainTask.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No tasks yet — start adding some! 💤
            </p>
          ) : (
            mainTask.map((task) => (
              <li
                key={task.id}
                className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex justify-between items-start hover:shadow-md transition-all"
              >
                <div>
                  <h4 className="font-semibold text-indigo-800 text-lg">
                    {task.title}
                  </h4>
                  <p className="text-gray-600 mt-1">{task.disc}</p>
                </div>
                <button
                  onClick={() => deleteHandler(task.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default About;
