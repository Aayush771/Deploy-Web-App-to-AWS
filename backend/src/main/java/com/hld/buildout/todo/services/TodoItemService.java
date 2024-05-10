package com.hld.buildout.todo.services;

import com.hld.buildout.todo.entities.TodoItemEntity;
import com.hld.buildout.todo.models.TodoItem;
import com.hld.buildout.todo.repositories.TodoItemRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoItemService {
    private final TodoItemRepository repository;
    private final ModelMapper modelMapper;

    public List<TodoItem> getAllTodoItems() {
        Iterable<TodoItemEntity> entities = repository.findAll();
        List<TodoItem> todoItems = new ArrayList<>();

        for (TodoItemEntity entity : entities) {
            todoItems.add(modelMapper.map(entity, TodoItem.class));
        }

        return todoItems;
    }

    public TodoItem saveTodoItem(TodoItem item) {
        if (item.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description is missing");
        }
        TodoItemEntity entity = repository.save(modelMapper.map(item, TodoItemEntity.class));
        return modelMapper.map(entity, TodoItem.class);
    }

    public void deleteTodoItem(Long id) {
        repository.deleteById(id);
    }
}
