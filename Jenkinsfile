pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/yassu974/teste-api-ebac.git'
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
               bat '''set NO_COLOR=1
npm test'''
            }
        }
    }
}