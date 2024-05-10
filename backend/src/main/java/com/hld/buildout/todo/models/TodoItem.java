package com.hld.buildout.todo.models;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class TodoItem {
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long id;
    private String description;
    private boolean complete;
}
