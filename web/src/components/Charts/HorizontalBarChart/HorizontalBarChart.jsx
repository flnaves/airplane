import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
    Tooltip
} from '@devexpress/dx-react-chart-material-ui';

import {
    Animation,
    EventTracker,
    HoverState
} from '@devexpress/dx-react-chart';

const Label = ({ text, ...props }) => (
    <ValueAxis.Label {...props} text={text} />
);

export default class HorizontalBarChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.types,
            valueField: props.valueField,
            argumentField: props.argumentField
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart
                    height={this.props.height}
                    data={chartData}
                    rotated>
                    <ValueAxis position="top" labelComponent={Label} />
                    <ArgumentAxis />

                    <BarSeries
                        name="Occurrences"
                        valueField={this.state.valueField}
                        argumentField={this.state.argumentField}
                    />

                    <EventTracker />
                    <HoverState />
                    <Tooltip />

                    <Animation />
                    <ValueAxis position="bottom" labelComponent={Label} />

                </Chart>
            </Paper>
        );
    }
}
