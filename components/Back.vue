<template>
    <router-link :to="to" class="back">
        <img src="/arrow-left.png" alt="Back" />
    </router-link>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/mixins";

.back {
    @include flex(column, true);
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    font-size: 1.25rem;
    padding: .75rem;
    margin: 0;
    border: none;
    border-radius: 10rem;
    cursor: pointer;
    color: $fg-100;
    background-color: $bg-200;
    text-decoration: none;

    img {
        width: 1.25rem;
        height: 1.25rem;
        margin: 0;
        padding: 0;
    }
}
</style>

<script lang="ts" setup>
const route = useRoute()
const fullPath = route.fullPath.split('/')
fullPath.pop()
const to = fullPath.length === 1 ? '/' : fullPath.join('/')
</script>
