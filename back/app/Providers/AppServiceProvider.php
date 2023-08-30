<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\TodoServices;
use App\Repositories\ToDoRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ToDoRepository::class, TodoServices::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
