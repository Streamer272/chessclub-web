<template>
    <Loading v-if="pending" />
    <div v-else class="page centered column meeting-new-page">
        <form class="form" @submit="submit">
            <h1>Create a meeting</h1>
            <input type="date" placeholder="Date" v-model="date" required>
            <input type="text" placeholder="Location" v-model="location" required>
            <select v-model="orderedBy">
                <option v-for="admin in res.data">{{ admin.name }}</option>
            </select>
            <input type="time" placeholder="Start Time" v-model="startTime" required>
            <button type="submit">Start</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/mixins";
@import "assets/scss/fonts";

.meeting-new-page {
    .form {
        @include flex(column, true);

        h1 {
            font-family: "Roboto Mono Bold", $backup-font;
            font-size: 2rem;
            color: $fg-100;
        }

        input {
            padding: .35rem .75rem;
            margin: .15rem 0;
            border: none;
            border-radius: 1rem;
            font-size: .95rem;
            color: $fg-200;
            background-color: $bg-200;
        }

        select {
            padding: .35rem .75rem;
            margin: .15rem 0;
            border: none;
            border-radius: 1rem;
            font-size: .95rem;
            color: $fg-200;
            background-color: $bg-200;
        }

        button {
            padding: .25rem .75rem;
            margin: 1rem 0;
            border: none;
            border-radius: 1rem;
            font-size: 1.25rem;
            color: $fg-200;
            background-color: $bg-200;
        }
    }
}
</style>

<script lang="ts" setup>
const router = useRouter()
const dateObject = new Date()
const pending = ref(true)
const date = ref(`${dateObject.toISOString().split('T')[0]}`)
const location = ref("Room 1")
const orderedBy = ref("")
const startTime = ref(`${dateObject.getHours()}:${dateObject.getMinutes()}`)

const res = await useAPIAdmins().catch(useAPIErrorHandler())
if (res) {
    orderedBy.value = res.data.find((admin) => admin.role.toLowerCase() === "president")?.name ?? ""
}
pending.value = false

const submit = (event) => {
    event.preventDefault()
    if (!res)
        return

    const orderedById = res.data.find((admin) => admin.name === orderedBy.value)?.id
    useAPIStartMeeting({
        date: date.value,
        location: location.value,
        orderedBy: orderedById,
        startTime: startTime.value
    }).then(() => {
        router.push("/meetings")
    }).catch(useAPIErrorHandler())
}
</script>
