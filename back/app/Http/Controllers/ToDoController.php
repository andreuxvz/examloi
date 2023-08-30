<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use App\Repositories\ToDoRepository;
use App\Http\Resources\Todos as TodoResource;

class ToDoController extends Controller
{
    protected $todo;

    public function __construct(ToDoRepository $toDoService)
    {
        $this->todo = $toDoService;
    }

    public function index(Request $request)
    {
        $todos = $this->todo->all();

        return Response::json(['data' => $todos, 'msg' => 'To-dos Retrieved Successfully.']);
    }

    public function show($id)
    {
        $todo = $this->todo->getById($id);

        if (is_null($todo)) {
            return Response::json(['data' => [], 'msg' => 'To-do not found.']);
        }

        return Response::json(['data' => $todo, 'msg' => 'To-do Retrieved Successfully.']);
    }


    public function store(Request $request)
    {
        $todo = $this->todo->store($request->todo);
        return Response::json([
            'data' => $todo
        ], 201);
    }

    public function destroy($id)
    {
        $todo = $this->todo->deleteById($id);
        $msg = $todo ? 'To-do Deleted Successfully.' : 'To-do not found.';
        return  Response::json(['data' => [], 'msg' => $msg]);

    }
}
