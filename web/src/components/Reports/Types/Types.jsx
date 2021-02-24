import axios from 'axios';
import React, { Component } from 'react';
import HorizontalBarChart from '../../Charts/HorizontalBarChart/HorizontalBarChart';

interface OwnProps {
    values: any
}
export class Types extends Component<OwnProps, {}>{

    constructor(props: OwnProps) {
        super(props);

        this.state = {
            values: <React.Fragment />
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:52773/report/type/all', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const data = result.data.Result;
            this.setState({ values: <HorizontalBarChart types={data} valueField="count" argumentField="type" /> });
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>OCCURENCE TYPE</h1>
                {this.state.values}
            </React.Fragment>
        )
    }
}