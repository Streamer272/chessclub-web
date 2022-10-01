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
    return attendanceString
}
