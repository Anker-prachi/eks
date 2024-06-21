pipeline {
    agent any
    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        EKS_CLUSTER_NAME = 'test'
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }
    stages {
        stage('Debug Environment') {
            steps {
                script {
                    sh 'whoami'
                    sh 'echo $KUBECONFIG'
                    sh 'ls -la /var/lib/jenkins/.kube/'
                    sh 'cat /var/lib/jenkins/.kube/config || echo "Kubeconfig file not found"'
                    sh 'kubectl version --client || echo "kubectl not installed"'
                    sh 'kubectl config current-context || echo "No current context set in kubectl"'
                }
            }
        }
        stage('Logging into AWS ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin 552157865569.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com || echo "Failed to log in to AWS ECR"'
                }
            }
        }
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Anker-prachi/eks.git']]])
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t 552157865569.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/eks:latest . || echo "Docker build failed"'
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    sh 'docker push 552157865569.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/eks:latest || echo "Docker push failed"'
                }
            }
        }
        stage('Configure kubectl') {
            steps {
                script {
                    sh 'aws eks --region $AWS_DEFAULT_REGION update-kubeconfig --name $EKS_CLUSTER_NAME || echo "Failed to update kubeconfig"'
                    // Validate AWS credentials
                    sh 'aws sts get-caller-identity || echo "Failed to get AWS identity"'
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                retry(3) {
                    script {
                        sh 'kubectl apply -f deployment.yaml --validate=false || echo "kubectl apply failed"'
                        sh 'kubectl get deployments'
                        sh 'kubectl get pods'
                        sh 'kubectl get services'
                    }
                }
            }
        }
    }
}
