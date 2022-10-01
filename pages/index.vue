<template>
    <Loading v-if="pending" />
    <div v-else class="page homepage">
        <router-link to="/members">Members</router-link>
        <router-link to="/meetings">Meetings</router-link>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/mixins";

.homepage {
    @include flex(column, true);

    a {
        color: $fg-200;
        text-decoration: none;
        padding: 0;
        margin: .1rem 0;
    }
}
</style>

<script lang="ts" setup>
const router = useRouter()
const pending = ref(true)
await useAPITestAuth().catch((error) => {
    router.push("/login")
})
pending.value = false
</script>
