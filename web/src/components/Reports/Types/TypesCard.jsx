import axios from 'axios';
import React, { Component } from 'react';
import Breadcrumb from '../../Header/Breadcrumbs';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { chownSync } from 'fs';

interface OwnProps {
    values: any
}

export class TypesCard extends Component<OwnProps, {}>{

    constructor(props: OwnProps) {
        super(props);

        this.state = {
            values: <React.Fragment />
        }
    }

    componentDidMount() {
        const { t, classes } = this.props;

        axios.get('http://127.0.0.1:52773/report/type/all', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((result) => {
            const data = result.data.Result;

            this.setState({
                values:
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {t('occurenceType')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {t('total')}: {data.length}
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