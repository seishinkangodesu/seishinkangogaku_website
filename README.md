# Website update notes

This file explains how to update the website, especially the news section.

## Current local status

- The local website folder already includes the interactive news image feature.
- The news standby image is `news-standby.jpg`.
- One related news image is currently included: `news-2026-03-04-website-open.jpg`.
- The `2026.03.04` news item is linked to `news-2026-03-04-website-open.jpg`.
- GitHub push was not completed because authentication stopped. Push can be retried later.

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

## Current image-enabled news item

```html
<li class="news-item ..." data-news-image="news-2026-03-04-website-open.jpg">
```

Displayed news date:

```text
2026.03.04
```

Displayed news text:

```text
精神看護学研究室のウェブサイトを公開いたしました。
```
