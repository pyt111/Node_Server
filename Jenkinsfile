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

    stage('D') {
      steps {
        sshPublisher(publishers: [sshPublisherDesc(configName: 'pyt111_server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd /root/tt2
tar xzf /root/tt1/docker-jenkins-nodejs.tar.gz -C /root/tt2

sudo docker stop  jenkins_node_server_2 || true \\
 && sudo docker rm  jenkins_node_server_2 || true \\
 && sudo docker rmi tt2/jenkins_node_server_image || true \\
 && sudo docker build  -t tt2/jenkins_node_server_image . \\
 && sudo docker run --name jenkins_node_server_2 -d -p 8089:8089  tt2/jenkins_node_server_image''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'tt2', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'docker-jenkins-nodejs.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
      }
    }

  }
  environment {
    CI = 'true'
  }
}
