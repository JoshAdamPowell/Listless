import axios from 'axios';
import Config from './Config'

class ApiClient {
  static getPatientsList() {
    const url = Config.apiUrl + '/patient';
    return axios.get(url)
      .then(response => response.data)
  }

  static getPatient(patientId) {
    const url = Config.apiUrl + '/patient/' + patientId;
    return axios.get(url)
      .then(response => response.data)
  }

  static postPatient(patientData) {
    const url = Config.apiUrl + '/patient';
    return axios.post(url, patientData)
      .then(response => response.data)
  }

  static patchPatient(patientId, patientData) {
    const url = Config.apiUrl + '/patient/' + patientId;
    return axios.patch(url, patientData)
      .then(response => response.data)
  }
}

export default ApiClient;
