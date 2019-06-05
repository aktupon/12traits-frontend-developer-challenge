import fetch from 'isomorphic-unfetch';
import { compose, map, assoc, includes, __ } from 'ramda';

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
        .then(json => resolve(compose(
          this.groupAges,
          this.sanitizeGender,
        )(json)))
        .catch(error => reject(error));
    });
  },
  
  /**
   * Distribute age into groups.
   */
  groupAges: function(surverResults) {
    const assocAge = assoc('Age');
    return map(result => {
      const age = result['Age'];
      if (age < 24) return assocAge('0-23', result);
      if (age < 36) return assocAge('24-35', result);
      if (age < 45) return assocAge('36-44', result);
      if (age < 61) return assocAge('45-60', result);
      return assocAge('over 61');
    })(surverResults);
  },

  /**
   * Group common genders.
   */
  sanitizeGender: function(surverResults) {
    const assocGender = assoc('Gender');
    const belongsMaleGender = includes(__, ['male', 'm', 'cis male']); 
    const belongsFemaleGender = includes(__, ['female', 'f', 'cis female']);
    return map(result => {
      const gender = result['Gender'];
      const genderLowerCase = gender.toLowerCase();
      if (belongsMaleGender(genderLowerCase)) {
        return assocGender('Male', result);
      }
      if (belongsFemaleGender(genderLowerCase)) {
        return assocGender('Female', result);
      }
      return assocGender('Other', result);
    })(surverResults);
  }
};

export default Survey;
