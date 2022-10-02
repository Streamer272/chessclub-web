export interface MeetingDTO {
    id: string
    date: string
    location: string
    orderedBy?: string
    startTime: string
    endTime: string
    attendance: string
}

export interface StartMeetingDTO {
    date: string
    location: string
    orderedBy?: string
    startTime: string
}

export interface EndMeetingDTO {
    endTime: string
}

export interface EditMeetingAttendanceDTO {
    member: string
    present: boolean
}

export const useAPIAllMeetings = async () => {
    return await useAPIFetch<MeetingDTO[]>("/meeting")
}

export const useAPIMeeting = async (id: string) => {
    return await useAPIFetch<MeetingDTO>(`/meeting/${id}`)
}

export const useAPIMeetingAttendance = async (id: string, dto: EditMeetingAttendanceDTO) => {
    return await useAPIFetch<Map<string, boolean>>(`/meeting/${id}/attendance`, {
        method: "POST",
        body: dto,
    })
}

export const useAPIEndMeeting = async (id: string, dto: EndMeetingDTO) => {
    return await useAPIFetch<GenericResponse>(`/meeting/${id}/end`, {
        method: "POST",
        body: dto,
    })
}

export const useAPIStartMeeting = async (dto: StartMeetingDTO) => {
    return await useAPIFetch<MeetingDTO>("/meeting", {
        method: "PUT",
        body: dto,
    })
}
