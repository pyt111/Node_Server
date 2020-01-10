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
        sh '''tar -zcvf /tmp/docker-jenkins-nodejs.tar.gz --exclude=".git" --exclude="*.gz" -C /var/jenkins_home/workspace/jenkins_node_server .
mv /tmp/docker-jenkins-nodejs.tar.gz /var/jenkins_home/workspace/jenkins_node_server'''
      }
    }

    stage('Test') {
      steps {
        sh 'ls'
      }
    }

    stage('D') {
      parallel {
        stage('D') {
          steps {
            sshPublisher(publishers: [sshPublisherDesc(configName: 'pyt111_server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''
        cd /root/tt2
        pwd
        tar xzf /root/tt2/docker-jenkins-nodejs.tar.gz -C /root/tt2

        sudo docker stop  jenkins_node_server_2 || true \\
        && sudo docker rm  jenkins_node_server_2 || true \\
        && sudo docker rmi tt2/jenkins_node_server_image || true \\
        && sudo docker build  -t tt2/jenkins_node_server_image . \\
        && sudo docker run --name jenkins_node_server_2 -d -p 8088:8088  tt2/jenkins_node_server_image''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'tt2', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'docker-jenkins-nodejs.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
          }
        }

        stage('Git Push ') {
          steps {
            git(changelog: true, url: 'git@github.com:pyt111/Node_Server.git', branch: 'master', credentialsId: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7JwhIk7OZ3VJdXBe4A2/E/OHwowlruR6s6TteiitPe+VV4RxfdaotS1nc1CBSeigweIrz5VOPlqHKSkJquOTtXoSJ1JUVKmYK8BriI+C3f5Y8hDwDQWZB75XRgervaaFHIv+Sqs+J5iiZcURtNSlX3FU5/73M5C50lMzWKEffaB1tVpzbNMzyWLWE/ecEdbF906cC5eAsQwj7sFmdVS5poIRtimHbZsaVb0zy34uUiHUVG2LaMQdndlxHW5/hH5EoZkuCEKEO0+BQSx8yzJSQoPet7YiQ4MAhzz0aCQAuLxVUuDwtdctSh/Q44ckCAvyhQ3S/1Qcp5mrKxm7zbijl 584702675@qq.com')
          }
        }

      }
    }

  }
  environment {
    CI = 'true'
  }
}