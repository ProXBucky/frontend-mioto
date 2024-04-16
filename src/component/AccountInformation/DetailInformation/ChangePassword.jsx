function ChangePassword() {
    return (
        <>
            <h1 className="text-4xl font-bold">Đổi mật khẩu</h1>
            <p className="text-md py-2">Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu</p>
            <div className="flex w-full flex-col gap-2 mt-2 bg-white py-3 px-4 rounded-xl">
                <h1 className="text-2xl font-bold mb-4">Nhập mật khẩu</h1>
                <div>
                    <label className="font-semibold text-gray-500 text-md w-full">Mật khẩu hiện tại</label>
                    <input className="border outline-none w-full p-2 mt-2 rounded-lg" name="oldPass" />
                </div>
                <div>
                    <label className="font-semibold text-gray-500 text-md w-full">Mật khẩu mới</label>
                    <input className="border outline-none w-full p-2 mt-2 rounded-lg" name="newPass" />
                </div>
                <div className="w-full flex justify-end">
                    <button className="p-2 py-3 bg-main rounded-md mt-2 w-1/6 font-bold text-white">Xác nhận</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword