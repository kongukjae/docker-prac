# Docker 환경 구축 및 테스트 서버 실행 가이드 (macOS)

## 시작하기 전에

### 필요 사항
- macOS 운영체제 (Catalina 10.15 이상 권장)
- 관리자 권한이 있는 계정
- 최소 4GB의 여유 메모리
- 인터넷 연결
- GitHub 계정 (패키지 배포 시 필요)

### Docker란?
Docker는 애플리케이션을 컨테이너라는 표준화된 단위로 패키징하여 어디서나 동일하게 실행할 수 있게 해주는 도구입니다. 컨테이너는 가상 머신보다 가볍고 시작이 빠르며, 시스템 자원을 효율적으로 사용할 수 있습니다.

## 1. Docker 설치 및 설정

### 1.1 Docker Desktop vs Colima
macOS에서 Docker를 실행하는 방법에는 두 가지가 있습니다:
1. **Docker Desktop** (유료/무료)
   - GUI 인터페이스 제공
   - 기업용은 유료 라이센스 필요
   - 리소스 사용량이 비교적 높음

2. **Colima** (오픈소스/무료)
   - 커맨드라인 기반
   - 가벼운 리소스 사용량
   - 기업용도 무료

> 💡 **참고**: 개인 사용자나 소규모 프로젝트의 경우 Colima를 추천합니다.

### 1.2 Colima 설치 및 설정
```bash
# Homebrew로 Colima 설치
brew install colima

# Docker CLI 도구 설치
brew install docker docker-compose

# Colima 시작 (기본 설정)
colima start

# 또는 사용자 정의 설정으로 시작
colima start --cpu 2 --memory 4 --disk 60
```
> 💡 **Colima 설정 설명**:
> - `--cpu`: 할당할 CPU 코어 수
> - `--memory`: 할당할 메모리 (GB)
> - `--disk`: 할당할 디스크 공간 (GB)

### 1.3 설치 확인
```bash
# Docker 버전 확인
docker --version
docker-compose --version

# Colima 상태 확인
colima status
```

[이하 2~6장 내용 동일하게 유지...]

## 7. GitHub Packages 배포

### 7.1 GitHub 설정
1. GitHub Personal Access Token (PAT) 생성
   - GitHub.com → Settings → Developer settings
   - Personal access tokens → Tokens (classic)
   - 필요한 권한 선택:
     - `write:packages`
     - `read:packages`
     - `delete:packages`

### 7.2 package.json 설정
```json
{
  "name": "@[GitHub사용자명]/[저장소명]",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```
> 💡 **참고**: `name` 필드는 반드시 `@사용자명/저장소명` 형식이어야 합니다.

### 7.3 GitHub Container Registry 로그인
```bash
# PAT를 사용하여 로그인
echo "YOUR_PAT" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# 로그인 확인
docker login ghcr.io
```

### 7.4 이미지 태그 설정 및 푸시
```bash
# 이미지 태그 설정
docker tag test-server ghcr.io/[GitHub사용자명]/[저장소명]:latest

# 이미지 푸시
docker push ghcr.io/[GitHub사용자명]/[저장소명]:latest
```

### 7.5 배포 확인
1. GitHub 저장소 접속
2. "Packages" 탭 선택
3. 업로드된 패키지 확인

> 💡 **GitHub Packages 주의사항**:
> - PAT는 안전하게 보관하고 절대 공개하지 마세요
> - 이미지 이름은 GitHub 저장소 이름과 일치해야 합니다
> - Private 저장소는 무료로 사용 가능합니다
> - Public 저장소는 사용량에 따라 과금될 수 있습니다

[이하 문제 해결 및 참고 사항 섹션 유지...]

## 추가 Docker 관리 명령어

### Colima 관리
```bash
# Colima 중지
colima stop

# Colima 삭제 (모든 데이터 삭제)
colima delete

# Colima 상태 확인
colima status

# 상세 정보 확인
colima list
```

### 리소스 정리
```bash
# 사용하지 않는 이미지, 컨테이너, 네트워크 모두 정리
docker system prune -a

# 볼륨까지 모두 정리
docker system prune -a --volumes
```

## 참고 사항
- Docker Desktop의 설정은 상단 메뉴바의 Docker 아이콘 > Settings에서 변경 가능
- 컨테이너 실행 중 터미널을 종료해도 백그라운드에서 계속 실행됨
- Colima는 시스템 재시작 시 자동으로 시작되지 않으므로, 필요할 때 수동으로 시작해야 함
- Docker 관련 자세한 내용은 [공식 문서](https://docs.docker.com/)를 참조
- Colima 관련 자세한 내용은 [Colima GitHub](https://github.com/abiosoft/colima)를 참조