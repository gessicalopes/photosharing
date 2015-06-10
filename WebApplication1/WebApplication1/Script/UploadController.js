(function () {
    'use strict';

    angular
        .module('Script/Controllers')
        .controller('UploadController', uploadController);
    

    function uploadController($scope, $http, $upload) {
        var me = this;
        this.arquivo = null;
        me.iniciar = iniciar;
        //iniciar();
   

         $scope.results = [];
         function iniciar() {
             $scope.showSpinner('Carregando');
             $http.get('http://serviceupload.azurewebsites.net/api/upload').success(function (data) {
                   $scope.results = data;
                   $scope.hideSpinner();
               }).error(function (error) {

             });
         };
         
         this.selecionarArquivo = function (file) {
             this.arquivo = file[0];
         }

         this.uploadFileToUrl = function () {
                 $upload.upload({
                 url: 'http://serviceupload.azurewebsites.net/api/upload', // webapi url
                 method: 'POST',
                 file: this.arquivo
             }).success(function () {
                 alert("Imagem Inserida com Sucesso");
                 me.iniciar();
             })
            .error(function () {
            });
        }
    }

})();