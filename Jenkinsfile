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
        sh 'pwd'
        sh '''tar -zcvf /tmp/docker-jenkins-nodejs.tar.gz --exclude=".git" --exclude="*.gz" -C /var/jenkins_home/workspace/jenkins_node_server .
mv /tmp/docker-jenkins-nodejs.tar.gz /var/jenkins_home/workspace/jenkins_node_server'''
      }
    }

  }
}