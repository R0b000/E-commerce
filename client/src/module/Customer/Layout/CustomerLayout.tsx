import { Outlet, useNavigate } from "react-router-dom"
import HeaderComponent from "../../../component/Header"
import { useAppContext } from "../../../context/AppContext";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import Sidebar from "../../../component/Sidebar";

const CustomerLayoutPage = () => {
    const { searchClick, menuClick, loggedInUser, setMenuClick } = useAppContext();
    const [viewUser, setViewUser] = useState<boolean>(false)
    const navigate = useNavigate();
    const vh = window.innerHeight;
    const vw = window.innerWidth

    const handleRouting = () => {
        if (loggedInUser?.role === 'admin') {
            navigate('/admin')
        } else {
            navigate('/seller')
        }
    }

    return (
        <>
            <HeaderComponent />
            <div className={`${menuClick && ''} flex w-full h-full`}>
                {menuClick &&
                    <div className='flex-col lg:block hidden w-[10vw] h-full shrink-0'>
                        <div className="flex flex-col w-full gap-3 mt-[10vh]">
                            <ul className="flex justify-between h-[6vh] items-center text-base p-2 font-semibold header-title">
                                <div className={`${loggedInUser && 'hidden'}`}>
                                    <li className="flex gap-4 items-center justify-center cursor-pointer" onClick={() => {
                                        navigate('/auth/login')
                                    }}>
                                        <FaUserCircle size={33} />Login / Register
                                    </li>
                                </div>
                                {(loggedInUser?.role !== 'customer' && loggedInUser !== null) &&
                                    <div onClick={handleRouting} className={`${loggedInUser?.role === 'admin' && 'cursor-pointer visible flex gap-2 items-center'}`}>
                                        <MdDashboard size={45} /> DASHBOARD
                                    </div>
                                }
                                {(loggedInUser?.role === 'customer') &&
                                    <h1 className="flex w-full h-[7vh] items-center p-2 cursor-pointer" onClick={() => {
                                        setViewUser(true)
                                    }}>Profile</h1>
                                }                                </ul>
                            <span className="flex grow border border-t border-rose-50"></span>
                            <ul className="flex w-full flex-col p-2 gap-6 px-4 text-base">
                                <li className="flex justify-between items-center cursor-pointer">
                                    Trending
                                    <AiOutlineRight />
                                </li>
                                <li className="flex justify-between items-center cursor-pointer">New Arrival</li>
                                <li className="flex justify-between items-center cursor-pointer">
                                    Women
                                    <AiOutlineRight />
                                </li>
                                <li className="flex justify-between items-center cursor-pointer">
                                    Men
                                    <AiOutlineRight />
                                </li>
                                <li className="flex justify-between items-center cursor-pointer">
                                    Accessories
                                    <AiOutlineRight />
                                </li>
                                <li className="flex justify-between items-center cursor-pointer">
                                    Sale
                                    <AiOutlineRight />
                                </li>
                            </ul>
                            <ul className="flex flex-col gap-2 p-2 px-6 text-base">
                                <li className="flex items-center cursor-pointer">
                                    Customer Service
                                </li>
                                <li className="flex items-center cursor-pointer">
                                    FAQ
                                </li>
                                <li className="flex items-center cursor-pointer">
                                    Contact Us
                                </li>
                                <li className="flex items-center cursor-pointer">
                                    Sizing Guide
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                <div className={`flex flex-col overflow-x-clip ${searchClick ? "" : "mt-[8vh]"} ${menuClick ? 'w-[88vw]' : 'w-full'}`}>
                    <Outlet />
                </div>
            </div>
            <div className='lg:hidden'>
                {menuClick && (
                    <div
                        onClick={() => setMenuClick(false)}
                        className="fixed lg:hidden inset-0 bg-black/70 z-30 w-full h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    >

                    </div>
                )
                }
                {
                    menuClick && (
                        <div className="fixed top-1/2 lg:hidden -translate-y-1/2 left-1/2 z-30 -translate-x-1/2 text-justify p-4 pt-10 h-[70vh] w-[95vw] text-white font-bold text-xl title-header bg-black/50">
                            <Sidebar />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default CustomerLayoutPage