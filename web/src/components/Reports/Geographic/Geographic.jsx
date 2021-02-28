import axios from 'axios';
import React, { Component } from 'react';
import HorizontalBarChart from '../../Charts/HorizontalBarChart/HorizontalBarChart';
import Breadcrumb from '../../Header/Breadcrumbs';
import { Grid } from '@material-ui/core';

interface OwnProps {
    values: any
}
export class Geographic extends Component<OwnProps, {}>{

    constructor(props: OwnProps) {
        super(props);

        this.state = {
            values: []
        }
    }

    UNSAFE_componentWillMount() {
        axios.get('http://127.0.0.1:52773/report/geographic/', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const data = result.data.Result;

            let values = this.state.values;
            data.forEach(element => {
                const level = element.level;
                const states = element.states;
                const quantity = element.quantity;

                let newData = [];
                states.forEach((element, i) => {
                    newData.push({ 'uf': element, 'count': quantity[i] });
                });

                values[level] = newData;
            });

            let valuesState = [];

            const keys = Object.keys(values);
            keys.forEach(key => {
                valuesState.push(
                    <React.Fragment>
                        <Grid item xs={6} sm={4}>
                            <h1>{key}</h1><br />
                            <HorizontalBarChart types={values[key]} valueField="count" argumentField="uf" />
                        </Grid>
                    </React.Fragment>
                );
            });

            this.setState({ values: valuesState });

            //this.setState({ values: <HorizontalBarChart types={data} valueField="count" argumentField="type" /> });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Breadcrumb />
                <Grid container spacing={1} style={{ 'padding': 20 }}>
                    {this.state.values}
                </Grid>
            </React.Fragment>
        )
    }
}