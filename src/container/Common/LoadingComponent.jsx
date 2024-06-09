import { SyncLoader } from "react-spinners"

function LoadingComponent() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-[1000000]">
            <div className="bg-white px-[5%] py-[5%] rounded-full flex flex-col gap-4 items-center">
                <img src="/logo-full.png" className="h-10 opacity-100" />
                <SyncLoader
                    color="#5fcf86"
                    size={20}
                    margin={5}
                    speedMultiplier={0.7} />
            </div>
        </div>
    )
}

export default LoadingComponent