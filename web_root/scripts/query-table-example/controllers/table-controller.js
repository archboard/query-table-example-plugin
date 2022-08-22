'use strict'

define(['angular', 'components/shared/index'], (angular) => {
  const module = angular.module('TableSampleModule', ['powerSchoolModule'])

  module.controller('TableSampleController', ['$scope', '$http', '$q', ($scope, $http, $q) => {
    $http({
      url: '/ws/schema/query/io.archboard.sample_table.students.fetch_students',
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      data: '', // You have to have something here or it will return a 415 status code
    }).then(res => {
      $scope.students = {
        all: res.data?.record,
        filtered: res.data?.record,
      }

      $scope.loading = false
    }, error => {
      console.log(error)
    })
  }])
})
