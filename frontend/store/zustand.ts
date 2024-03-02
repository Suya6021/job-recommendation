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

let LocalData = localStorage.getItem("User");
let LocalJSON: storeData;
if (LocalData) {
  LocalJSON = JSON.parse(LocalData) as storeData;
}

export const useStore = create<Store>()((set) => ({
  FullName: LocalJSON.FullName || "",
  Title: LocalJSON.Title || "",
  Summary: LocalJSON.Summary || "",
  mobile: LocalJSON.mobile || "",
  email: LocalJSON.email || "",
  linkedin: LocalJSON.linkedin || "",
  portfolio: LocalJSON.portfolio || "",
  Project: LocalJSON.Project || [],
  Qualifications: LocalJSON.Qualifications || [],
  Experience: LocalJSON.Experience || [],
  update: (old: storeData) => {
    let temp;
    set((state) => ({ ...state, ...old }));
    set((state) => (temp = state));
    localStorage.setItem("User", JSON.stringify(temp));
  },
}));
