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

export const adminTokenSelector = (state) => state.cookie.tokenAdmin
export const adminIdSelector = (state) => state.cookie.adminId
export const adminFullnameSelector = (state) => state.cookie.adminFullname

export const modalUserIdSelector = (state) => state.modal.modalUserId
export const modalAddUserSelector = (state) => state.modal.modalAddUser
export const modalDeleteUserSelector = (state) => state.modal.modalDeleteUser
export const modalEditUserSelector = (state) => state.modal.modalEditUser
export const modalViewUserSelector = (state) => state.modal.modalViewUser
export const modalChangePasswordUserSelector = (state) => state.modal.modalChangePasswordUser