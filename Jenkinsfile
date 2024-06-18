pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                checkout scmGit(branches: [[name: 'main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Anker-prachi/eks.git']])
            }
        }
        stage('build'){
            steps{
                script{
                    docker.withRegistry('http://<552157865569>.dkr.ecr.us-east-1.amazonaws.com/ecr-us-east-1', 'ecr:us-east-1:awsmaster') {
                    def customImage = docker.build("<552157865569>.dkr.ecr.us-east-1.amazonaws.com/ecr-us-east-1:${env.BUILD_ID}")
                    /* Push the container to the custom Registry */
                    customImage.push('latest')
                    }
                }
            }
        }
    }
}
