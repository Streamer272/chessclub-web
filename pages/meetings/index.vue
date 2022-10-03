<template>
    <Loading v-if="pending" />
    <div v-else class="page meeting-page">
        <DataTable
                :headers="['Date', 'Location', 'Ordered By', 'Start Time', 'End Time', 'Attendance']"
                :values="meetings"
                :construct-path="constructPath"
                create-path="/meetings/new"
        />
    </div>
</template>

<style lang="scss">
.meeting-page {
    .row-0 {
        width: 8rem;
    }

    .row-1 {
        width: 10rem;
    }

    .row-2 {
        width: 10rem;
    }

    .row-3 {
        width: 8rem;
    }

    .row-4 {
        width: 8rem;
    }

    .row-5 {
        width: 15rem;
    }
}
</style>

<script lang="ts" setup>
const pending = ref(true)
const meetings = ref(null)
const res = await useAPIAllMeetings().catch(useAPIErrorHandler())
if (res) {
    for (const meeting of res.data) {
        const date = new Date(meeting.date)
        meeting.date = date.toLocaleDateString()

        const orderedByRes = await useMeetingOrderedBy(meeting)
        meeting.orderedBy = orderedByRes.name
        meeting["orderedById"] = orderedByRes.id

        const attendanceRes = await useMeetingAttendance(meeting)
        meeting.attendance = attendanceRes.string.slice(0, 64)
    }
    meetings.value = res.data
}
pending.value = false

const constructPath = (meeting, header) => {
    switch (header) {
        case "orderedBy":
            if (meeting["orderedById"] && meeting["orderedById"] !== "")
                return "/members/" + meeting["orderedById"]
            else
                return "/meetings/" + meeting.id
        default:
            return "/meetings/" + meeting.id
    }
}
</script>
