<template>
    <div>
        <slot/>
        <Back v-if="route.fullPath !== '/'"/>
        <ClientOnly>
            <ServiceWorkerRegister/>
        </ClientOnly>
    </div>
</template>

<style lang="scss">
@import "assets/scss/colors";
@import "assets/scss/fonts";
@import "assets/scss/mixins";

body {
    width: 100vw;
    height: 100vh;
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
    overflow: auto;

    &.centered {
        @include flex(row, true);
    }

    &.column {
        flex-direction: column;
    }
}
</style>

<script lang="ts" setup>
const route = useRoute()

useHead({
    title: "Chess Club",
    meta: [
        {
            name: "description",
            content: "Administrator website for the Del Mar Chess Club"
        },
        {
            name: "author",
            content: "Daniel Svitan"
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
        }
    ],
    link: [
        {
            rel: "manifest",
            href: "/manifest.json"
        },
        {
            rel: "apple-touch-icon",
            href: "/images/icon-512x512.png"
        }
    ]
})
</script>
