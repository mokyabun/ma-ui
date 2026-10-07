# ma-ui

shadcn 방식(복사해서 소유하는) React 컴포넌트 레지스트리.

- **컴포넌트**: shadcn/ui의 Base UI 버전(`@base-ui/react`)에서 가져와 수정
- **테마 시스템**: daisyUI 5와 같은 토큰/테마 포맷 (`@ma-ui/tailwind` Tailwind v4 플러그인)
- **배포**: `shadcn build`로 정적 JSON 레지스트리 생성 → `bunx shadcn add @ma-ui/button`
- **개발**: Storybook 10 (Vite) + Tailwind v4

## 구조

Bun workspace 모노레포 (`apps/*`, `packages/*`).

```
ma-ui/
├─ apps/
│  └─ storybook/              @ma-ui/storybook (private) — 개발/문서
│     ├─ .storybook/          main.ts, preview.tsx (테마 전환 툴바)
│     ├─ src/styles.css       Tailwind + 플러그인 설정 (oxfmt 클래스 정렬도 이 파일 사용)
│     └─ stories/             foundations/, ui/
├─ packages/
│  ├─ tailwind/               @ma-ui/tailwind (npm 배포 대상) — 테마/토큰 Tailwind 플러그인
│  │  └─ src/
│  │     ├─ index.ts          메인 플러그인: themes 옵션, 색/radius/size 유틸, data-* variant
│  │     ├─ theme.ts          커스텀 테마 플러그인 (daisyui/theme 와 같은 문법)
│  │     └─ themes/           기본 테마 (light, dark)
│  └─ registry/               @ma-ui/registry (private) — 레지스트리 소스 + 빌드
│     ├─ src/                 사용자 프로젝트에 복사되는 파일
│     │  ├─ ui/               컴포넌트
│     │  ├─ lib/utils.ts      cn() — 토큰을 아는 tailwind-merge
│     │  └─ hooks/
│     ├─ scripts/
│     │  ├─ shadcn-import.ts  업스트림 shadcn → src/ 가져오기 (토큰 변환 포함)
│     │  ├─ lib/tokens.ts     shadcn → ma-ui 토큰 매핑 규칙
│     │  └─ build-registry.ts src/ 스캔 → registry.json 생성
│     ├─ registry.json        (생성됨) shadcn 레지스트리 매니페스트
│     └─ public/r/            (생성됨, gitignore) 설치용 JSON
├─ tsconfig.base.json         공용 TS 설정 (각 패키지가 extends)
├─ .oxfmtrc.json
└─ .oxlintrc.json
```

의존 방향: `storybook → registry, tailwind`. registry와 tailwind는 서로 모릅니다
(컴포넌트는 클래스 이름만 쓰고, 그 클래스는 소비자 앱의 Tailwind + 플러그인이 생성).

Storybook은 컴포넌트를 `@ma-ui/registry/ui/button`으로 import 합니다. 레지스트리 파일끼리는
shadcn 규칙대로 `@/registry/ma/...`로 import 합니다 (설치 시 shadcn CLI가 소비자 경로로 바꿔줌).

## 명령어

루트에서 실행합니다 (`bun run --filter`로 각 workspace에 위임).

```bash
bun install
bun run dev               # 플러그인 빌드 + Storybook (http://localhost:6006)
bun run build             # 전체 빌드 (의존 순서: tailwind, registry → storybook)
                          #   Storybook 정적 빌드(apps/storybook/dist)에 /r 레지스트리 포함
bun run registry:build    # registry.json + public/r/*.json 만
bun run check             # typecheck + test + oxfmt + oxlint (모든 workspace)
bun run format            # oxfmt로 포맷 (lint:fix 는 oxlint 자동 수정)
bun run shadcn:import <name...>   # shadcn에서 컴포넌트 가져오기 (아래 참고)
```

특정 패키지만: `bun run --filter @ma-ui/tailwind test`, 패키지에 의존성 추가: `bun add --cwd packages/registry <pkg>`.

## 테마 시스템

토큰 이름은 daisyUI 5와 **동일**합니다. daisyUI 테마(테마 생성기 결과 포함)를 그대로 붙여 넣을 수 있습니다.

| 종류   | 토큰                                                                                                                                  | 유틸리티 예                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 색     | `base-100/200/300`, `base-content`, `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `error` (+ `-content`) | `bg-base-200`, `text-primary-content`, `border-error/20` |
| radius | `--radius-selector` (체크박스·배지), `--radius-field` (버튼·인풋), `--radius-box` (카드·다이얼로그)                                   | `rounded-field`, `rounded-t-box`                         |
| 크기   | `--size-field`, `--size-selector` (기본 0.25rem 단위)                                                                                 | `h-field`, `h-field-sm`, `size-selector`                 |

```css
@import 'tailwindcss';
@import 'tw-animate-css';

