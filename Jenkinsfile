pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/yassu974/teste-api-ebac.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Abrir Serverest') {
            steps {
                sh 'start /b npm start'
            }
        }
        stage('Executar testes') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }        
    }
}