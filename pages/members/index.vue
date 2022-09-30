<template>
    <p v-if="pending">Loading...</p>
    <div v-else class="page">
        <div class="table">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Grade</th>
                    <th>Role</th>
                </tr>
                <tr v-for="member in res.data" :key="member.id">
                    <td>
                        <router-link v-bind:to="'/members/' + member.id">{{ member.name }}</router-link>
                    </td>
                    <td>
                        <router-link v-bind:to="'/members/' + member.id">{{ member.email }}</router-link>
                    </td>
                    <td>
                        <router-link v-bind:to="'/members/' + member.id">{{ member.grade }}</router-link>
                    </td>
                    <td>
                        <router-link v-bind:to="'/members/' + member.id">{{ member.role }}</router-link>
                    </td>
                </tr>
            </table>

            <router-link to="/members/new" class="add">+</router-link>
        </div>

        <Back/>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/colors";
@import "assets/scss/fonts";

.table {
    padding: 0;
    margin: 1rem;
    border: 1px solid $bg-200;
    border-radius: 1rem;
    overflow: hidden;
    width: fit-content;

    table {
        border-spacing: 0;
        padding: 0;
        margin: 0;
        border: none;

        tr {
            th {
                font-family: "Roboto Mono Semi Bold", $backup-font;
                font-size: 1.05rem;
            }

            td {
                font-family: "Roboto Mono Regular", $backup-font;
                text-align: center;

                &:nth-child(1) {
                    min-width: 10rem;
                }

                &:nth-child(2) {
                    min-width: 12rem;
                }

                &:nth-child(3) {
                    min-width: 5rem;
                }

                &:nth-child(4) {
                    min-width: 8rem;
                }

                &:nth-child(5) {
                    min-width: 5rem;
                }
            }

            &:nth-child(odd):not(:first-child) {
                background-color: $bg-200;

                td {
                    &:not(:last-child) {
                        border-right: 2px solid $bg-100;
                    }
                }
            }

            &:nth-child(even) {
                background-color: $bg-100;

                td {
                    &:not(:last-child) {
                        border-right: 2px solid $bg-200;
                    }
                }
            }
        }
    }


    a {
        display: inline-block;
        color: $fg-200;
        text-decoration: none;
        width: 100%;
        text-align: center;
    }

}
</style>

<script lang="ts" setup>
const pending = ref(true)
const res = await useAPIFetch("/member").catch(useAPIErrorHandler())
pending.value = false
</script>
