import React, { useState } from 'react';
import {  CheckCircle2, XCircle, Edit3, Trash2, Save } from 'lucide-react';

const TodoItem = ({ todo, onUpdate, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.todo);
  
    const handleSave = () => {
      if (editedText.trim()) {
        onUpdate(todo.id, { ...todo, todo: editedText.trim() });
        setIsEditing(false);
      }
    };
  
    return (
      <div className={`group p-4 rounded-xl transition-all duration-300 ${
        todo.completed ? 'bg-green-100/20' : 'bg-white/10'
      } hover:transform hover:scale-[1.02] hover:shadow-lg`}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onToggle(todo.id)}
            className={`rounded-full p-1 transition-colors duration-200 ${
              todo.completed ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            {todo.completed ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
          </button>
  
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="flex-1 bg-transparent border-b-2 border-blue-400 focus:outline-none px-2 py-1 text-white"
              autoFocus
            />
          ) : (
            <span className={`flex-1 text-white ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.todo}
            </span>
          )}
  
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!todo.completed && (
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
              >
                {isEditing ? <Save size={20} className="text-blue-400" /> : <Edit3 size={20} className="text-blue-400" />}
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
            >
              <Trash2 size={20} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default TodoItem;
