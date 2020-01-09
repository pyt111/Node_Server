pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-p 8089:8089'
    }

  }
  
  environment {
      CI = 'true' 
  }
  
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') { 
      steps {
          sh './jenkins/scripts/test.sh' 
      }
    }
  }
}
