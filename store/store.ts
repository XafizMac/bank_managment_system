import { create } from 'zustand'

type Store = {
    user: User
    isAuthenticated: boolean
    setAuthenticated: (state: boolean) => void
    setUser: (user: User) => void
    clearUser: () => void
    docx: Document[]
    setDocx: (docx: Document[]) => void
}

export type Role = "admin" | "employee" | "approver" | "archivist"

type Document = {
    id: string
    title: string
    fileUrl: string
    createdAt: string
    author: User
    status: string
}

type User = {
    id: string
    login: string
    name: string
    role: string
    documents: Document[]
}

export const useStore = create<Store>()((set) => ({
    user: {
        id: "",
        name: "",
        login: "",
        role: "",
        documents: []
    },
    docx: [],
    isAuthenticated: false,
    setAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set((state) => ({ user: user })),
    clearUser: () => set({ user: { id: "", name: "", login: "", role: "", documents: [] }, isAuthenticated: false }),
    setDocx: (docx: Document[]) => set(() => ({ docx }))
}))
