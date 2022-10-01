<template>
    <Loading v-if="pending" />
    <div v-else class="page meeting-page">
        <DataTable
                :headers="['Date', 'Location', 'Ordered By', 'Start Time', 'End Time', 'Attendance']"
                :values="res.data"
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
const res = await useAPIAllMeetings().catch(useAPIErrorHandler())
if (res) {
    for (const meeting of res.data) {
        if (!meeting.orderedBy || meeting.orderedBy === "")
            continue

        const orderedByRes = await useAPIMember(meeting.orderedBy).catch(useAPIErrorHandler())
        meeting["orderedById"] = meeting.orderedBy
        if (orderedByRes)
            meeting.orderedBy = orderedByRes.data.name

        const meetingAttendance = JSON.parse(meeting.attendance)
        for (const attendance in meetingAttendance) {
            const attendanceRes = await useAPIMember(attendance).catch(useAPIErrorHandler())
            if (attendanceRes) {
                const present = meetingAttendance[attendance]
                delete meetingAttendance[attendance]
                meetingAttendance[attendanceRes.data.name] = present
            }
        }
        let attendanceString = ""
        for (const attendance in meetingAttendance)
            attendanceString += attendance + ": " + meetingAttendance[attendance] + "\n"
        meeting.attendance = attendanceString.slice(0, 64)
    }
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
