<template>
    <div class="page centered column">
        <form @submit="submit" class="form">
            <h1>Create a member</h1>
            <input type="text" placeholder="Name" v-model="name" required>
            <input type="email" placeholder="Email" v-model="email" required>
            <input type="number" placeholder="Grade" v-model="grade" required>
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/mixins";

.form {
    @include flex(column, true);
    width: fit-content;

    input {
        border: none;
        border-radius: 0;
        padding: .35rem .75rem;
        font-size: .95rem;
        background-color: $bg-200;
        color: $fg-200;

        &:first-of-type {
            border-radius: 1rem 1rem 0 0;
        }

        &:last-of-type {
            border-radius: 0 0 1rem 1rem;
        }

        &:not(:last-of-type) {
            border-bottom: 2px solid $bg-100;
        }
    }

    button {
        border: none;
        border-radius: 1rem;
        color: $fg-200;
        background-color: $bg-200;
        padding: .25rem .5rem;
        margin: .75rem 0 0 0;
        font-size: 1.15rem;
    }

    h1 {
        font-size: 2rem;
        color: $fg-100;
    }
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
    }).catch(useAPIErrorHandler())
}
</script>
