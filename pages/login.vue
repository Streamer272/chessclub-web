<template>
    <div class="login">
        <h1>Log in</h1>
        <form @submit="submit">
            <h4 v-if="showError">Invalid username or password</h4>
            <input type="text" placeholder="Username" v-model="username">
            <input type="password" placeholder="Password" v-model="password">
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: fit-content;
    }
</style>

<script lang="ts" setup>
const router = useRouter()
const auth = useAuth()
const showError = ref(false)
const username = ref("")
const password = ref("")

const submit = (e: Event) => {
    e.preventDefault()
    auth.value = `${username.value}:${password.value}`
    useAPITestAuth().then((data) => {
        router.push("/")
    }).catch((error) => {
        showError.value = true
    })
}
</script>
