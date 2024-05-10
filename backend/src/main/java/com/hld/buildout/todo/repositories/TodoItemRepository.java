package com.hld.buildout.todo.repositories;

import com.hld.buildout.todo.entities.TodoItemEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoItemRepository extends CrudRepository<TodoItemEntity, Long> {
}
