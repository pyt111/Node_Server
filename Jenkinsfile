pipeline {
  agent any
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
      steps {
        sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'pyt111_server',
                        transfers: [
                            sshTransfer(
                                cleanRemote: false, excludes: '',
                                execCommand: '''
                  cd /root/tt2
                  rm -rf * -v docker-jenkins-nodejs.tar.gz
                  pwd
                  tar xzf /root/tt2/docker-jenkins-nodejs.tar.gz -C /root/tt2
                  sudo docker container stop jenkins_node_server_2 || true \\
                  && sudo docker rm  jenkins_node_server_2 || true \\
                  && sudo docker rmi tt2/jenkins_node_server_image || true \\
                  && sudo docker build  -t tt2/jenkins_node_server_image . \\
                  && sudo docker run --name jenkins_node_server_2 -d -p 8088:8088  tt2/jenkins_node_server_image''',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: 'tt2',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: 'docker-jenkins-nodejs.tar.gz'
                              )
                            ],
                            usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)
                        ])
              }
            }

          }
        }
