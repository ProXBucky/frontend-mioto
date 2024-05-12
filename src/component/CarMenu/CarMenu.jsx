import { useParams } from "react-router-dom"
import CarList from "../../features/car/carList"
import { useEffect, useState } from "react"
import { getListCarByCity } from "../../api/carAPI"

function CarMenu({ handleOpenDateModal, handleOpenLocationModal }) {
    const { city } = useParams()
    const [carArray, setCarArray] = useState([])

    useEffect(() => {

        const fetchListCarByCity = async () => {
            let res = await getListCarByCity(city)
            if (res && res.length > 0) {
                setCarArray(res)
            }
        }
        fetchListCarByCity()
    }, [])

    return (
        <>

            <div className="border-t-2 p-2">
                <div className="bg-white shadow-xl px-32 py-2">
                    <div className="flex justify-center items-center gap-10">
                        <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={() => handleOpenLocationModal()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.75C8.31 2.75 5.3 5.76 5.3 9.45C5.3 14.03 11.3 20.77 11.55 21.05C11.79 21.32 12.21 21.32 12.45 21.05C12.71 20.77 18.7 14.03 18.7 9.45C18.7 5.76 15.69 2.75 12 2.75Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.3849 11.7852C13.6776 11.5795 14.5587 10.3647 14.3529 9.07204C14.1472 7.77936 12.9325 6.89824 11.6398 7.104C10.3471 7.30976 9.46597 8.52449 9.67173 9.81717C9.87749 11.1099 11.0922 11.991 12.3849 11.7852Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="text-lg">Tân Sơn Nhất</p>
                        </div>
                        <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={() => handleOpenDateModal()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.86 4.81V2.75" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.14 4.81V2.75" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.05 3.78003H5.95C4.18 3.78003 2.75 5.21003 2.75 6.98003V18.06C2.75 19.83 4.18 21.26 5.95 21.26H18.06C19.83 21.26 21.26 19.83 21.26 18.06V6.98003C21.25 5.21003 19.82 3.78003 18.05 3.78003Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 7.8999H21.25" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z" fill="#767676"></path><path d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z" fill="#767676"></path><path d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z" fill="#767676"></path><path d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z" fill="#767676"></path><path d="M18 15.49C18.5523 15.49 19 15.0423 19 14.49C19 13.9377 18.5523 13.49 18 13.49C17.4477 13.49 17 13.9377 17 14.49C17 15.0423 17.4477 15.49 18 15.49Z" fill="#767676"></path><path d="M14 15.49C14.5523 15.49 15 15.0423 15 14.49C15 13.9377 14.5523 13.49 14 13.49C13.4477 13.49 13 13.9377 13 14.49C13 15.0423 13.4477 15.49 14 15.49Z" fill="#767676"></path><path d="M10 15.49C10.5523 15.49 11 15.0423 11 14.49C11 13.9377 10.5523 13.49 10 13.49C9.44772 13.49 9 13.9377 9 14.49C9 15.0423 9.44772 15.49 10 15.49Z" fill="#767676"></path><path d="M6 15.49C6.55228 15.49 7 15.0423 7 14.49C7 13.9377 6.55228 13.49 6 13.49C5.44772 13.49 5 13.9377 5 14.49C5 15.0423 5.44772 15.49 6 15.49Z" fill="#767676"></path><path d="M14 18.97C14.5523 18.97 15 18.5223 15 17.97C15 17.4177 14.5523 16.97 14 16.97C13.4477 16.97 13 17.4177 13 17.97C13 18.5223 13.4477 18.97 14 18.97Z" fill="#767676"></path><path d="M10 18.97C10.5523 18.97 11 18.5223 11 17.97C11 17.4177 10.5523 16.97 10 16.97C9.44772 16.97 9 17.4177 9 17.97C9 18.5223 9.44772 18.97 10 18.97Z" fill="#767676"></path><path d="M6 18.97C6.55228 18.97 7 18.5223 7 17.97C7 17.4177 6.55228 16.97 6 16.97C5.44772 16.97 5 17.4177 5 17.97C5 18.5223 5.44772 18.97 6 18.97Z" fill="#767676"></path></svg>
                            <p className="text-lg">15/04/2024 - 16/04/2024</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-3">
                        <div className="rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.87 15.7197H14.77" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Loại xe</p>
                        </div>

                        <div className="rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.87 15.7197H14.77" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Hãng xe</p>
                        </div>

                        <div className="rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.87 15.7197H14.77" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Truyền động</p>
                        </div>

                        <div className="rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.87 15.7197H14.77" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Xe điện</p>
                        </div>

                        <div className="rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.87 15.7197H14.77" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Xe xăng</p>
                        </div>

                        <div className="rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.87 15.7197H14.77" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Xe dầu</p>
                        </div>
                    </div>
                </div>
            </div>

            <CarList isHiddenTitle={true} carArray={carArray} />
        </>
    )
}

export default CarMenu