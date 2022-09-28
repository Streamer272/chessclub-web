<template>
    <p v-if="pending">Loading...</p>
    <p v-else>Fetch finished</p>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const router = useRouter()
const auth = useAuth()
const {error, pending} = await useAPIFetch(`/test`, {method: 'GET'})

if (error.value != null) {
    router.push("/login")
}
</script>
