function Advantage() {
    return (
        <div className="px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>Ưu Điểm Của Mioto</h1>
                <h2 className='h-6 text-2xl font-medium mt-5'>Những tính năng giúp bạn dễ dàng hơn khi thuê xe trên Mioto.</h2>
            </div>
            <div className="flex flex-wrap gap-10">
                <div className="flex flex-col items-center w-[31%] px-10">
                    <img src="/advan1.svg" />
                    <h2 className="text-2xl font-semibold py-5">Lái xe an toàn cùng Mioto</h2>
                    <p className="text-base">Chuyến đi trên Mioto được bảo vệ với Gói bảo hiểm thuê xe tự lái từ MIC & VNI. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.</p>
                </div>
                <div className="flex flex-col items-center w-[31%] px-10">
                    <img src="/advan2.svg" />
                    <h2 className="text-2xl font-semibold py-5">An tâm đặt xe</h2>
                    <p className="text-base">Không tính phí huỷ chuyến trong vòng 1h sau khi đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe huỷ chuyến trong vòng 7 ngày trước chuyến đi.</p>
                </div>
                <div className="flex flex-col items-center w-[31%] px-10">
                    <img src="/advan3.svg" />
                    <h2 className="text-2xl font-semibold py-5">Thủ tục đơn giản</h2>
                    <p className="text-base">Chỉ cần có CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên Mioto.</p>
                </div>
                <div className="flex flex-col items-center w-[31%] px-10">
                    <img src="/advan4.svg" />
                    <h2 className="text-2xl font-semibold py-5">Thanh toán dễ dàng</h2>
                    <p className="text-base">Đa dạng hình thức thanh toán: ATM, thẻ Visa & Ví điện tử (Momo, VnPay, ZaloPay).</p>
                </div>
                <div className="flex flex-col items-center w-[31%] px-10">
                    <img src="/advan5.svg" />
                    <h2 className="text-2xl font-semibold py-5">Giao xe tận nơi</h2>
                    <p className="text-base">Bạn có thể lựa chọn giao xe tận nhà/sân bay... Phí tiết kiệm chỉ từ 15k/km.</p>
                </div>
                <div className="flex flex-col items-center w-[31%] px-10">
                    <img src="/advan6.svg" />
                    <h2 className="text-2xl font-semibold py-5">Dòng xe đa dạng</h2>
                    <p className="text-base">Hơn 100 dòng xe cho bạn tuỳ ý lựa chọn: Mini, Sedan, CUV, SUV, MPV, Bán tải.</p>
                </div>

            </div>

        </div >
    )

}

export default Advantage