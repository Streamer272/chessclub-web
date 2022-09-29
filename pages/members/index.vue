<template>
    <p v-if="pending">Loading...</p>
    <div v-else-if="res">
        <table>
            <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Grade</td>
                <td>Role</td>
            </tr>
            <tr v-for="member in res.data" :key="member.id">
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.grade }}</td>
                <td>{{ member.role }}</td>
            </tr>
        </table>

        <router-link to="/members/new">New member</router-link>
    </div>
    <p v-else>Something went wrong</p>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const pending = ref(true)
const res = await useAPIFetch("/member").catch((error) => {
    alert(error.message)
})
pending.value = false

if (res) {
    console.log(res.data)
}
</script>
