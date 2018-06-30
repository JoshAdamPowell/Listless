import axios from 'axios';
import Config from './Config'

class ApiClient {
  static getPatientsList() {
    const url = Config.apiUrl + '/patients';
    return axios.get(url)
      .then(
        response => {
          return response.data;
        }
      )
  }

  static getPatient(patientId) {
    const url = Config.apiUrl + '/patients/' + patientId;
    return axios.get(url)
      .then(
        response => {
          return response.data;
        }
      )
  }

  static postPatient(patientData) {
    const url = Config.apiUrl + '/patients';
    return axios.post(url, patientData)
      .then(
        response => {
          return response.data;
        }
      )
  }

  static patchPatient(patientId, patientData) {
    const url = Config.apiUrl + '/patients/' + patientId;
    return axios.patch(url, patientData)
      .then(
        response => {
          return response.data;
        }
      )
  }
}

export default ApiClient;
