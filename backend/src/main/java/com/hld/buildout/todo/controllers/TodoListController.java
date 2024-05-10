package com.hld.buildout.todo.controllers;

import com.hld.buildout.todo.models.TodoItem;
import com.hld.buildout.todo.services.TodoItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todo")
@RequiredArgsConstructor
public class TodoListController {
    private final TodoItemService service;

    @GetMapping
    public ResponseEntity<List<TodoItem>> getAll() {
        return ResponseEntity.ok(service.getAllTodoItems());
    }

    @PostMapping
    public ResponseEntity<TodoItem> save(@RequestBody TodoItem item) {
        try {
            return ResponseEntity.ok(service.saveTodoItem(item));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        try {
            service.deleteTodoItem(id);
            return ResponseEntity.ok("ok");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error");
        }
    }
}
