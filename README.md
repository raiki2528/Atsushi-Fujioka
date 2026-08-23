# 藤岡篤司ポートフォリオ

藤岡篤司さんの教育、福祉、国際協力、地域づくり、研究活動を紹介する静的ウェブサイトです。HTML / CSS / JavaScriptのみで動作します。

## ローカルで見る

このフォルダで次を実行し、ブラウザで `http://localhost:8080` を開きます。

```sh
python3 -m http.server 8080
```

## ページ

- `index.html` — Home
- `profile.html` — プロフィールと経歴
- `story.html` — 活動の歩み
- `philippines.html` — フィリピンでの教育・福祉実践
- `education.html` — 教育実践
- `community.html` — 地域づくり
- `art.html` — アートとまちづくり
- `research.html` — 研究領域
- `publications.html` — 研究発表・メディア
- `projects.html` — 活動・所属
- `gallery.html` — 写真アーカイブ

## 主な情報源

- [researchmap](https://researchmap.jp/fujioka_atsushi)
- [J-GLOBAL](https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202401006218208820)
- [認定NPO法人CLACK](https://clack.ne.jp/team)
- [つわの学びみらい](https://tsuwano-mm.org/)
- [関西大学初等部](https://www.kansai-u.ac.jp/elementary/2019/12/post-724.html)
- [House of Joy](https://jj.hoj.jp/hoj/2022/24858/)
- [グラントワ](https://www.grandtoit.jp/theater/event/5788/)

公開情報に矛盾がある出身地、更新時期を確認できない現在役職、独立した裏付けのない実績、センシティブな個人情報は掲載していません。

## 写真の差し替え

写真は `assets/images/` にあります。同じファイル名・縦横比の画像に差し替えるとレイアウトを保てます。プロフィールのメイン画像は `profile-full.jpg` です。

## 公開前の確認

- 本人による文章、肩書、年表、研究発表名の最終確認
- 子ども、地域住民、関係者が写る写真の二次利用許諾
- 日刊まにら新聞紙面のウェブ掲載許諾
- 外部団体名・ロゴ・活動説明の表記確認
- 公開URLに合わせたOGP URLと独自ドメイン設定

## デプロイ

ビルド工程は不要です。Vercelでは Framework Preset を `Other`、Output Directory を `./` としてこのフォルダを公開できます。
