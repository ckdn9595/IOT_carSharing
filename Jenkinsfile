pipeline {
  agent any
  stages {
    stage('Pull') {
      steps {
        git(url: 'https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104.git', branch: 'develop', changelog: true, credentialsId: '5b334aab-1ca1-4f1f-add2-69c9ecc40e3d')
      }
    }

    stage('React Build') {
      steps {
        sh 'yarn --cwd ./frontend install --network-timeout 100000'
        sh 'yarn --cwd ./frontend build'
      }
    }

    stage('Build') {
      parallel {
        stage('Build-front') {
          steps {
            sh 'docker build -t nodejs/front ./frontend'
          }
        }

        stage('Build-back') {
          steps {
            sh 'docker build -t nodejs/back ./backend'
          }
        }

      }
    }

    stage('Deploy-front') {
      parallel {
        stage('Deploy-front') {
          steps {
            sh 'docker ps -aq --filter "name=frontend" | grep -q . && docker stop frontend && docker rm -fv frontend'
            sh 'docker run -d --name frontend -v /home/ubuntu/Workspace/uploads:/app/public/static/images/uploads -p 3000:3000 --restart unless-stopped -u root nodejs/front'
          }
        }

        stage('Deploy-back') {
          steps {
            sh 'docker ps -aq --filter "name=backend" | grep -q . && docker stop backend && docker rm -fv backend'
            sh 'docker run -d --name backend -p 8001:8001 -v /home/ubuntu/Workspace/uploads:/app/uploads --restart unless-stopped -u root nodejs/back'
          }
        }

      }
    }

    stage('Finish') {
      steps {
        sh 'docker image prune -f'
      }
    }

  }
  environment {
    GIT_URL = 'https://lab.ssafy.com/s06-webmobile3-sub2/S06P12A104.git'
  }
}