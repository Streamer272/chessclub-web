<template>
    <Loading v-if="pending" />
    <div v-else class="page centered column member-id-page">
        <h4 class="name">{{ res.data.name }}</h4>
        <p class="role">({{ res.data.role }})</p>
        <a :href="'mailto:' + res.data.email" class="email">{{ res.data.email }}</a>
        <p class="grade">Grade {{ res.data.grade }}</p>
        <form @submit="submit" class="form">
            <select name="role" id="member-role" v-model="role">
                <option v-for="role in roles.data" :value="role" :selected="role === res.data.role">{{ role }}</option>
            </select>
            <button type="submit">Change role</button>
        </form>

        <button @click="deleteMember" class="delete">Delete member</button>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/mixins";

.member-id-page {
    .name, .email, .grade, .role {
        padding: 0;
        margin: .1rem 0;
    }

    .name {
        font-size: 1.5rem;
    }

    .email {
        font-size: 1.25rem;
        text-decoration: none;
        color: $fg-200;
    }

    .grade {
        font-size: 1.25rem;
    }

    .role {
        font-size: 1.15rem;
    }

    .form {
        @include flex(row, true);
        margin: 1rem 0 .25rem 0;

        select {
            color: $fg-200;
            background-color: $bg-200;
            border: none;
            border-radius: 1rem 0 0 1rem;
            font-size: 1rem;
            padding: .25rem;
            margin: 0;
        }

        button {
            color: $fg-200;
            background-color: $bg-200;
            border: none;
            border-radius: 0 1rem 1rem 0;
            padding: .25rem;
            margin: 0 .25rem;
            font-size: 1rem;
        }
    }

    .delete {
        color: $fg-200;
        background-color: $bg-200;
        border: none;
        border-radius: 1rem;
        padding: .25rem .75rem;
        margin: .25rem 0;
        font-size: 1.1rem;
    }
}
</style>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const pending = ref(true)
const role = ref("")
let id
if (typeof route.params.id === "string")
    id = route.params.id
else
    id = route.params.id[0]
const roles = await useAPIRoles().catch(useAPIErrorHandler())
const res = await useAPIMember(id).catch(useAPIErrorHandler())
pending.value = false
role.value = res ? res.data.role : ""

const submit = (event) => {
    event.preventDefault()
    useAPIEditMemberRole(id, {
        role: role.value
    }).then(() => {
        router.go(0)
    })
}

const deleteMember = () => {
    const confirmation = confirm("Are you sure you want to delete this member?")
    if (!confirmation)
        return

    useAPIDeleteMember(id).then(() => {
        router.push("/members")
    }).catch(useAPIErrorHandler())
}
</script>
