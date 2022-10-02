import {MemberDTO} from "~/composables/useAPIMember";

export interface MeetingAttendance {
    member: MemberDTO,
    present: boolean
}

export const useMeetingOrderedBy = async (meeting) => {
    if (!meeting.orderedBy || meeting.orderedBy === "")
        return {
            name: "N/A",
            id: null
        }

    const res = await useAPIMember(meeting.orderedBy).catch(useAPIErrorHandler())
    if (!res)
        return {
            name: "N/A",
            id: null
        }

    return {
        name: res.data.name,
        id: res.data.id
    }
}

export const useMeetingAttendance = async (meeting) => {
    const meetingAttendance = JSON.parse(meeting.attendance)
    const result: MeetingAttendance[] = []
    for (const attendanceMemberId in meetingAttendance) {
        const attendanceRes = await useAPIMember(attendanceMemberId).catch(useAPIErrorHandler())
        if (attendanceRes) {
            const present = meetingAttendance[attendanceMemberId]
            delete meetingAttendance[attendanceMemberId]
            result.push({
                member: attendanceRes.data,
                present: present
            })
        }
    }

    let attendanceString = []
    for (const attendance of result)
        attendanceString.push(`${attendance.member.name}: ${(attendance.present ? "Present" : "Absent")}`)

    return {
        json: result,
        string: attendanceString.join("\n")
    }
}
