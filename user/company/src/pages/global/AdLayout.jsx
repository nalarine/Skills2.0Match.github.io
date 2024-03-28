import React from 'react';
import HeaderTop from './HeaderTop';
import SidebarAdm from './Sidebar';

const AdLayout = (Component) => (props) => {
    return (
        <>
            <div className="flex min-h-screen">
                <SidebarAdm />
                <div className="w-full bg-gray-200">
                    <HeaderTop />
                    <div className="p-3">
                        <Component {...props} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdLayout;
