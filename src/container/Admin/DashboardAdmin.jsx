import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { adminTokenSelector } from '../../redux/selector'
import { useState } from 'react'
import { statistic } from '../../api/appAPI'
function DashboardAdmin() {
    const adminToken = useSelector(adminTokenSelector)
    const [count, setCount] = useState({})

    const fetchStatistic = async () => {
        let res = await statistic(adminToken)
        if(res){
            setCount(res)
        }else{
            setCount({})
        }
    }


    useEffect(() => {
        fetchStatistic()
    }, [])

    const increaseNumberEffect = (n) => {
        const { number } = useSpring({
            from: { number: 0 },
            number: n,
            delay: 200,
            config: { mass: 1, tension: 20, friction: 10 }
        })
        return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
    }

    return (
        <>
            <div className="w-full">
                <h2 className="font-black text-xl">Chào mừng đã quay trở lại 👋</h2>
                <div className="flex flex-wrap gap-4 mt-5">
                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center">
                            <i class="fa-solid fa-user-tie text-5xl" style={{ color: "#3f8be9" }}></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.adminCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Nhân viên</p>
                        </div>
                    </div>

                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center" style={{ color: "#7db2f4" }}>
                            <i class="fa-solid fa-user text-5xl"></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.userCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Người dùng</p>
                        </div>
                    </div>

                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center">
                            <i class="fa-solid fa-car text-5xl" style={{ color: "#5fcf86" }}></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.carCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Phương tiện</p>
                        </div>
                    </div>

                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center">
                            <i class="fa-regular fa-calendar text-5xl" style={{ color: "#f8b01b" }}></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.rentCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Đơn đặt xe</p>
                        </div>
                    </div>

                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center">
                            <i class="fa-solid fa-book text-5xl" style={{ color: "#fc845e" }}></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.blogCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Bài blog</p>
                        </div>
                    </div>

                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center">
                            <i class="fa-solid fa-ticket text-5xl" style={{ color: "#df3e30" }}></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.voucherCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Phiếu giảm giá</p>
                        </div>
                    </div>

                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center">
                            <i class="fa-solid fa-flag text-5xl" style={{ color: "#1877f2" }}></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.reportCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Báo cáo</p>
                        </div>
                    </div>

                    <div className="w-[23%] flex flew-row bg-white rounded-xl px-3 py-[36px]">
                        <div className="w-1/3 flex justify-center items-center">
                            <i class="fa-solid fa-comment text-5xl" style={{ color: "#e78bda" }}></i>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center items-start">
                            <h2 className="text-2xl font-black tracking-wider">{increaseNumberEffect(count.reviewCount)}</h2>
                            <p className="text-gray-500 text-sm font-semibold">Bình luận</p>
                        </div>
                    </div>


                </div>


            </div>
        </>

    )
}

export default DashboardAdmin