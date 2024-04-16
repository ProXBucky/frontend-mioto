import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { selectIsAuthenticated, selectUser } from '../features/auth/authSlice';


function LoggedOutNavbar({ handleOpenLoginModal, handleOpenRegisterModal }) {
    return (
        <ul className="w-3/4 text-right flex justify-end items-center gap-10">
            <li className="">
                <Link to="/aboutus" className="nav-link font-bold text-sm">
                    Về Mioto
                </Link>
            </li>

            <li className="">
                <Link to="/owner/register" className="nav-link font-bold text-sm">
                    Trở thành chủ xe
                </Link>
            </li>

            <li className="">
                <a className="nav-link font-bold text-sm cursor-pointer" onClick={() => handleOpenRegisterModal()}>
                    Đăng ký
                </a>
            </li>

            <li className="border border-black py-3 px-4 rounded-lg font-bold text-sm cursor-pointer" onClick={() => handleOpenLoginModal()} >
                <a className="nav-link">
                    Đăng nhập
                </a>
            </li>
        </ul>
    );
}


// function LoggedInNavbar() {
//     const currentUser = useSelector(selectUser);

//     return (
//         <ul className="nav navbar-nav pull-xs-right">
//             <li className="nav-item">
//                 <Link to="/" className="nav-link">
//                     Home
//                 </Link>
//             </li>

//             <li className="nav-item">
//                 <Link to="/editor" className="nav-link">
//                     <i className="ion-compose" />
//                     &nbsp;New Post
//                 </Link>
//             </li>

//             <li className="nav-item">
//                 <Link to="/settings" className="nav-link">
//                     <i className="ion-gear-a" />
//                     &nbsp;Settings
//                 </Link>
//             </li>

//             <li className="nav-item">
//                 <Link to={`/@${currentUser?.username}`} className="nav-link">
//                     <img
//                         src={
//                             currentUser?.image ||
//                             'https://static.productionready.io/images/smiley-cyrus.jpg'
//                         }
//                         className="user-pic"
//                         alt={currentUser?.username}
//                     />
//                     {currentUser?.username}
//                 </Link>
//             </li>
//         </ul>
//     );
// }

/**
 * App header
 *
 * @example
 * <Header />
 */
function Header({ handleOpenLoginModal, handleOpenRegisterModal }) {
    // const isAuthenticated = useSelector(selectIsAuthenticated);
    // const appName = useSelector((state) => state.common.appName);

    return (
        <>
            <nav className="h-[88px] px-32">
                <div className="flex flex-row" >
                    <div className='w-1/4 h-[88px] flex items-center'>
                        <Link to="/" className="">
                            <img src='/logo-full.png' className='h-8' />
                        </Link>
                    </div>
                    <LoggedOutNavbar handleOpenLoginModal={handleOpenLoginModal} handleOpenRegisterModal={handleOpenRegisterModal} />
                    {/* {isAuthenticated ? <LoggedInNavbar /> : <LoggedOutNavbar />} */}
                </div>
            </nav >
        </>
    );
}

export default (Header);
