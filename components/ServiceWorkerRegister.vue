<template>

</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
}
</script>
