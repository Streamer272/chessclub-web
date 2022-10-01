<template>
    <Loading v-if="pending" />
    <div v-else class="page centered column">
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const pending = ref(true)
let id
if (typeof route.params.id === "string")
    id = route.params.id
else
    id = route.params.id[0]
const res = await useAPIMeeting(id).catch(useAPIErrorHandler())
pending.value = false

const endMeeting = async () => {
    const date = new Date()
    useAPIEndMeeting(id, {
        endTime: `${date.getHours()}:${date.getMinutes()}`
    }).then(() => {
        router.go(0)
    }).catch(useAPIErrorHandler())
}
</script>
