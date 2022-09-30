<template>
    <div class="table">
        <table>
            <tr>
                <th v-for="header in headers" :class="'row-' + headers.indexOf(header)">{{ header }}</th>
            </tr>
            <tr v-for="value in values" :key="value.id">
                <td v-for="header in headers" :class="'row-' + headers.indexOf(header)">
                    <router-link :to="constructPath(value, toCamelCase(header))">{{ value[toCamelCase(header)] }}</router-link>
                </td>
            </tr>
        </table>

        <router-link v-if="createPath" :to="createPath" class="add">+</router-link>
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
defineProps({
    headers: {
        type: Array,
        required: true
    },
    values: {
        type: Array,
        required: true
    },
    constructPath: {
        type: Function,
        required: true
    },
    createPath: {
        type: String
    }
})

const toCamelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
</script>
