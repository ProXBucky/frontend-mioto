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
export const avatarImageAdminSelector = (state) => state.cookie.avatarImageAdmin


export const modalUserIdSelector = (state) => state.modal.modalUserId
export const modalAddUserSelector = (state) => state.modal.modalAddUser
export const modalDeleteUserSelector = (state) => state.modal.modalDeleteUser
export const modalEditUserSelector = (state) => state.modal.modalEditUser
export const modalViewUserSelector = (state) => state.modal.modalViewUser
export const modalChangePasswordUserSelector = (state) => state.modal.modalChangePasswordUser
export const modalObjectSelector = (state) => state.modal.modalObject

export const modalCarIdSelector = (state) => state.modal.modalCarId
export const modalAddCarSelector = (state) => state.modal.modalAddCar
export const modalDeleteCarSelector = (state) => state.modal.modalDeleteCar
export const modalEditCarSelector = (state) => state.modal.modalEditCar
export const modalViewCarSelector = (state) => state.modal.modalViewCar

export const modalAddVoucherSelector = (state) => state.modal.modalAddVoucher
export const modalVoucherIdSelector = (state) => state.modal.modalVoucherId
export const modalFeedVoucherSelector = (state) => state.modal.modalFeedVoucher

export const modalViewRentSelector = (state) => state.modal.modalViewRent
export const modalRentIdSelector = (state) => state.modal.modalRentId
