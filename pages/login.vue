<template>
    <div class="page centered column">
        <form @submit="submit">
            <h1 class="title">Log in</h1>
            <h4 v-if="showError" class="error">Invalid username or password</h4>
            <input type="text" placeholder="Username" required v-model="username">
            <div class="password-div">
                <input v-bind:type="showPassword ? 'text' : 'password'" placeholder="Password" required v-model="password">
                <button type="button" @click="toggleShowPassword">
                    <img v-if="showPassword" src="/hide.png" alt="Hide password">
                    <img v-else src="/show.png" alt="Show password">
                </button>
            </div>
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";

form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: fit-content;

    input {
        border-radius: 1rem;
        border: none;
        font-size: 1.1rem;
        padding: .4rem .75rem;
        margin: .5rem 0;
        color: $fg-200;
        background-color: $bg-200;
    }

    button[type=submit] {
        font-size: 1.25rem;
        padding: .4rem .75rem;
        margin: .5rem 0;
        border: none;
        border-radius: 1rem;
        cursor: pointer;
        color: $fg-100;
        background-color: $bg-200;
    }

    .title {
        font-size: 2.5rem;
        font-weight: 700;
        padding: 0;
        margin: .5rem;
        color: $fg-100;
        width: 100%;
        text-align: center;
    }

    .error {
        font-size: 1.75rem;
        font-weight: 700;
        padding: 0;
        margin: .5rem;
        color: $fg-error;
        width: 100%;
        text-align: center;
    }

    .password-div {
        position: relative;

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            padding: .2rem .25rem;
            border-radius: 5rem;
            margin: 0;
            border: none;

            img {
                width: 1rem;
                height: 1rem;
                padding: 0;
                margin: 0;
            }
        }
    }
}
</style>

<script lang="ts" setup>
const router = useRouter()
const auth = useAuth()
const showError = ref(false)
const showPassword = ref(false)
const username = ref("")
const password = ref("")

const toggleShowPassword = () => showPassword.value = !showPassword.value

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
