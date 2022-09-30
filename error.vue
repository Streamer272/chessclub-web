<template>
    <NuxtLayout>
        <div class="page">
            <h1 class="title">404</h1>
            <h3 class="subtitle">Page not found</h3>
            <button @click="redirect" class="redirect">Go back home</button>
        </div>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/mixins";
@import "assets/scss/fonts";

.page {
    @include flex(column, true);
    height: 100vh;

    .title {
        font-size: 5rem;
        font-family: "Roboto Mono Bold", $backup-font;
        margin: .25rem;
        padding: 0;
    }

    .subtitle {
        font-size: 2.5rem;
        font-family: "Roboto Mont Semi Bold", $backup-font;
        margin: .25rem;
        padding: 0;
    }

    .redirect {
        @include flex(column, true);
        font-size: 1.05rem;
        background: transparent;
        border: none;
        width: fit-content;
        height: fit-content;
        margin: .5rem 0;
        padding: .5rem 1rem;
        cursor: pointer;
        color: $fg-200;

        &:after {
            content: "";
            margin: .25rem 0 0 0;
            padding: 0;
            display: block;
            width: 85%;
            height: 2px;
            background: $fg-200;
            transition: width 250ms ease-in-out;
        }

        &:hover {
            &:after {
                width: 95%;
            }
        }
    }
}
</style>

<script lang="ts" setup>
const router = useRouter()

const redirect = () => {
    router.push('/')
}

definePageMeta({
    layout: 'default',
})
</script>
