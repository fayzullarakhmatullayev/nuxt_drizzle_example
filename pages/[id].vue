<template>
  <button @click="$router.back()">Back</button>
  <h2>User {{ id }}</h2>

  <pre>{{ user }}</pre>
  <pre>{{ error?.data.message }}</pre>
</template>

<script lang="ts" setup>
import type { UserModel } from '~/interfaces/models/user.model';

const { id } = useRoute().params;

const { data: user, error } = await useFetch<UserModel>(`/api/users/${id}`);
</script>
