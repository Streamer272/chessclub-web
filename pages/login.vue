<template>
    <div class="page centered column">
        <form @submit="submit">
            <h1 class="title">Log in</h1>
            <h4 v-if="showError" class="error">Invalid username or password</h4>
            <input type="text" placeholder="Username" required v-model="username">
            <div class="password-div">
                <input :type="showPassword ? 'text' : 'password'" placeholder="Password" required v-model="password">
                <button type="button" @click="toggleShowPassword">
                    <img v-if="showPassword" src="/images/hide.png" alt="Hide password">
                    <img v-else src="/images/show.png" alt="Show password">
                </button>
            </div>
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/fonts";
@import "assets/scss/mixins";

form {
    @include flex(column, true);
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
        font-size: 2.65rem;
        font-family: "Roboto Mono Bold", $backup-font;
        padding: 0;
        margin: .5rem;
        color: $fg-100;
        width: 100%;
        text-align: center;
    }

    .error {
        font-size: 1.5rem;
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
            @include flex(row, true);
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            padding: .2rem .25rem;
            border-radius: 5rem;
            margin: 0 .4rem 0 0;
            border: none;
            background-color: #ffffff;

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
    if (!username.value || !password.value)
        return
    auth.value = `${username.value}:${password.value}`
    useAPITestAuth({username: username.value, password: password.value}).then((data) => {
        router.push("/")
    }).catch((error) => {
        showError.value = true
    })
}
</script>
