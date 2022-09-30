<template>
    <slot />
</template>

<style lang="scss">
@import "assets/scss/colors";
@import "assets/scss/fonts";
@import "assets/scss/mixins";

body {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    color: $fg-200;
    background-color: $bg-100;
    font-family: "Roboto Mono Regular", $backup-font;
}

.page {
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;

    &.centered {
        @include flex(row, true);
    }

    &.column {
        flex-direction: column;
    }
}
</style>

<script lang="ts" setup>
useHead({
    title: "Chess Club",
    meta: [
        {
            name: "description",
            content: "Blender Bots is a club for students to learn about robotics and programming."
        }
    ]
})
</script>
