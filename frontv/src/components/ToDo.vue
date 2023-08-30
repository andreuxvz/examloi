<template>
  <v-container>
    <v-form
      @submit.prevent="add"
      ref="form">
      <v-row justify="center">
        <v-col cols="8" sm="10" md="5">
          <v-text-field
            label="New Task"
            v-model="newTask"
            :rules="[required]"
            clearable
            placeholder="Clean the house"
            type="text"
            :key="newKey"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4" sm="2" md="1">
          <v-btn
            :disabled="!newTask"
            color="success"
            type="submit"
            size="x-large"
            :loading="loading"
          >
            + Add
            <template v-slot:loader>
              <v-progress-linear indeterminate></v-progress-linear>
            </template>
          </v-btn>
          <!-- <v-btn block rounded="0" size="x-large" icon="$vuetify" variant="plain">New ToDo</v-btn> -->
        </v-col>
      </v-row>
    </v-form>

    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-toolbar color="cyan-lighten-1" >
          <v-btn variant="text" icon="mdi-menu"></v-btn>
          <v-toolbar-title>Tasks ({{items.length}})</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
        >
          <to-do-item :item="item"></to-do-item>
          <template v-slot:append>
            <v-icon icon="mdi-delete" @click="remove(item.id)"></v-icon>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="green"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>


<script setup >
  import { ref, onMounted, reactive, onBeforeMount } from 'vue';
  import  TodoService from '../services/TodoService';
  import ToDoItem from './ToDoItem.vue';

  const items = ref([]);
  const newTask = ref('');
  const dirtyState = ref(false);
  const newKey = ref(0);
  const formModel = ref();
  const loading = ref(false);
  let todoService = '';
  
  onBeforeMount(() => {
    todoService = new TodoService(loading)
  })

  onMounted(() => {
    getAll();
    // todoService =  new TodoService(loading)
  });

  const getAll = async () => {
    const { data } = await todoService.get();
    items.value = data;
  };

  const remove = async (id) => {
    await todoService.destroy(id);
    items.value = items.value.filter((item) => item.id !== id);
  }

  const add = async () => {
    if (newTask) {
      const todo = {todo: newTask.value,  completed: false};
      const { data } = await todoService.post(todo);
      debugger
      items.value = [...items.value, data];
      newKey.value = data.id;
    }
    newTask.value = '';
  }

  
  const required = (v) => {
    return !!v || 'Field is required'
  }

</script>