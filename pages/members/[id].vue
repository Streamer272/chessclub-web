<template>
    <h1>Fetching {{ $route.params.id }}</h1>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const route = useRoute()
const pending = ref(true)
// route.params.id
// typeof(route.params.id) === "string"
// const res = await useAPIMember(route.params.id)
</script>
