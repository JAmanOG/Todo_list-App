
import TodoForm from './components/Todoform'
import TodoItem from './components/TodoItems'
import {useState, useEffect} from 'react'
import { TodoProvider } from './TodoContext/Todocontext';
import { Calendar } from 'lucide-react';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
  
    useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      setTodos(savedTodos);
    }, []);
  
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
  
    const addTodo = (todo) => {
      setTodos(prev => [{ id: Date.now(), ...todo }, ...prev]);
    };
  
    const updateTodo = (id, todo) => {
      setTodos(prev => prev.map(t => t.id === id ? todo : t));
    };
  
    const deleteTodo = (id) => {
      setTodos(prev => prev.filter(t => t.id !== id));
    };
  
    const toggleTodo = (id) => {
      setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };
  
    const filteredTodos = todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  
    return (
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Calendar className="text-blue-400" />
                  Task Manager
                </h1>
                <div className="flex gap-2">
                  {['all', 'active', 'completed'].map(filterType => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${
                        filter === filterType
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {filterType}
                    </button>
                  ))}
                </div>
              </div>
  
              <TodoForm onAddTodo={addTodo} />
  
              <div className="space-y-4">
                {filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                    onToggle={toggleTodo}
                  />
                ))}
                {filteredTodos.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No tasks found. Add some tasks to get started!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </TodoProvider>
    );
  };
  
  export default App;
  
