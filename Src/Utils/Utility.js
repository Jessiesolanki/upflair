export const waitFor = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getInitials = (name) => {
    if (!name) return ''
    return name.split(' ').reduce((total, current) => total + current?.charAt(0)?.toUpperCase(), '')
}
