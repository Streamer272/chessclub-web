<template>
    <p v-if="pending">Loading...</p>
    <div v-else>
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Role</th>
                <th></th>
            </tr>
            <tr v-for="member in res.data" :key="member.id">
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.grade }}</td>
                <td>{{ member.role }}</td>
                <td><router-link v-bind:to="'/members/' + member.id">Open</router-link></td>
            </tr>
        </table>

        <router-link to="/members/new">New member</router-link>
        <br>
        <router-link to="/">Back</router-link>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const pending = ref(true)
const res = await useAPIFetch("/member").catch(useAPIErrorHandler())
pending.value = false
</script>
