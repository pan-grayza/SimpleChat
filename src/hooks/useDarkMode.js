import { useEffect } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { useMedia } from "./useMedia"

export function useDarkMode() {
    // See if user has set a browser or OS preference for dark mode.
    const prefersDarkMode = useMedia(
        ["(prefers-color-scheme: dark)"],
        [true],
        false
    )

    // Use our useLocalStorage hook to persist state through a page refresh
    const [enabled, setEnabled] = useLocalStorage(
        "dark-mode-enabled",
        prefersDarkMode
    )

    // Fire off effect that add/removes dark mode class
    useEffect(
        () => {
            const className = "dark"
            const element = window.document.body
            if (enabled) {
                element.classList.add(className)
            } else {
                element.classList.remove(className)
            }
        },
        [enabled] // Only re-call effect when value changes
    )

    // Return enabled state and setter
    return [enabled, setEnabled]
}
