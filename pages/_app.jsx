import React from 'react';
import App, { Container } from 'next/app';
import Survey from '../api/survey';
import Header from '../layout/header';
import Page from '../layout/page';

const limitOptions = [
  { value: 100, label: '100' },
  { value: 500, label: '500' },
  { value: undefined, label: 'All' },
];

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedLimitOption: limitOptions[0],
      surveyResults: undefined,
    }
  }

  async componentDidMount() {
    const { selectedLimitOption } = this.state;
    const results = await Survey.getResults(selectedLimitOption.value);
    this.setState({ surveyResults: results });
  }

  handleFetchLimitChange = (limitOption) => {
    this.setState({ selectedLimitOption: limitOption });
    Survey.getResults(limitOption.value).then(results =>
      { this.setState({ surveyResults: results }); }
    );
  }

  render() {
    const { Component, pageProps } = this.props;
    const { selectedLimitOption, surveyResults } = this.state;

    return (
      <Container>
        <Page>
          <Header
            selectedOption={selectedLimitOption}
            limitOptions={limitOptions}
            onLimitChange={this.handleFetchLimitChange}
          />
          <Component {...pageProps} results={surveyResults} />
          <style global jsx>{`
            body {
              margin: 0; 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            }
          `}</style>
        </Page>
      </Container>
    );
  }
}

export default MyApp;
