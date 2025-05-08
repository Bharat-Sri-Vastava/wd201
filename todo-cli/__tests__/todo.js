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
    const todoItemsCount = all.length;
    add(
      {
        title: "Test Todo",
        completed: false,
        dueDate: new Date().toISOString().slice(0, 10)
      }
    );
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.every(todo => todo.dueDate < new Date().toISOString().slice(0,10))).toBe(true);
  })

  test("Should retrieve due today items", () => {
    const today = new Date().toISOString().slice(0, 10);
    const dueTodayItems = dueToday();
    expect(dueTodayItems.every(todo => todo.dueDate === today)).toBe(true);
  });
  
  test("Should retrieve due later items", () => {
    const today = new Date().toISOString().slice(0, 10);
    const dueLaterItems = dueLater();
    expect(dueLaterItems.every(todo => todo.dueDate > today)).toBe(true);
  });
  
  test("Should format todos using toDisplayableList", () => {
    const output = toDisplayableList(dueToday());
    expect(typeof output).toBe("string");
    expect(output.length).toBeGreaterThan(0);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  })
})