# 블랙로즈 :: 죽음과 절망 — 세계관 위키

이 저장소는 **블랙로즈 세계관 설정을 Markdown으로 관리하고 GitHub Pages로 열람하기 위한 위키 패키지**다.

- `docs/`: GitHub Pages에 공개되는 위키 본문
- `author-notes/`: 작가용 정합성 관리 문서. 공개 저장소에 올릴 때는 내용 노출에 주의
- `.github/`: 설정 수정 제안용 이슈 템플릿

## 바로 사용하는 방법

1. GitHub에서 `blackrose-wiki`라는 새 저장소를 만든다.
2. 이 폴더의 파일을 저장소 루트에 업로드한다.
3. 저장소의 **Settings → Pages**로 이동한다.
4. **Build and deployment → Deploy from a branch**를 선택한다.
5. Branch는 `main`, 폴더는 `/docs`로 지정한다.
6. 잠시 뒤 `https://사용자명.github.io/blackrose-wiki/`에서 위키가 열린다.

저장소 이름을 다르게 쓸 경우 `docs/_config.yml`의 `baseurl`도 저장소 이름에 맞게 바꿔야 한다.

```yml
baseurl: "/새-저장소-이름"
```

## 로컬 편집 원칙

각 문서는 YAML front matter로 상태를 관리한다.

```yml
---
layout: default
title: 서여울
category: 인물
status: 확정
clearance: Null
spoiler: true
---
```

- `status`: 확정 / 검토 중 / 초안
- `clearance`: 일반 / 협회원 / 연구·분석부 / Null / 작가 전용
- `spoiler`: 핵심 반전이나 과거사가 포함되면 `true`

## 공개 범위 주의

GitHub Pages는 `docs/`만 사이트로 게시하지만, **공개 저장소라면 `author-notes/`도 GitHub 저장소 화면에서 보인다.** 결말과 반전은 별도의 비공개 저장소에 두는 것을 권장한다.

## 저작권

이 세계관과 등장인물, 고유 명칭 및 설정은 창작자에게 귀속된다. 별도의 허락 없이 재배포·2차 이용하지 않는다.
