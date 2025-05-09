/* eslint-disable no-undef */
// const { test } = require("picomatch");
const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    add({title: "Test Todo", completed: false, dueDate: today});
    add({title: "Test Todo", completed: false, dueDate: yesterday});
    add({title: "Test Todo", completed: false, dueDate: tomorrow});
    add({title: "Test Todo", completed: false, dueDate: new Date().toISOString().slice(0, 10)});
  })
  test("Should add a new todo", () => {
    const todoItemsCountBefore = all.length;
    const newTodo = { title: "Added Todo", completed: false, dueDate: new Date().toISOString().slice(0, 10) };
    add(newTodo);
    const todoItemsCountAfter = all.length;
    expect(todoItemsCountAfter).toBe(todoItemsCountBefore + 1);
    expect(all[todoItemsCountAfter - 1]).toMatchObject(newTodo);
  });
  
  test("Should retrieve overdue items", () => {
    //const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  
    // Add a known overdue todo
    add({ title: "Overdue Item", completed: false, dueDate: yesterday });
  
    const overdueItems = overdue();
    const titles = overdueItems.map((todo) => todo.title);
    expect(titles).toContain("Overdue Item");
  });
  

  test("Should retrieve due today items", () => {
    const today = new Date().toISOString().slice(0, 10);
  
    // Add a known due today item
    add({ title: "Today Item", completed: false, dueDate: today });
  
    const dueTodayItems = dueToday();
    const titles = dueTodayItems.map((todo) => todo.title);
    expect(titles).toContain("Today Item");
  });
  
  
  test("Should retrieve due later items", () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  
    // Add a known due later item
    add({ title: "Future Item", completed: false, dueDate: tomorrow });
  
    const dueLaterItems = dueLater();
    const titles = dueLaterItems.map((todo) => todo.title);
    expect(titles).toContain("Future Item");
  });
  
  
  test("Should format todos using toDisplayableList", () => {
    const today = new Date().toISOString().slice(0, 10);
    const sampleTodo = { title: "Sample", completed: false, dueDate: today };
    const formatted = toDisplayableList([sampleTodo]);
    expect(formatted).toBe("[ ] Sample ");
  });
  

  test("Should mark a todo as complete", () => {
    // const initialLength = all.length;
    add({ title: "Complete me", completed: false, dueDate: new Date().toISOString().slice(0, 10) });
    const index = all.length - 1;
    expect(all[index].completed).toBe(false);
    markAsComplete(index);
    expect(all[index].completed).toBe(true);
  });
  
})