import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoElement } from '../TodoElement';

enum FilterType {
  All,
  Active,
  Completed,
}

type Props = {
  todos: Todo[];
};

const getTodos = (todos: Todo[], filterMethod: FilterType): Todo[] => {
  switch (filterMethod) {
    case FilterType.Active:
      return todos.filter(todo => !todo.completed);

    case FilterType.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  const visibleTodos = getTodos(todos, filterType);

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <>
      <section className="todoapp__main">
        {visibleTodos.map(todo => (
          <TodoElement todo={todo} key={todo.id} />
        ))}
      </section>

      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${remainingTodos} ${remainingTodos === 1 ? 'item' : 'items'} left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={classNames(
              'filter__link',
              {
                selected: filterType === FilterType.All,
              },
            )}
            onClick={() => {
              if (filterType !== FilterType.All) {
                setFilterType(FilterType.All);
              }
            }}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames(
              'filter__link',
              {
                selected: filterType === FilterType.Active,
              },
            )}
            onClick={() => {
              if (filterType !== FilterType.Active) {
                setFilterType(FilterType.Active);
              }
            }}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames(
              'filter__link',
              {
                selected: filterType === FilterType.Completed,
              },
            )}
            onClick={() => {
              if (filterType !== FilterType.Completed) {
                setFilterType(FilterType.Completed);
              }
            }}
          >
            Completed
          </a>
        </nav>

        {completedTodos && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};