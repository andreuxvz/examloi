<?php

namespace App\Repositories;

interface ToDoRepository
{
    public function store($todo);
    public function deleteById($todoId);
    public function getById($todoId);
    public function all();
}
