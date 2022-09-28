<template>
    <div class="login">
        <h1>Log in</h1>
        <form class="form" @submit="submit">
            <input type="text" placeholder="Username" @change="changeUsername">
            <input type="password" placeholder="Password" @change="changePassword">
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.login {
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: fit-content;
    }
}
</style>

<script lang="ts" setup>
const router = useRouter()
const auth = useAuth()
const username = ref("")
const password = ref("")
const {error, pending, refresh} = await useFetch(`${useBackendUrl()}/test`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": useToken(),
    }
})

const changeUsername = (e) => username.value = e.target.value
const changePassword = (e) => password.value = e.target.value

const submit = (e: Event) => {
    e.preventDefault()
    auth.value = `${username.value}:${password.value}`
    refresh()
}

if (error.value == null) {
    router.push("/")
}
</script>
