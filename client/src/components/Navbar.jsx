import React, { useContext, useEffect, useRef, useState } from 'react';
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navbarcat } from '../constants/index';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Person2Icon from '@mui/icons-material/Person2';
import { AuthContext } from '../context/AuthContext';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Navbar = () => {
    const { currentUser, logout, ispopup, Setispopup } = useContext(AuthContext);
    const menuref = useRef(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [menu, setmenu] = useState(false);
    const redirectSignin = () => {
        Setispopup(!ispopup);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setProfileOpen(false); // Close the profile menu
    };

    const Isopen = () => {
        setmenu(!menu);
        menu?enablePageScroll():disablePageScroll();
    }

    useEffect(() => {
        const handler = (e) => {
            if (menuref.current && !menuref.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setProfileOpen(false);
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setProfileOpen(false);
    };

    return (
        <main className='fixed top-0 left-0 bg-white w-full z-50 border-b backdrop-blur-sm select-none'>
            <section className='flex items-center px-5 md:py-5 py-4'>
                <div onClick={Isopen} className='cursor-pointer transo' >
                    {
                        !menu?<MenuOutlinedIcon />:<CloseOutlinedIcon/>
                    }
                </div>
                <Link className='mx-10' to="/">Name.</Link>
                <nav className='flex mx-auto'>
                    <div className='items-center md:flex hidden'>
                        {navbarcat.map((i) => (
                            <Link className='px-6' key={i.id} to={i.link}>
                                <span>{i.title}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
                <div className='px-10 items-center flex'>
                    <Link className='mx-4 md:block hidden' to='/write' onClick={() => setProfileOpen(false)}>
                        <EditNoteOutlinedIcon /> Write
                    </Link>
                    <span className='mr-2 cursor-pointer' onClick={() => setProfileOpen(!profileOpen)}>
                        <AccountCircleIcon />
                    </span>
                    <div ref={menuref} className={`absolute  flex flex-col gap-5 w-[180px] top-14 right-10 bg-white border shadow-lg p-5 ${profileOpen ? 'block' : 'hidden'}`} onClick={handleMenuClick}>
                        {currentUser ? (
                            <div className='flex flex-col gap-5'>
                                <span><Person2Icon className='mr-3' /> {currentUser?.username}</span>
                            </div>
                        ) : (
                            <p className='cursor-pointer' onClick={redirectSignin}>Signin</p>
                        )}
                        <Link className='md:hidden block' to='/write'> <EditNoteOutlinedIcon className='mr-3' />Write</Link>
                        {
                            currentUser &&
                            <p className='cursor-pointer' onClick={handleLogout}> <ExitToAppIcon className='mr-3' />Sign out</p>
                        }
                    </div>

                    <section className={`${menu?'absolute':'hidden'} w-1/2  overflow-hidden bg-white left-0 h-screen top-14 `}>
                        <div className='flex flex-col gap-5 '>
                            {navbarcat.map((i) => (
                                <Link className='mx-auto mt-5' key={i.id} to={i.link}>
                                    <span>{i.title}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default Navbar;
