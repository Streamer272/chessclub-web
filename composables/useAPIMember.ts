export interface MemberDTO {
    id: string
    name: string
    email: string
    grade: number
    role: string
}

export interface CreateMemberDTO {
    name: string
    email: string
    grade: number
}

export interface UpdateMemberRoleDTO {
    role: string
}

export const useAPIAllMembers = async () => {
    return await useAPIFetch<MemberDTO[]>("/member")
}

export const useAPIAdmins = async () => {
    return await useAPIFetch<MemberDTO[]>("/member/admins")
}

export const useAPIRoles = async () => {
    return await useAPIFetch<string[]>("/member/roles")
}

export const useAPIMember = async (id: string) => {
    return await useAPIFetch<MemberDTO>(`/member/${id}`)
}

export const useAPIEditMemberRole = async (id: string, dto: UpdateMemberRoleDTO) => {
    return await useAPIFetch<MemberDTO>(`/member/${id}`, {
        method: "POST",
        body: dto,
    })
}

export const useAPICreateMember = async (dto: CreateMemberDTO) => {
    return await useAPIFetch<MemberDTO>("/member", {
        method: "PUT",
        body: dto,
    })
}

export const useAPIDeleteMember = async (id: string) => {
    return await useAPIFetch(`/member/${id}`, {
        method: "DELETE",
    })
}
