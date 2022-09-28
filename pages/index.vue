<template>
    <p v-if="pending">Loading...</p>
    <p v-else>Fetch finished</p>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const router = useRouter()
const {error, pending} = await useFetch(`${useBackendUrl()}/test`, {
    headers: {
        Authorization: useToken()
    }
})

if (error.value != null) {
    router.push("/login")
}
</script>
