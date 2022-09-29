<template>
    <p v-if="pending">Loading...</p>
    <div v-else>
        <router-link to="/members">Members</router-link>
        <router-link to="/meetings">Meetings</router-link>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const router = useRouter()
const pending = ref(true)
await useAPITestAuth().catch((error) => {
    router.push("/login")
})
pending.value = false
</script>
