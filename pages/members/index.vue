<template>
    <Loading v-if="pending" />
    <div v-else class="page member-page">
        <DataTable
                :headers="['Name', 'Email', 'Grade', 'Role']"
                :values="member"
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
const member = ref(null)
const res = await useAPIAllMembers().catch(useAPIErrorHandler())
if (res) {
    member.value = res.data
}
pending.value = false
</script>
