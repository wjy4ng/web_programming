### 각 기능 별 Branch 개발 방법
```bash
git clone <repo-url>
cd repo
git checkout -b feature/기능A
# 작업, 커밋
git push origin feature/기능A
git checkout main
git pull origin main
git merge feature/기능A
git push origin main
git branch -d feature/기능A
git push origin --delete feature/기능A
```
