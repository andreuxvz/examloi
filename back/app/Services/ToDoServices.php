<?php

namespace App\Services;

use App\Repositories\ToDoRepository;
use App\Models\ToDo;

class ToDoServices implements ToDoRepository
{
    // protected $api_key;
    public function __construct()
    {
        // $this->api_key = $api_key;
    }

    public function all()
    {
        $toDo = ToDo::all();
        return $toDo;
    }

    public function store($todo)
    {
        $toDo = ToDo::create(['todo' => $todo]);
        return $toDo;
    }

    public function getById($todoId)
    {
        $toDo = ToDo::find($todoId);
        return $toDo;
    }

    public function deleteById($todoId)
    {
        $toDo = ToDo::destroy($todoId);
        return $toDo;
    }
}
