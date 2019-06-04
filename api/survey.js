import fetch from 'isomorphic-unfetch';

const API_URL = "http://localhost:3001/results";


const Survey = {
  /**
   * Fetch results from the mock backend. Check out 
   * @{link: https://www.kaggle.com/osmi/mental-health-in-tech-survey/data}
   * for SurveyResult data type.
   * @param {number} [limit] - Limit results to given value.
   * @returns {Promise<Array<SurveyResult>>} Returns an array of survey results
   */
  getResults: async function(limit) {
    return new Promise((resolve, reject) => {
      const query = limit ? `${API_URL}?_limit=${limit}` : `${API_URL}`;
      fetch(query)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error));
    });
  },
};

export default Survey;
