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
        echo '1111111'
        findBuildScans()
      }
    }

  }
}