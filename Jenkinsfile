pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-p 8089:8089'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'ls'
      }
    }

  }
  environment {
    CI = 'true'
  }
}
