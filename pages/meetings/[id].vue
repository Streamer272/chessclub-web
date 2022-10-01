<template>
    <Loading v-if="pending"/>
    <div v-else class="page centered column">
        <h4 class="date">Meeting on {{ meeting.date }}</h4>
        <p class="location">In: {{ meeting.location }}</p>
        <p>
            Ordered by:
            <router-link v-if="meeting.orderedBy && meeting.orderedBy !== 'null'"
                         :to="'/members/' + meeting.orderedById" class="ordered-by">{{ meeting.orderedBy }}
            </router-link>
        </p>

        <p class="start-time">Started at: {{ meeting.startTime }}</p>
        <p class="end-time">Ended at: {{ meeting.endTime }}</p>
        <p class="duration">Duration: {{ meeting.duration }}</p>
        <p class="attendance">Attendance: {{ meeting.attendance }}</p>
        <p class="present-count">Present: {{ presentCount }}</p>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const pending = ref(true)
const presentCount = ref(0)
let id
if (typeof route.params.id === "string")
    id = route.params.id
else
    id = route.params.id[0]
const res = await useAPIMeeting(id).catch(useAPIErrorHandler())
const meeting = res ? res.data : null
if (res) {
    const orderedByRes = await useMeetingOrderedBy(meeting)
    meeting.orderedBy = orderedByRes.name
    meeting["orderedById"] = orderedByRes.id

    const attendanceJSON = JSON.parse(meeting.attendance)
    presentCount.value = Object.keys(attendanceJSON).filter((it) => attendanceJSON[it]).length
    meeting.attendance = (await useMeetingAttendance(meeting))
}
pending.value = false

const endMeeting = async () => {
    const date = new Date()
    useAPIEndMeeting(id, {
        endTime: `${date.getHours()}:${date.getMinutes()}`
    }).then(() => {
        router.go(0)
    }).catch(useAPIErrorHandler())
}
</script>
