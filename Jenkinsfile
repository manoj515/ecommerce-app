pipeline {

    agent any

    environment {
        IMAGE_NAME = "shopease-ecommerce"
        CONTAINER_NAME = "shopease-container"
        PORT = "8080"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'

                checkout scm
            }
        }


        stage('Validate') {
            steps {

                echo 'Validating application files...'

                sh '''
                    test -f index.html
                    test -f style.css
                    test -f script.js
                    test -f Dockerfile

                    echo "All required files found."
                '''
            }
        }


        stage('Build Docker Image') {
            steps {

                echo 'Building Docker image...'

                sh """
                    docker build \
                        -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${IMAGE_NAME}:latest .
                """
            }
        }


        stage('Stop Previous Container') {
            steps {

                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                """
            }
        }


        stage('Deploy') {
            steps {

                echo 'Deploying application...'

                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${PORT}:80 \
                        ${IMAGE_NAME}:${BUILD_NUMBER}
                """
            }
        }


        stage('Health Check') {
            steps {

                sh """
                    sleep 5

                    curl --fail \
                        http://localhost:${PORT}
                """

                echo 'Application is running successfully.'
            }
        }
    }


    post {

        success {

            echo """
            ======================================
            Deployment Successful
            ======================================
            Application:
            http://localhost:${PORT}
            ======================================
            """
        }

        failure {

            echo "Deployment failed."
        }

        always {

            echo "Jenkins pipeline completed."
        }
    }
}
