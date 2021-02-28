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

export class ContributingFactorsCard extends Component<OwnProps, {}>{

    constructor(props: OwnProps) {
        super(props);

        this.state = {
            values: <React.Fragment />
        }
    }

    componentDidMount() {
        const { t, classes } = this.props;

        axios.get('http://127.0.0.1:52773/report/type/', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const data = result.data.Result;

            this.setState({
                values:
                    <Card className={classes.root}>
                        <CardActionArea style={{ height: 160 }}>
                            <CardHeader
                                style={{ 'margin-top': '-19px' }}
                                title={t('contributingFactors')}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <strong>{t('total')}</strong>: {data.length}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card >
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