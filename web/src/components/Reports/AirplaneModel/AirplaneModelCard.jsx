import axios from 'axios';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface OwnProps {
    values: any
}

export class AirplaneModelCard extends Component<OwnProps, {}>{

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
                                    {t('airplaneModel')}
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