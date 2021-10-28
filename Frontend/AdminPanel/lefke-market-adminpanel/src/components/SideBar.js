import React from 'react'
import { Link } from "react-router-dom";

function SideBar(props) {
    return (
        <>
            <div className="sidebar sidebar-main sidebar-default">
                <div className="sidebar-fixed">
                    <div className="sidebar-content">
                        <div className="sidebar-category sidebar-category-visible">

                            <div className="category-content no-padding">
                                <ul className="navigation navigation-main navigation-accordion">

                                    {/*Main*/}
                                    <li className="navigation-header"><span>Main</span>
                                        <i className="icon-menu" title="Main pages"/>
                                    </li>
                                    <li className="active"><Link to="index.html"><i className="icon-cart2"/>
                                        <span>Заказы</span></Link></li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>

                                    <li className="navigation-header"><span>Main</span>
                                        <i className="icon-menu" title="Main pages"/>
                                    </li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>

                                    <li className="navigation-header"><span>Main</span>
                                        <i className="icon-menu" title="Main pages"/>
                                    </li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>
                                    <li><Link to="index.html"><i className="icon-home4"/> <span>Dashboard</span></Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        {/*/main navigation*/}

                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
