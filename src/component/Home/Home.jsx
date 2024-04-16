import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (img, tit, cont) => {
        setShowModal(true);
        setImageUrl(img)
        setTitle(tit)
        setContent(cont)
    };

    return (
        <>
            <Banner handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />
            <Promotion handleOpenModal={handleOpenModal} />
            <CarList />
            <City />
            <Advantage />
            <Partner />
            <Service />
            <Help />
            <Other />
            <Blog />

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
