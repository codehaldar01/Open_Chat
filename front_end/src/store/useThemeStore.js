import {create} from 'zustand';


export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "luxury",
    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        console.log("Theme set to:", theme);
        set({theme});
    }
}))