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
            sh '''
            nohup npm start > serverest.log 2>&1 &
            echo "Esperando ServeRest responder..."
            for i in {1..10}; do
            nc -z localhost 3000 && echo "Serverest pronto" && break
            sleep 2
            done
            '''
        }
        stage('Executar testes') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }        
    }

}