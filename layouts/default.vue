<template>
    <slot />
</template>

<style lang="scss">
@import "assets/scss/colors";

body {
    margin: 0;
    padding: 0;
    color: black;
}

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>

<script lang="ts" setup>
useHead({
    title: "Blender Bots",
    meta: [
        {
            name: "description",
            content: "Blender Bots is a club for students to learn about robotics and programming."
        }
    ]
})
</script>
