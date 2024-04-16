function MyCar() {
    return (
        <>
            <h1 className="text-4xl font-bold">Danh sách xe của tôi</h1>
            <div className="flex w-full flex-col justify-center items-center mt-10">
                <img src="/carNotFound.svg" />
                <h3 className="font-bold text-xl text-gray-500">Không tìm thấy xe nào</h3>
            </div>
        </>
    )
}

export default MyCar