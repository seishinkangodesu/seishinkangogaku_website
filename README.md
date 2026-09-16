# Website update notes

This file explains how to update the website, especially the news section.

## 作業前後の手順

1. **作業開始前** に必ず `git pull` でGitHubから最新の状態を取得する（競合を防ぐため）
2. 変更後は `git add`, `git commit`, `git push` でGitHubへ反映する

## Current local status

- The local website folder already includes the interactive news image feature.
- The news standby image is `news-standby.jpg`.
- Four related news images are currently included: `news-2026-07-18-kenkyu-keikaku-happyo.jpg`, `news-2026-06-02-online-record.jpg`, `news-2026-05-12-zemi.jpg`, and `news-2026-03-04-website-open.jpg`.
- The `2026.07.18` news item is linked to `news-2026-07-18-kenkyu-keikaku-happyo.jpg`.
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
<li class="news-item ..." data-news-image="news-2026-07-18-kenkyu-keikaku-happyo.jpg">
```

```text
2026.07.18 — M1のI.R.さんが大学院の「看護研究演習」の研究計画発表をしました。「たくさんの意見を貰って勉強になりました。（by 本人）」とのことでした。これからも一緒に頑張っていきましょう！　※画像は予演の様子です。
```

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

---

## 資料投入口（教員が自分で資料を掲載する仕組み）

教員本人がGoogleフォームに資料（PDF・画像）を投入すると、「もっと詳しく見る」内の
「資料」に自動で表示される。設置手順は [docs/README.md](docs/README.md) を参照。

- 投入口のURLが教員を識別するため、**どのGoogleアカウントから投入してもよい**
- 資料は「下書き / 公開 / 削除」の状態を持ち、投稿者自身が確認メールのリンクから変更できる
  - 削除 … サイトから消え、ファイルも自動で非公開に戻る
- サイト側の設定は `index.html` の `DOC_SOURCES`。空のままならセクションは表示されない
- 現在は藤本先生の分のみ。石田先生の分は動作確認後に複製する

### 2つのURL

| 用途 | URL | 取得元 |
|---|---|---|
| **投入口**（資料を入れる） | フォームの回答用リンク | Googleフォームの「送信」→ 🔗 から取得 |
| **下書きの確認** | 下記 | 記録場所はこのREADMEのみ |

```
https://seishinkangodesu.github.io/seishinkangogaku_website/?preview=fujimoto-draft-2026
```

下書きURLはGoogleが発行するものではなく、`index.html` の `PREVIEW_TOKEN` に書いた合言葉から
組み立てたもの。合言葉を変えるとこのURLも変わるので、変更したらここも直すこと。
合言葉は教員ごとではなく**サイト全体で共通**（石田先生を追加すると同じURLで両方の下書きが見える）。

### アカウントについて

**大学アカウント（@hyo-med.ac.jp）は、保管にも投入にも使えない。**（2026-09-16 実測で確定）

| 用途 | 大学アカウント | 理由 |
|---|---|---|
| 資料の保管先 | **不可** | Drive の「リンクを知っている全員」が選べず、サイト訪問者が閲覧できない |
| 投入（フォーム送信） | **不可** | 外部フォームへのファイル添付が学外共有とみなされ、ドメインポリシーで拒否される |

投入をブロックされると、フォームの代わりに `/closedform` が開き、こう表示される。

```
ドキュメントをフォームのオーナーと共有する権限がないため、
資料投入口（…）に返信できません。
このフォームはドメイン外部で作成されました。
```

**したがって、教員には個人のGmailで投入してもらう。** 保管先は領域名義の
Googleアカウント（`seishinkangodesu@gmail.com`）。

### 複数アカウントにログインしているときの注意

Chrome に複数の Google アカウントでログインしていると、フォームは
**最初にログインしたアカウント（`/u/0`）** を既定で使う。Chrome のプロフィール表示が
大学アカウントでも、フォーム側は別のアカウントで送信されることがある。

- フォーム上部に表示されているアドレスが、実際に記録されるアドレス
- 違っていれば「アカウントを切り替える」で変更する
- 確実に切り分けたいときはシークレットウィンドウを使う
- **確認メールは、送信に使われたアカウントに届く**（意図と違う受信箱に届くことがある）

### 回答の編集用URLについて

確認メールの「回答を編集」のURL（`edit2=` を含む）は、**そのURLを知っている人なら誰でも
その回答を編集できる**。他人に転送しないこと。

**注意:** プレビューの合言葉はページのソースから読み取れる。下書きは秘密を守る仕組みではないので、
未発表データや投稿中の論文は投入しないこと。
