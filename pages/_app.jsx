import React from 'react';
import App, { Container } from 'next/app';
import Survey from '../api/survey';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.results = await Survey.getResults(5);
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
        <Container>
          <Component {...pageProps} />
        </Container>
    );
  }
}

export default MyApp;
