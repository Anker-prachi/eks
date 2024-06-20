pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="552157865569"
        AWS_DEFAULT_REGION="us-east-1"
        IMAGE_REPO_NAME="eks"
        IMAGE_TAG="latest"
        REPOSITORY_URI = "552157865569.dkr.ecr.us-east-1.amazonaws.com/eks"
        CLUSTER_NAME = "test" // Update with your EKS cluster name
    }
   
    stages {
        
        stage('Logging into AWS ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                }
            }
        }
        
        stage('Cloning Git') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Anker-prachi/eks.git']]) 
            }
        }
  
        // Building Docker images
        stage('Building image') {
            steps{
                script {
                    dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
                }
            }
        }
   
        // Uploading Docker images into AWS ECR
        stage('Pushing to ECR') {
            steps {  
                script {
                    sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:${IMAGE_TAG}"
                    sh "docker push ${REPOSITORY_URI}:${IMAGE_TAG}"
                }
            }
        }

        // Configuring kubectl to use EKS cluster
        stage('Configure kubectl') {
            steps {
                script {
                    sh """
                    aws eks update-kubeconfig --region ${AWS_DEFAULT_REGION} --name ${CLUSTER_NAME}
                    """
                }
            }
        }

        // Deploying the Docker image to EKS
        stage('Deploy to EKS') {
            steps {
                script {
                    sh 
                    "kubectl apply -f deployment.yaml"
                    "kubectl apply -f service.yaml"
                }
            }
        }
    }
}

