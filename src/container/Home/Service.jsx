function Service() {
    return (
        <div className="px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>Dịch Vụ Của Mioto</h1>
            </div>
            <div className="flex justify-between relative">
                <div className="relative">
                    <img src="/service1.png" className="pb-10" />
                    <div className="absolute left-12 bottom-20 ">
                        <h1 className="text-4xl font-bold mb-3 text-white">Xe đã sẵn sàng.</h1>
                        <h1 className="text-4xl font-bold mb-3 text-white">Bắt đầu hành trình ngay!</h1>
                        <p className="text-base text-white">
                            Tự tay cầm lái chiếc xe bạn yêu thích cho hành trình thêm hứng khởi.
                        </p>
                        <button className="mt-10 px-20 py-4 rounded-lg bg-main text-white font-semibold">Thuê xe tự lái</button>
                    </div>
                </div>
                <div className="absolute top-[50px] right-0">
                    <img src="/service2.png" />
                    <div className="absolute right-12 bottom-10 text-right ">
                        <h1 className="text-4xl font-bold mb-3 text-white">Tài xế của bạn đã đến!</h1>
                        <p className="text-base text-white">
                            Chuyến đi thêm thú vị
                            cùng các bác tài 5* trên Mioto
                        </p>
                        <button className="mt-10 px-20 py-4 rounded-lg bg-main text-white font-semibold">Thuê xe có tài xế</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Service