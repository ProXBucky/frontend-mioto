export const tokenSelector = (state) => state.cookie.token
export const userIdSelector = (state) => state.cookie.userId
export const fullnameSelector = (state) => state.cookie.fullname
export const avatarImageSelector = (state) => state.cookie.avatarImage
export const locationSelector = (state) => state.search.location
export const locationCodeSelector = (state) => state.search.locationCode
export const beginDateSelector = (state) => state.search.beginDate
export const endDateSelector = (state) => state.search.endDate
export const appLoadSelector = (state) => state.app.appLoad
export const loadingSelector = (state) => state.app.loading