'use strict'

define(['angular', 'components/shared/index'], (angular) => {
  // Theoretically if the plugin/components were big enough,
  // this would be its own file. For this example, it's simple enough
  // to just create the module in the same file.
  const module = angular.module('TableSampleModule', ['powerSchoolModule'])

  module.controller('TableSampleController', ['$scope', '$http', '$q', ($scope, $http, $q) => {
    // I like to wrap my 'things that happen immediately' inside of an init function.
    // This way I know what stuff does things right away, and if I need to can call it again
    // for a complete restart.
    const init = () => {
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
    }

    init()
  }])
})
