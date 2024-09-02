<template>
  <h2>{{ isUpdate ? 'Update' : 'Create' }} User</h2>
  <form @submit.prevent="submitHandler">
    <input v-model="form.name" type="text" placeholder="Name" />
    <input v-model="form.email" type="email" placeholder="Email" />
    <input v-model="form.age" type="number" placeholder="Age" min="0" max="100" />
    <button type="submit">{{ isUpdate ? 'Update' : 'Create' }}</button>
  </form>
  <h2>Users List</h2>
  <ul>
    <li v-for="user in users" :key="user.id">
      <NuxtLink :to="`/${user.id}`">
        <strong>Email: </strong>{{ user.email }}, <strong>Name: </strong>{{ user.name }},
        <strong>Age: </strong> {{ user.age }}
      </NuxtLink>
      <div class="actions">
        <button class="update" @click="updateHandler(user)">Edit</button>
        <button class="delete" @click="deleteHandler(user.id)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { UserModel } from '~/interfaces/models/user.model';

const form = ref<{ name: string; email: string; age: number | null }>({
  name: '',
  email: '',
  age: null
});
const selectedUserId = ref('');
const isUpdate = ref(false);

const triggerUsersFetch = ref(false);

const { data: users } = await useFetch<UserModel[]>('/api/users', {
  watch: [triggerUsersFetch]
});

const submitHandler = async () => {
  try {
    await $fetch('/api/users', {
      method: isUpdate.value ? 'PUT' : 'POST',
      body: form.value,
      query: isUpdate.value ? { id: selectedUserId.value } : undefined
    });

    triggerUsersFetch.value = true;

    form.value = {
      name: '',
      email: '',
      age: null
    };
  } catch (error: any) {
    console.log(error.data.message);
  } finally {
    triggerUsersFetch.value = false;
    isUpdate.value = false;
    selectedUserId.value = '';
  }
};

const deleteHandler = async (id: string) => {
  try {
    await $fetch(`/api/users`, {
      method: 'DELETE',
      query: { id }
    });
    triggerUsersFetch.value = true;
  } catch (error: any) {
    console.log(error.data.message);
  } finally {
    triggerUsersFetch.value = false;
  }
};

const updateHandler = async (user: UserModel) => {
  form.value = {
    name: user.name,
    email: user.email,
    age: user.age
  };
  selectedUserId.value = user.id;
  isUpdate.value = true;
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  list-style-type: none;
}
li {
  padding: 20px 12px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 20px;
}
li a {
  flex: 1;
}

li .actions {
  display: flex;
  gap: 10px;
}

li button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  cursor: pointer;
  &.delete {
    background-color: red;
    color: white;
  }
  &.update {
    background-color: blue;
    color: white;
  }
}

form {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}
form button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
}
</style>
