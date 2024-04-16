function MyVoucher() {
    return (
        <>
            <h1 className="text-4xl font-bold">Quà tặng của tôi</h1>
            <div className="flex w-full flex-col justify-center items-center mt-10">
                <img src="/noVoucher.svg" />
                <h3 className="font-bold text-xl text-gray-500">Không có quà nào dành cho bạn</h3>
            </div>
        </>
    )
}

export default MyVoucher