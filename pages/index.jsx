import React from 'react';
import Select from 'react-select';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { compose, map, addIndex, toPairs, countBy, groupBy, prop } from 'ramda';

const displayPropertyOptions = [
  {
    label: "Number of survey entries",
    value: {
      transformation: compose(
        map(([country, count]) => ({ country, "Number of Survey Entries": count })),
        toPairs(),
        countBy(prop('Country')),
      ),
      dataKeys: ["Number of Survey Entries"],
    },
  },
  {
    label: "Gender", 
    value: {
      transformation: compose(
        map(([country, genderCounts]) => ({
          country,
          Male: genderCounts['Male'],
          Female: genderCounts['Female'],
          Other: genderCounts['Other'],
        })),
        toPairs(),
        map(countryResult =>
          countBy(prop('Gender'), countryResult),
        ),
        groupBy(prop('Country')),
      ),
      dataKeys: ['Male', 'Female', 'Other'],
    },
  },
  {
    label: "Ages", 
    value: {
      transformation: compose(
        map(([country, ageGroupCounts]) => ({
          country,
          '0-23': ageGroupCounts['0-23'],
          '24-35': ageGroupCounts['24-35'],
          '36-44': ageGroupCounts['36-44'],
          '45-60': ageGroupCounts['45-60'],
          'over 61': ageGroupCounts['over 61'],
        })),
        toPairs(),
        map(countryResult =>
          countBy(prop('Age'), countryResult),
        ),
        groupBy(prop('Country')),
      ),
      dataKeys: ['0-23', '24-35', '36-44', '45-60', 'over 61'],
    }
  },
  {
    label: "Family History", 
    value: {
      transformation: compose(
        map(([country, familyHistoryDistribution]) => ({
          country,
          'Yes': familyHistoryDistribution['Yes'],
          'No': familyHistoryDistribution['No'],
        })),
        toPairs(),
        map(countryResult =>
          countBy(prop('family_history'), countryResult),
        ),
        groupBy(prop('Country')),
      ),
      dataKeys: ['Yes', 'No'],
    }
  },
  {
    label: "Sought Treatment",
    value: {
      transformation: compose(
        map(([country, treatmentDistribution]) => ({
          country,
          'Yes': treatmentDistribution['Yes'],
          'No': treatmentDistribution['No'],
        })),
        toPairs(),
        map(countryResult =>
          countBy(prop('treatment'), countryResult),
        ),
        groupBy(prop('Country')),
      ),
      dataKeys: ['Yes', 'No'],
    }
  },
];

const colors = [
  '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263',
];

const mapIndexed = addIndex(map);

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDisplayProperty: displayPropertyOptions[0],
    }
  }

  render() {
    const { results } = this.props;
    const { selectedDisplayProperty } = this.state;
    if (!results) return null;
    const data = selectedDisplayProperty.value.transformation(results);
    return (
      <div> 
        <div className="select__wrapper">
          <Select
            value={selectedDisplayProperty}
            options={displayPropertyOptions}
            onChange={(option) => this.setState({ selectedDisplayProperty: option })}
          />
        </div>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 80, left: 40, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis interval={0} dataKey="country" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" />
            {mapIndexed(
              (key, index) => (<Bar stackId="a" key={key} dataKey={key} fill={colors[index]} />),
              selectedDisplayProperty.value.dataKeys
            )}
          </BarChart>
        </ResponsiveContainer>
        <style jsx>{`
          .select__wrapper {
            margin: 3em;
            width: 460px;
          }
        `}</style>
      </div>
    );
  }
}

export default Overview;
