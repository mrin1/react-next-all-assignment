import React, { useState, type ChangeEvent, type FormEvent } from "react";

interface todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

const TodoList = () => {
  const [inputTodo, setInputTodo] = useState<todo>({
    id: 0,
    title: "",
    description: "",
    status: false,
  });

  const [todoList, setTodoList] = useState<todo[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputTodo({
      ...inputTodo,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const addTodo: todo = {
      id: Math.floor(Math.random() * 100),
      title: inputTodo.title,
      description: inputTodo.description,
      status: true,
    };

    setTodoList([...todoList, addTodo]);
    setInputTodo({ id: 0, title: "", description: "", status: false });
  };
  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };
  const handleStatus = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id == id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-10 px-4">
        <h1 className="text-4xl font-bold bg-black text-white p-5 mb-6 rounded-md">
          TodoList
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 bg-slate-50">
            <input
              className="border border-gray-500 rounded-3xl text-center"
              type="text"
              name="title"
              placeholder="Enter Title"
              value={inputTodo.title}
              onChange={handleChange}
            />
            <input
              className="border border-gray-500 rounded-3xl text-center"
              type="text"
              name="description"
              placeholder="Enter Description"
              value={inputTodo.description}
              onChange={handleChange}
            />
            <button className="border-2 rounded-md  " type="submit">
              AddTodo
            </button>
          </div>
        </form>
        <div className="w-full pt-16">
          <table className="min-w-full bg-white-border rounded-2xl  border-gray-700 pt-40">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-5 text-left">Title</th>
                <th className="py-2 px-6 text-left">Description</th>
                <th className="py-2 px-14 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="border-black border-[2px]">
              {todoList?.map((todo, index) => (
                <tr key={todo.id || index}>
                  <td className="py-2 px-3 border-black border-[2px] ">
                    {todo.id}
                  </td>
                  <td className="py-2 px-4 border-black border-[2px]">
                    {todo.title}
                  </td>
                  <td className="py-4 px-4 border-black border-[2px]">
                    {todo.description}
                  </td>
                  <td className="py-2 px-4 border-black border-[2px]">
                    {todo.status}
                    <div className=" flex gap-4 ">
                      <button
                        type="button"
                        className="bg-red-600 p-2 border rounded-[5px]"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className={`p-2 border rounded-[5px] ${
                          todo.status ?  "bg-red-600" : "bg-green-600"
                        }`}
                        onClick={() => handleStatus(todo.id)}
                      >
                        {todo.status ?  "Pending": "Completed"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TodoList;
