pipeline {
  agent any
  stages {
    stage('Pull') {
      steps {
        git(url: 'https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104.git', branch: 'feature/cicd', poll: true, changelog: true, credentialsId: '5b334aab-1ca1-4f1f-add2-69c9ecc40e3d')
      }
    }

    stage('React Build') {
      steps {
        sh 'yarn --cwd ./frontend install --network-timeout 100000'
        sh 'yarn --cwd ./frontend build'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t nodejs/front ./frontend'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker ps -q --filter name=frontend | grep -q . && docker stop frontend && docker rm frontend'
        sh 'docker run -d --name frontend -p 3000:3000 -v /home/ubuntu/Workspace/certs:/home/ubuntu/Workspace/certs -u root nodejs/front'
      }
    }

    stage('Finish') {
      steps {
        sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
      }
    }

  }
  environment {
    GIT_URL = 'https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104.git'
  }
}