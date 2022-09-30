<template>
    <p v-if="pending">Loading...</p>
    <div v-else class="page member-page">
        <DataTable
                :headers="['Name', 'Email', 'Grade', 'Role']"
                :values="res.data"
                :construct-path="(member, _) => '/members/' + member.id"
                create-path="/members/new"
        />
    </div>
</template>

<style lang="scss">
.member-page {
    .row-0 {
        width: 10rem;
    }

    .row-1 {
        width: 14rem;
    }

    .row-2 {
        width: 5rem;
    }

    .row-3 {
        width: 8rem;
    }

    .row-4 {
        width: 5rem;
    }
}
</style>

<script lang="ts" setup>
const pending = ref(true)
const res = await useAPIAllMembers().catch(useAPIErrorHandler())
pending.value = false
</script>
