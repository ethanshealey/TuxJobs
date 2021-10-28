import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

const getTimeSince = (date) => {

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    return timeAgo.format(date)

}

export { getTimeSince }