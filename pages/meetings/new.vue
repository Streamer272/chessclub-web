<template>
    <div class="page centered column">
        <form class="form" @submit="submit">
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
// `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
const submit = (event) => {
    event.preventDefault()
}
</script>
