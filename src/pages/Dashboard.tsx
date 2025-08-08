// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton } from "@/components/auth/UserButton";
import { motion } from "framer-motion";
import { CheckSquare, Plus, Trash2, Edit2, X, Check } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router";

export default function Dashboard() {
  const { user } = useAuth();
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await addTodo({ text: newTodo.trim() });
      setNewTodo("");
      toast("Todo added successfully!");
    } catch (error) {
      toast("Failed to add todo");
    }
  };

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      toast("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      await deleteTodo({ id });
      toast("Todo deleted successfully!");
    } catch (error) {
      toast("Failed to delete todo");
    }
  };

  const handleStartEdit = (id: Id<"todos">, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editText.trim()) return;

    try {
      await updateTodo({ id: editingId, text: editText.trim() });
      setEditingId(null);
      setEditText("");
      toast("Todo updated successfully!");
    } catch (error) {
      toast("Failed to update todo");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const completedCount = todos?.filter(todo => todo.completed).length || 0;
  const totalCount = todos?.length || 0;

  return (
    <Protected>
      <div className="min-h-screen bg-background text-foreground dark">
        <header className="border-b-2 bg-background sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <CheckSquare className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">TodoApp</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome back, {user?.name}!
              </span>
              <UserButton />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6 border-2 shadow-[8px_8px_0px_hsl(var(--border))] rounded-md">
              <CardHeader className="border-b-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Your Todos</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {completedCount} of {totalCount} completed
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
                  <Input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 rounded-md border-2"
                  />
                  <Button type="submit" size="icon" className="rounded-md border-2 shadow-[2px_2px_0px_hsl(var(--border))] hover:shadow-none active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all">
                    <Plus className="h-4 w-4" />
                  </Button>
                </form>

                <div className="space-y-2">
                  {todos?.map((todo) => (
                    <motion.div
                      key={todo._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 p-3 rounded-md border-2 bg-card"
                    >
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => handleToggleTodo(todo._id)}
                        className="rounded-sm"
                      />
                      
                      {editingId === todo._id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 rounded-md border-2"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveEdit();
                              if (e.key === "Escape") handleCancelEdit();
                            }}
                            autoFocus
                          />
                          <Button size="icon" variant="ghost" onClick={handleSaveEdit} className="rounded-md">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="rounded-md">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span
                            className={`flex-1 ${
                              todo.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {todo.text}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleStartEdit(todo._id, todo.text)}
                            className="rounded-md"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteTodo(todo._id)}
                            className="rounded-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </motion.div>
                  ))}

                  {todos?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border-2 rounded-md">
                      <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No todos yet. Add one above to get started!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </Protected>
  );
}