function MyTrip() {
    return (
        <>
            <h1 className="text-4xl font-bold">Chuyến của tôi</h1>
            <div className="flex w-full flex-col justify-center items-center mt-10">
                <img src="/noTrip.svg" />
                <h3 className="font-bold text-xl text-gray-500">Bạn chưa có chuyến</h3>
            </div>
        </>
    )
}

export default MyTrip