import React, { memo, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Banner from './Banner';
import Promotion from './Promotion';
import CarList from '../../features/car/carList';
import City from './City';
import Advantage from './Advantage';
import Partner from './Partner';
import Help from './Help';
import Other from './Other';
import Service from './Service'
import Blog from './Blog'
import ModalPromotionComponent from '../ModalPromotionComponent';
import { getListCarByCity } from '../../api/carAPI';

// import { changeTab, homePageUnloaded } from '../../reducers/articleList';
// import Banner from './Banner';
// import MainView from './MainView';
// import TagsSidebar from '../../features/tags/TagsSidebar';
// import { selectIsAuthenticated } from '../../features/auth/authSlice';

function Home({ handleOpenDateModal, handleOpenLocationModal }) {
    //   const dispatch = useDispatch();
    //   const isAuthenticated = useSelector(selectIsAuthenticated);

    //   useEffect(() => {
    //     const defaultTab = isAuthenticated ? 'feed' : 'all';
    //     const fetchArticles = dispatch(changeTab(defaultTab));

    //     return () => {
    //       dispatch(homePageUnloaded());
    //       fetchArticles.abort();
    //     };
    //   }, []);

    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [carArray, setCarArray] = useState([])

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (img, tit, cont) => {
        setShowModal(true);
        setImageUrl(img)
        setTitle(tit)
        setContent(cont)
    };

    useEffect(() => {
        const fetchListCarByCity = async () => {
            let res = await getListCarByCity('haNoi')
            if (res && res.length > 0) {
                setCarArray(res)
            }
        }
        fetchListCarByCity()

    }, [])


    return (
        <>
            <LazyLoad height={200}>
                <Banner handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />
            </LazyLoad>
            <LazyLoad height={200}>
                <Promotion handleOpenModal={handleOpenModal} />
            </LazyLoad>
            <LazyLoad height={200}>
                <CarList isHiddenTitle={false} carArray={carArray} />
            </LazyLoad>
            <LazyLoad height={200}>
                <City />
            </LazyLoad>
            <LazyLoad height={200}>
                <Advantage />
            </LazyLoad>
            <LazyLoad height={200}>
                <Partner />
            </LazyLoad>
            <LazyLoad height={200}>
                <Service />
            </LazyLoad>
            <LazyLoad height={200}>
                <Help />
            </LazyLoad>
            <LazyLoad height={200}>
                <Other />
            </LazyLoad>
            <LazyLoad height={200}>
                <Blog />
            </LazyLoad>

            <ModalPromotionComponent
                showModal={showModal}
                handleClose={handleCloseModal}
                imageURL={imageURL}
                title={title}
                content={content}
            />
        </>
    );
}

export default (Home);
