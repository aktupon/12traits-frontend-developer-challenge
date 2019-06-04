import React from 'react';
import Select from 'react-select';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { compose, map, toPairs, countBy, prop } from 'ramda';

const displayPropertyOptions = [
  {label: "Number of survey entries", value: { property: 'Country', type: 'raw' } },
  {label: "Gender", value: { property: ['Country', 'Gender'], type: 'raw' } },
];

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDisplayProperty: displayPropertyOptions[0],
    }
  }

  render() {
    const { results } = this.props;
    if (!results) return null;
    const data = compose(
      map(([country, count]) => ({ country, "Number of Survey Entries": count })),
      toPairs(),
      countBy(prop('Country')),
    )(results);
    return (
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 80, left: 40, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="Number of Survey Entries" fill="#8884d8">
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Overview;
