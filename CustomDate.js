import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

const getTimeSince = (date) => {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    return timeAgo.format(date)
}

const getTimeColorValue = (date) => {
    let time = getTimeSince(date)
    const timeunit = time.split(" ")[1]
    if (timeunit === "minute" || timeunit === "minutes" || timeunit === "second" || timeunit === "seconds" || timeunit === "hour" || timeunit === "hours" || timeunit === "day" || timeunit === "days") 
        return "green" 
    else if(timeunit === "week" || timeunit === "weeks") 
        return "#db6e14"
    else
        return "red"
}

export { getTimeSince, getTimeColorValue }