/* 기본 테마 선택 (daisyUI와 같은 문법). 기본값: light --default, dark --prefersdark */
@plugin "@ma-ui/tailwind" {
    themes:
        light --default,
        dark --prefersdark;
}

/* 새 테마 정의 or 기존 테마 일부 덮어쓰기 */
@plugin "@ma-ui/tailwind/theme" {
    name: 'brand';
    color-scheme: light;
    --color-primary: oklch(55% 0.2 260);
    --color-primary-content: oklch(98% 0.01 260);
    --radius-field: 0.375rem;
}
```

테마 전환은 `<html data-theme="brand">` (또는 daisyUI처럼 `input.theme-controller`).
`dark:` variant 대신 테마 토큰이 다크 모드를 처리합니다.

컴포넌트 API도 daisyUI 스타일입니다 (Button, Badge, Alert):

```tsx
<Button>저장</Button>                                  {/* shadcn 기본: solid primary */}
<Button variant="outline">취소</Button>                {/* color 없으면 중립색 */}
<Button variant="soft" color="error">삭제</Button>     {/* variant × color */}
<Badge variant="outline" color="success">Active</Badge>
<Alert color="warning">...</Alert>
```

## 레지스트리 사용 (소비자 프로젝트)

1. `packages/registry/public/r`를 정적으로 호스팅 (`bun run build` 결과 `apps/storybook/dist/r/`에 포함 — Storybook과 같은 도메인에서 서빙)
2. 소비자 `components.json`에 네임스페이스 등록:

    ```json
    {
        "registries": {
            "@ma-ui": "https://<host>/r/{name}.json"
        }
    }
    ```

3. 설치:

    ```bash
    bunx shadcn add @ma-ui/style     # @ma-ui/tailwind, tw-animate-css, cn() + CSS 설정
    bunx shadcn add @ma-ui/button @ma-ui/dialog
    ```

> `@ma-ui/style`은 npm의 `@ma-ui/tailwind`를 설치합니다. 먼저 `packages/tailwind`를 npm에 배포하세요
> (스코프를 바꾸면 `packages/tailwind/package.json`, `packages/registry/scripts/build-registry.ts`, `apps/storybook/src/styles.css`도 같이 수정).

## 컴포넌트 추가/수정 워크플로

### shadcn에서 가져오기

```bash
bun run shadcn:import accordion hover-card   # 특정 컴포넌트 (+ 의존 컴포넌트)
bun run shadcn:import --all                  # 지원되는 전부
bun run shadcn:import button --dry           # 결과만 출력
bun run shadcn:import button --force         # 로컬 수정 덮어쓰기 (주의)
bun run shadcn:import --style vega ...       # 다른 shadcn 스타일 기반으로
```

`./shadcnui` (또는 `SHADCN_DIR`)의 `apps/v4/registry/bases/base`를 읽어서:

1. `cn-*` 플레이스홀더를 스타일 CSS(기본 `nova`)로 채움 — shadcn 자체 변환기 사용
2. 토큰 변환 (`packages/registry/scripts/lib/tokens.ts`): `bg-muted → bg-base-200`, `destructive → error`, `border-input → border-base-content/20`, radius → `selector/field/box`, 컨트롤 높이 → `h-field*`, `dark:` 제거
3. `<IconPlaceholder>` → lucide-react, import 경로 → `@/registry/ma/*`, oxfmt 정렬

기존 파일은 건너뜁니다. 가져온 뒤엔 자유롭게 수정하세요 — 가져오기는 출발점일 뿐입니다.
기본 제외: `chart`, `sonner`, AI 채팅 계열(`message`, `bubble` 등) — 필요하면 이름으로 가져오기.

### 직접 만들기

1. `packages/registry/src/ui/<name>.tsx` 작성 (import는 `@/registry/ma/ui/...`, `@/registry/ma/lib/utils`)
2. `apps/storybook/stories/ui/<name>.stories.tsx` 작성 (import는 `@ma-ui/registry/ui/<name>`)
3. `bun run registry:build` — 의존성(npm, 레지스트리)은 import에서 자동 추론.
   설명 등 메타데이터는 `packages/registry/scripts/build-registry.ts`의 `ITEM_OVERRIDES`에.

## 참고

- Storybook은 Vite 빌더를 씁니다 (Storybook이 Bun 번들러를 지원하지 않아서). 그 외엔 Bun 그대로.
- Bun isolated install을 쓰므로 각 패키지는 자기 `package.json`에 선언한 의존성만 볼 수 있습니다. 컴포넌트가 새 npm 패키지를 쓰면 `packages/registry`에 추가하세요.
- `shadcnui/`, `daisyui/`는 참고용 클론이며 gitignore 됩니다. `shadcn:import`가 `shadcnui/`를 읽습니다.
