import axios from 'axios';
import Config from './Config'

class ApiClient {
  static getPatientsList() {
    const url = Config.apiUrl + '/patient/';
    return axios.get(url)
      .then(response => response.data)
  }

  static getPatient(patientId) {
    const url = Config.apiUrl + '/patient/' + patientId + '/';
    return axios.get(url)
      .then(response => response.data)
  }

  static postPatient(patientData) {
    const url = Config.apiUrl + '/patient/';
    return axios.post(url, patientData)
      .then(response => response.data)
  }

  static putPatient(patientId, patientData) {
    const url = Config.apiUrl + '/patient/' + patientId + '/';
    return axios.put(url, patientData)
      .then(response => response.data)
  }

  static postJob(jobData) {
    const url = Config.apiUrl + '/job/';
    return axios.post(url, jobData)
      .then(response => response.data)
  }

  static putJob(jobId, jobData) {
    const url = Config.apiUrl + '/job/' + jobId + '/';
    return axios.put(url, jobData)
      .then(response => response.data)
  }
}

export default ApiClient;
