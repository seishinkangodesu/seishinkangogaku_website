# Website update notes

This file explains how to update the website, especially the news section.

## Current local status

- The local website folder already includes the interactive news image feature.
- The news standby image is `news-standby.jpg`.
- Two related news images are currently included: `news-2026-05-12-zemi.jpg` and `news-2026-03-04-website-open.jpg`.
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

## Current image-enabled news items

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
