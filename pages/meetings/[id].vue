<template>
    <Loading v-if="pending"/>
    <div v-else class="page centered column">
        <h3 class="date">Meeting on {{ date.toLocaleDateString() }}</h3>
        <p class="location">In: {{ meeting.location }}</p>
        <p class="ordered-by">
            Ordered by:
            <router-link v-if="meeting.orderedBy && meeting.orderedBy !== 'null'"
                         :to="'/members/' + meeting.orderedById">{{ meeting.orderedBy }}
            </router-link>
        </p>

        <p class="start-time">Started at: {{ meeting.startTime }}</p>
        <p class="end-time">Ended at: {{ meeting.endTime }}</p>
        <p class="duration">Duration: {{ duration }}</p>
        <p class="attendance">
            Attendance:<br>
            <span v-for="member in meeting.attendance.split('\n')">{{ member }}<button
                    @click="toggleAttendance(member)">Toggle</button><br></span>
        </p>
        <p class="present-count">Present: {{ presentCount }}</p>
    </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/fonts";
@import "assets/scss/colors";
@import "assets/scss/mixins";

.date {
    font-family: "Roboto Mono Semi Bold", $backup-font;
    font-size: 1.65rem;
    color: $fg-100;
    padding: 0;
    margin: .2rem 0;
}

.location {
    color: $fg-200;
    font-size: 1.25rem;
    padding: 0;
    margin: .2rem 0;
}

.ordered-by {
    color: $fg-200;
    font-size: 1.25rem;
    padding: 0;
    margin: .2rem 0;

    a {
        color: $fg-100;
        text-decoration: none;
    }
}

.start-time {
    color: $fg-200;
    font-size: 1.25rem;
    padding: 0;
    margin: 1.5rem 0 .2rem 0;
}

.end-time {
    color: $fg-200;
    font-size: 1.25rem;
    padding: 0;
    margin: .2rem 0;
}

.duration {
    color: $fg-200;
    font-size: 1.25rem;
    padding: 0;
    margin: .2rem 0;
}

.attendance {
    color: $fg-200;
    font-size: 1.25rem;
    text-align: center;
    padding: 0;
    margin: 1.5rem 0 .2rem 0;

    span {
        @include flex(row, true);

        button {
            font-family: "Roboto Mono Light", $backup-font;
            font-size: .95rem;
            padding: .15rem .30rem;
            margin: 0 .5rem;
            border: none;
            border-radius: .5rem;
            color: $fg-200;
            background-color: $bg-200;
        }
    }
}

.present-count {
    color: $fg-200;
    font-size: 1.25rem;
    padding: 0;
    margin: .2rem 0;
}
</style>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const pending = ref(true)
const originalAttendance = ref(null)
const date = ref(null)
const duration = ref("0:00")
const presentCount = ref(0)
let id
if (typeof route.params.id === "string")
    id = route.params.id
else
    id = route.params.id[0]
const res = await useAPIMeeting(id).catch(useAPIErrorHandler())
const meeting = res ? res.data : null
if (res) {
    date.value = new Date(res.data.date)
    const startDate = new Date(`${res.data.date} ${res.data.startTime}`)
    const endDate = new Date(`${res.data.date} ${res.data.endTime}`)
    const durationInMs = endDate.getTime() - startDate.getTime()
    const hours = Math.floor(durationInMs / 1000 / 60 / 60)
    const minutes = Math.floor(durationInMs / 1000 / 60) - hours * 60
    duration.value = `${hours} hour${hours === 1 ? '' : 's'}, ${minutes} minute${minutes === 1 ? '' : 's'}`

    const orderedByRes = await useMeetingOrderedBy(meeting)
    meeting.orderedBy = orderedByRes.name
    meeting["orderedById"] = orderedByRes.id

    const attendanceJSON = JSON.parse(meeting.attendance)
    presentCount.value = Object.keys(attendanceJSON).filter((it) => attendanceJSON[it]).length
    const attendanceRes = await useMeetingAttendance(meeting)
    meeting.attendance = attendanceRes.string
    originalAttendance.value = attendanceRes.json
}
pending.value = false

const toggleAttendance = async (memberString: string) => {
    console.log(originalAttendance.value)
    const memberName = memberString.split(":")[0]
    const member = originalAttendance.value.find((it) => it.member.name === memberName)
    console.log(memberString, memberName, member)
    useAPIMeetingAttendance(id, {
        member: member.member.id,
        present: !member.present
    }).then(() => {
        router.go(0)
    })
}

const endMeeting = async () => {
    const date = new Date()
    useAPIEndMeeting(id, {
        endTime: `${date.getHours()}:${date.getMinutes()}`
    }).then(() => {
        router.go(0)
    }).catch(useAPIErrorHandler())
}
</script>
