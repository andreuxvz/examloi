<template>
  <v-list-item-title :class="{'tasks-item--completed': completed}" @click="completed = !completed">
    {{ props.item.todo }}
  </v-list-item-title>
</template>


<script setup>
  import { ref } from 'vue'

  const completed = ref(false);

  const props = defineProps({
    item: { required: true },
  })
</script>