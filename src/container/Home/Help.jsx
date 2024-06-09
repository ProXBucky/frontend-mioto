function Help() {
    return (
        <div className="px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>Hướng Dẫn Thuê Xe</h1>
                <h2 className='h-6 text-2xl font-medium mt-5'>Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng</h2>
            </div>
            <div className="flex flex-wrap">
                <div className="flex flex-col items-center w-[25%] px-10">
                    <img src="/help1.svg" className="h-[200px]" />
                    <div className="flex flex-row gap-5 mt-5">
                        <h5 className="text-main font-bold text-2xl">01</h5>
                        <h2 className="text-2xl font-semibold">Đặt xe trên app/web Mioto</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center w-[25%] px-10">
                    <img src="/help2.svg" className="h-[200px]" />
                    <div className="flex flex-row gap-5 mt-5">
                        <h5 className="text-main font-bold text-2xl">02</h5>
                        <h2 className="text-2xl font-semibold">Nhận xe</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center w-[25%] px-10">
                    <img src="/help3.svg" className="h-[200px]" />
                    <div className="flex flex-row gap-5 mt-5">
                        <h5 className="text-main font-bold text-2xl">03</h5>
                        <h2 className="text-2xl font-semibold">Bắt đầu hành trình</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center w-[25%] px-10">
                    <img src="/help4.svg" className="h-[200px]" />
                    <div className="flex flex-row gap-5 mt-5">
                        <h5 className="text-main font-bold text-2xl">04</h5>
                        <h2 className="text-2xl font-semibold">Trả xe và kết thúc chuyến đi</h2>
                    </div>
                </div>
            </div>

        </div >
    )

}

export default Help