import { useNavigate } from "react-router-dom"



function MyCar() {
    const navigate = useNavigate()
    const handleOpenModalAddCar = () => {
        navigate('/register-mode/selfdrive')
    }
    return (
        <>
            <h1 className="text-4xl font-bold">Danh sách xe của tôi</h1>
            <div className="flex w-full flex-col justify-center items-center mt-10">
                <img src="/carNotFound.svg" />
                <h3 className="font-bold text-xl text-gray-500">Không tìm thấy xe nào</h3>
                <button className="mt-5 px-4 py-3 rounded-xl font-semibold bg-main text-white" onClick={() => handleOpenModalAddCar()}>Đăng ký xe tự lái</button>
            </div>
        </>
    )
}

export default MyCar