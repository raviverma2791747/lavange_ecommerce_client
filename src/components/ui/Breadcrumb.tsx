import Link from 'next/link';
import React from 'react';

interface IBreadcrumbProps {
    routes: { name: string; path: string }[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ routes }) => {
    return (
        <div className="mb-4">
            {routes.map((route, index: number) => (
                <React.Fragment key={index}>
                    <Link className="hover:text-primary-500" href={route.path}>
                        {route.name}
                    </Link>
                    {index < routes.length - 1 && <span> &nbsp;/&nbsp;</span>}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;
