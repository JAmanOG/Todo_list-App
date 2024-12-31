import React, { useState, } from 'react';
import { PlusCircle, } from 'lucide-react';
import { Alert, AlertDescription } from './AlertUI';

const TodoForm = ({ onAddTodo }) => {
  const [todo, setTodo] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    onAddTodo({ todo: todo.trim(), completed: false });
    setTodo("");
  };

  return (
    <div className="space-y-4">
      {showAlert && (
        <Alert variant="destructive" className="bg-red-100 border-red-400">
          <AlertDescription>
            Please enter a todo item before adding
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white/10 text-white placeholder-gray-400"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
