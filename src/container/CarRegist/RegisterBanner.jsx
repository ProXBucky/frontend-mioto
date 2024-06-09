function RegisterBanner({ handleRegistCar }) {
    return (
        <div className="px-32 pb-20">
            <div className="p-10 text-black text-base h-[700px] rounded-2xl relative "
                style={{
                    backgroundImage: `url("/backRegister.png")`
                }}>
                <div className="w-[53%] p-14 pr-24 absolute bottom-10" style={{
                    background: `url("/backWhite.png") no-repeat`
                }}>
                    <h2 className="text-4xl font-bold mb-3"><b className="text-main">Cho Thuê Xe</b> Trên Mioto Để Gia Tăng Thu Nhập Đến 10tr/Tháng!</h2>
                    <p>
                        Mioto không thu phí khi bạn đăng xe. Bạn chỉ chia sẻ phí dịch vụ với Mioto khi có giao dịch cho thuê thành công.
                    </p>
                    <div className="border-b-2 py-3 mb-3"></div>
                    <div>
                        <p>
                            Hotline: 1900 9217 (T2-T7 9AM-9PM)
                        </p>
                        <p>
                            Hoặc để lại tin nhắn cho Mioto qua Fanpage
                        </p>
                    </div>
                    <button className="mt-10 px-20 py-3 rounded-lg bg-black text-white font-semibold" onClick={handleRegistCar}>Đăng ký ngay</button>
                </div>
            </div>

        </div>
    )
}

export default RegisterBanner