import { create } from "zustand";

type storeData = {
  FullName?: string;
  Title?: string;
  Summary?: string;
  mobile?: string;
  email?: string;
  linkedin?: string;
  portfolio?: string;
  Project?: {
    Title: string;
    Url: string;
    desc: string;
    duration: string;
  }[];
  Qualifications?: {
    College: string;
    Course: string;
    location: string;
    duration: string;
  }[];
  Experience?: {
    Company: string;
    Position: string;
    location: string;
    desc: string;
    duration: string;
  }[];
};
type Store = {
  FullName: string;
  Title: string;
  Summary: string;
  mobile?: string;
  email: string;
  linkedin?: string;
  portfolio?: string;
  Project?: {
    Title: string;
    Url: string;
    desc: string;
    duration: string;
  }[];
  Qualifications?: {
    College: string;
    Course: string;
    location: string;
    duration: string;
  }[];
  Experience?: {
    Company: string;
    Position: string;
    location: string;
    desc: string;
    duration: string;
  }[];
  update: (old: storeData) => void;
};
export const useStore = create<Store>()((set) => ({
  FullName: "",
  Title: "",
  Summary: "",
  mobile: "",
  email: "",
  linkedin: "",
  portfolio: "",
  Project: [],
  Qualifications: [],
  Experience: [],
  update: (old: storeData) => set((state) => ({ ...state, ...old })),
}));
