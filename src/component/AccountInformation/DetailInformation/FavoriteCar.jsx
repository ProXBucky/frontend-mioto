function FavoriteCar() {
    return (
        <>
            <h1 className="text-4xl font-bold">Xe yêu thích của tôi</h1>
            <div className="flex w-full flex-col justify-center items-center mt-10">
                <img src="/favoCar.svg" />
                <h3 className="font-bold text-xl text-gray-500">Không có xe yêu thích</h3>
            </div>
        </>
    )
}

export default FavoriteCar