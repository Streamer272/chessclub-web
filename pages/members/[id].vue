<template>
    <p v-if="pending">Loading...</p>
    <div v-else>
        <p>
            {{ res.data.name }}
            {{ res.data.email }}
            {{ res.data.grade }}
            {{ res.data.role }}
        </p>
        <form @submit="submit">
            <select name="role" id="member-role" v-model="role">
                <option v-for="role in roles.data" :value="role" v-bind:selected="role === res.data.role">{{ role }}</option>
            </select>
            <button type="submit">Change role</button>
        </form>

        <button @click="deleteMember">Delete member</button>
        <br>

        <a v-bind:href="`mailto:${res.data.email}`" target="_blank">Send email</a>
        <br>
        <router-link to="/members">Back</router-link>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const pending = ref(true)
const role = ref("")
let id;
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
    useAPIDeleteMember(id).then(() => {
        router.push("/members")
    })
}
</script>
