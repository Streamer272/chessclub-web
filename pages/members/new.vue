<template>
    <form @submit="submit">
        <h1>Create new member</h1>
        <input type="text" placeholder="Name" v-model="name" required>
        <input type="email" placeholder="Email" v-model="email" required>
        <input type="number" placeholder="Grade" v-model="grade" required>
        <button type="submit">Create</button>
    </form>

    <Back />
</template>

<style lang="scss" scoped>
@import "assets/scss/mixins";

form {
    @include flex(column, true);
    width: fit-content;
}
</style>

<script lang="ts" setup>
const router = useRouter()
const name = ref("")
const email = ref("")
const grade = ref("")

const submit = (event) => {
    event.preventDefault()
    useAPICreateMember({
        name: name.value,
        email: email.value,
        grade: +grade.value
    }).then(() => {
        router.push("/members")
    })
}
</script>
