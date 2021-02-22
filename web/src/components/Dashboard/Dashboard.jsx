import axios from 'axios';
import React from 'react';
import Breadcrumb from '../Header/Breadcrumbs';

const Type = () => {

    axios.post('http://localhost:52773/report/category/all', {
        auth: { 
           username: '_SYSTEM', 
           password: 'SYS' 
        }
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

const Dashboard = () => {
    return (
        <React.Fragment>
            <Breadcrumb/>

            <Type/>
        </React.Fragment>
    );
}

export default Dashboard;