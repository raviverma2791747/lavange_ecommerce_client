import React from 'react';

const Breadcrumb = ({ routes }: any) => {
    return (
        <div className="mb-4">
            {routes.map((route:any, index:number) => (
                <React.Fragment key={index}>
                    <a className="hover:text-primary-500" href={route.path}>
                        {route.name}
                    </a>
                    {index < routes.length - 1 && <span> &nbsp;/&nbsp;</span>}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;
