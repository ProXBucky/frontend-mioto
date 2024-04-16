function MyAddress() {
    return (
        <>
            <h1 className="text-4xl font-bold">Địa chỉ của tôi</h1>
            <div className="rounded-xl mt-4 bg-white p-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Địa chỉ đã lưu</h1>
                    <div className="p-2 px-3 cursor-pointer rounded-lg font-bold text-md border border-black">
                        Thêm địa chỉ mới
                    </div>
                </div>

                <div className="flex w-full flex-col justify-center items-center mt-10">
                    <img src="/noAddress.svg" />
                    <h3 className="font-bold text-xl text-gray-500">Bạn chưa có địa chỉ</h3>
                </div>
            </div>
        </>
    )
}

export default MyAddress