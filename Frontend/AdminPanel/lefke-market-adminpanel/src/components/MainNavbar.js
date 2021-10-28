import React from 'react'
import LogoLight from '../assets/images/logo_light.png'
import { Link } from "react-router-dom"

function MainNavbar({ setIsSideBarXs, setIsSideBarMobileMain }) {

    const handleSideBarButton = event => {
        event.preventDefault()
        setIsSideBarXs(value => !value)
        setIsSideBarMobileMain(value => !value)
    }

    const handleSideBarMobileButton = event => {
        event.preventDefault()
        setIsSideBarMobileMain(value => !value)
    }

    return (
        <>
            <div className="navbar navbar-inverse">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="index.html"
                    ><img src={LogoLight} alt="Main logo"
                    /></Link>

                    <ul className="nav navbar-nav visible-xs-block">
                        <li>
                            <a data-toggle="collapse" data-target="#navbar-mobile">
                                <i className="icon-tree5"/>
                            </a>
                        </li>
                        <li>
                            <a className="sidebar-mobile-main-toggle" onClick={handleSideBarMobileButton}>
                                <i className="icon-paragraph-justify3"/>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <ul className="nav navbar-nav">
                        <li>
                            <a className="sidebar-control sidebar-main-toggle hidden-xs" onClick={handleSideBarButton}>
                                <i className="icon-paragraph-justify3"/>
                            </a>
                        </li>
                    </ul>

                    <p className="navbar-text">
                        <span className="label bg-success-400">Online</span>
                    </p>

                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown language-switch">
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <img
                                    src="assets/images/flags/gb.png"
                                    className="position-left"
                                    alt=""
                                />
                                English
                                <span className="caret"></span>
                            </a>

                            <ul className="dropdown-menu">
                                <li>
                                    <a className="deutsch"
                                    ><img src="assets/images/flags/de.png" alt=""/> Deutsch</a
                                    >
                                </li>
                                <li>
                                    <a className="russian"
                                    ><img src="assets/images/flags/en.png" alt=""/> English</a
                                    >
                                </li>
                            </ul>
                        </li>

                        <li className="dropdown dropdown-user">
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <img src="assets/images/placeholder.jpg" alt=""/>
                                <span>Victoria</span>
                                <i className="caret"></i>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                    <a href="#"><i className="icon-user-plus"></i> My profile</a>
                                </li>
                                <li>
                                    <a href="#"><i className="icon-coins"></i> My balance</a>
                                </li>
                                <li>
                                    <a href="#"
                                    ><span className="badge bg-teal-400 pull-right">58</span>
                                        <i className="icon-comment-discussion"></i> Messages</a
                                    >
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#"><i className="icon-cog5"></i> Account settings</a>
                                </li>
                                <li>
                                    <a href="#"><i className="icon-switch2"></i> Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MainNavbar;
