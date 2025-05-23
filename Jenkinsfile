pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/yassu974/teste-api-ebac.git'
                sh 'npm install'
            }
        }
        stage('Serverest') {
            steps {
                sh 'start /b npm start'
        }
        }stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }        
    }
}