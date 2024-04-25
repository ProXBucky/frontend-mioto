import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { avatarImageSelector, fullnameSelector, tokenSelector } from '../redux/selector';


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


function LoggedInNavbar() {
    const fullname = useSelector(fullnameSelector)
    const avatarImage = useSelector(avatarImageSelector);

    return (
        <ul className="w-3/4 text-right flex justify-end items-center gap-10">
            <li className="">
                <Link to="/aboutus" className="nav-link font-bold text-sm">
                    Về Mioto
                </Link>
            </li>

            <li className="">
                <Link to="/car-register" className="nav-link font-bold text-sm">
                    Trở thành chủ xe
                </Link>
            </li>

            <li className="nav-item">
                <Link to={`/account/myaccount`} className="nav-link">
                    <div className='flex flex-row gap-2 items-center cursor-pointer'>
                        <img
                            src={
                                avatarImage ||
                                'https://static.productionready.io/images/smiley-cyrus.jpg'
                            }
                            className="h-10 rounded-full"
                            alt={avatarImage}
                        />
                        <label className='font-semibold cursor-pointer'>{fullname}</label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.8998 9.20039C16.4998 8.80039 15.8998 8.80039 15.4998 9.20039L11.9998 12.7004L8.4998 9.20039C8.0998 8.80039 7.4998 8.80039 7.0998 9.20039C6.6998 9.60039 6.6998 10.2004 7.0998 10.6004L11.2998 14.8004C11.4998 15.0004 11.6998 15.1004 11.9998 15.1004C12.2998 15.1004 12.4998 15.0004 12.6998 14.8004L16.8998 10.6004C17.2998 10.2004 17.2998 9.60039 16.8998 9.20039Z" fill="black"></path></svg>

                    </div>
                </Link>
            </li>
        </ul>
    );
}

/**
 * App header
 *
 * @example
 * <Header />
 */
function Header({ handleOpenLoginModal, handleOpenRegisterModal }) {
    const token = useSelector(tokenSelector);


    return (
        <>
            <nav className="h-[88px] px-32">
                <div className="flex flex-row" >
                    <div className='w-1/4 h-[88px] flex items-center'>
                        <Link to="/" className="">
                            <img src='/logo-full.png' className='h-8' />
                        </Link>
                    </div>
                    {token ? <LoggedInNavbar /> : <LoggedOutNavbar handleOpenLoginModal={handleOpenLoginModal} handleOpenRegisterModal={handleOpenRegisterModal} />}
                </div>
            </nav >
        </>
    );
}

export default (Header);
