package com.hld.buildout.todo.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(
        name = "todo_items"
)
@RequiredArgsConstructor
public class TodoItemEntity {
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private boolean complete;
}
