import {NOTIFY_USER} from "./types";

export const NotifyUser = (message, messageType) => {
    return {
        type: NOTIFY_USER,
        message,
        messageType
    }
}