const axios = require('axios')

module.exports.tasksList =
    () => {
        return axios.get('http://localhost:3000/tasks?_sort=date&_order=asc')
                    .then(resp => {
                        return resp.data
                    })
                    .catch(err => {
                        return err
                    })
    }

module.exports.addTask =
    reg => {
        return axios.post(`http://localhost:3000/tasks/`, reg)
                    .then(resp => {
                        return resp.data
                    })
                    .catch(err => {
                        return err
                    })
  }

module.exports.confirmTask =
    id => {
        return axios.get(`http://localhost:3000/tasks/${id}`)
                    .then(resp => {
                    
                        console.log(resp.data)

                        resp.data.isCompleted = true

                        axios.put(`http://localhost:3000/tasks/${id}`, resp.data)
                            .then(resp => {
                                return resp.data
                            })
                            .catch(err => {
                                return err
                            })


                        return resp.data
                    })
                    .catch(err => {
                        return err
                    })
    }

module.exports.deleteTask =
    id => {
        return axios.delete(`http://localhost:3000/tasks/${id}`)
                    .then(resp => {
                        return resp.data
                    })
                    .catch(err => {
                        return err
                    })
    }
