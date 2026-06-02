# Website update notes

This file explains how to update the website, especially the news section.

## 作業前後の手順

1. **作業開始前** に必ず `git pull` でGitHubから最新の状態を取得する（競合を防ぐため）
2. 変更後は `git add`, `git commit`, `git push` でGitHubへ反映する

## Current local status

- The local website folder already includes the interactive news image feature.
- The news standby image is `news-standby.jpg`.
- Three related news images are currently included: `news-2026-06-02-online-record.jpg`, `news-2026-05-12-zemi.jpg`, and `news-2026-03-04-website-open.jpg`.
- The `2026.06.02` news item is linked to `news-2026-06-02-online-record.jpg`.
- The `2026.05.12` news item is linked to `news-2026-05-12-zemi.jpg`.
- The `2026.03.04` news item is linked to `news-2026-03-04-website-open.jpg`.
- All changes have been pushed to GitHub.

## News image rules

- Standby image: `news-standby.jpg`
- Per-news image format: `news-YYYY-MM-DD-short-name.jpg`
- Use lowercase letters, numbers, and hyphens only.
- Keep all news images in this website folder.
- In `index.html`, set each news item with `data-news-image="image-file-name.jpg"`.
- If a news item has no related image, use `data-news-image="news-standby.jpg"`.
- If a news item has a related image other than `news-standby.jpg`, the `画像を見る` badge is shown automatically.
- News items without a related image do not show the badge and are not clickable.
- When an image-enabled news item is clicked, its related image is shown for 5 seconds, then returns to `news-standby.jpg`.

## Example

News item without a related image:

```html
<li class="news-item ..." data-news-image="news-standby.jpg">
```

News item with a related image:

```html
<li class="news-item ..." data-news-image="news-2026-04-01-new-student.jpg">
```

## セキュリティ管理

### 2026-05-29 セキュリティ確認済み

- APIキー・パスワードの直書きがないことを確認済み
- バックエンドファイルは存在しない（HTML・画像のみの静的サイト）
- GitHub Pagesでホスティングのため、バックエンドのリスクなし

### .gitignore 更新（2026-05-29）

以下のファイルをGitの管理対象から除外する設定を追加した：

- `.env` — APIキー等の秘密情報ファイル
- `*.key` / `*.pem` / `*.p12` / `*.pfx` — 証明書ファイル
- `Thumbs.db` / `Desktop.ini` / `.DS_Store` — OSが自動生成するファイル

将来APIキーが必要な機能を追加する際は、必ず`.env`ファイルに値を記載し、コードには直書きしないこと。

---

## Current image-enabled news items

```html
<li class="news-item ..." data-news-image="news-2026-06-02-online-record.jpg">
```

```text
2026.06.02 — 精神看護学領域（＝研究室）の学部教育では、これまで演習でペーパーの記録用紙を使用していましたが、今年から領域にカスタマイズしたオンライン記録用紙を試行的に取り入れています。
```

```html
<li class="news-item ..." data-news-image="news-2026-05-12-zemi.jpg">
```

```text
2026.05.12 — 精神看護学研究室の定例ゼミ（毎週火曜日）が開始しています。発表は学生と教員が順番に担当し、お互いの研究について議論し高め合っています。
```

```html
<li class="news-item ..." data-news-image="news-2026-03-04-website-open.jpg">
```

```text
2026.03.04 — 精神看護学研究室のウェブサイトを公開いたしました。
```
