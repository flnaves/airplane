import React from 'react';
import Breadcrumb from '../Header/Breadcrumbs';
import { Types } from '../Reports/Types/Types';

const Dashboard = () => {
    return (
        <React.Fragment>
            <Breadcrumb/>

            <Types/>
        </React.Fragment>
    );
}

export default Dashboard;