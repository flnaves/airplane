import axios from 'axios';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';

interface OwnProps {
    values: any
}

export class GeographicCard extends Component<OwnProps, {}>{

    constructor(props: OwnProps) {
        super(props);

        this.state = {
            values: <React.Fragment />
        }
    }

    componentDidMount() {
        const { t, classes } = this.props;

        axios.get('http://127.0.0.1:52773/report/geographic/', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const data = result.data.Result;

            let values = [];
            data.forEach(element => {
                const level = element.level;
                const states = element.states;
                const quantity = element.quantity;

                let total = 0;
                states.forEach((element, i) => {
                    total = total + parseInt(quantity[i]);
                });

                values[level] = total;
            });

            const keys = Object.keys(values);

            this.setState({
                values:
                    <Card className={classes.root}>
                        <CardActionArea style={{ height: 160 }}>
                            <CardHeader
                                title={t('geographic')}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" style={{ 'font-size': '15px' }}>
                                    {keys.map((key) => {
                                        return (
                                            <React.Fragment>
                                                <strong>{key}</strong>: {values[key]}
                                                <br />
                                            </React.Fragment>
                                        )
                                    })}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.values}
            </React.Fragment>
        )
    }
}