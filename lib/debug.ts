export const DEBUG_LAYOUT =
    process.env.NEXT_PUBLIC_DEBUG_LAYOUT === "true";

export function debug(classes: string) {
    return DEBUG_LAYOUT ? classes : "";
}
