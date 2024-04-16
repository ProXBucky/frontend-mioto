function Blog() {
    return (
        <div className="px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 text-5xl font-bold'>MIOTO Blog</h1>
            </div>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/3 gap-4">
                    <div className="relative">
                        <img src="/blog1.jpg" className="h-[250px] w-full rounded-3xl" />
                        <div className="text-white absolute bottom-5 left-5">
                            <p>29-02-2024</p>
                            <h2 className="font-bold text-xl">Thuê xe ô tô tự lái: Du lịch sau lễ thảnh thơi đi muôn nơi</h2>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/blog1.jpg" className="h-[250px] w-full rounded-3xl" />
                        <div className="text-white absolute bottom-5 left-5">
                            <p>29-02-2024</p>
                            <h2 className="font-bold text-xl">Thuê xe ô tô tự lái: Du lịch sau lễ thảnh thơi đi muôn nơi</h2>
                        </div>
                    </div>

                </div>
                <div className="w-2/3 relative">
                    <img src="/blog1.jpg" className="h-[520px] w-full rounded-3xl" />
                    <div className="text-white absolute bottom-10 left-5">
                        <p>29-02-2024</p>
                        <h2 className="font-bold text-4xl">Thuê xe ô tô tự lái: Du lịch sau lễ thảnh thơi đi muôn nơi</h2>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Blog