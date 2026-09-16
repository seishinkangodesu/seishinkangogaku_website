/**
 * 資料投入口 — 公開設定の自動同期スクリプト
 * ---------------------------------------------------------------
 * 投入口（Googleフォーム）の回答スプレッドシートに紐づけて使う。
 *
 *   公開状態が「削除」以外 → 資料を「リンクを知っている全員が閲覧可」にする
 *   公開状態が「削除」      → 資料の公開を取り消し、非公開に戻す
 *
 * これにより、投稿者が状態を「削除」に変えるだけで、サイトから消えると同時に
 * ファイル自体も非公開になる。
 *
 * 設置手順は docs/README.md を参照。
 * ---------------------------------------------------------------
 */

// ===== 設定 =========================================================
// 回答が記録されるシート名。フォーム作成時の既定値は「フォームの回答 1」。
const SHEET_NAME = 'フォームの回答 1';

// 列を探すための見出しキーワード（見出しに含まれていればよい）
const FILE_COLUMN_KEYWORD = '資料';
const STATUS_COLUMN_KEYWORD = '公開状態';

// この文字を含む状態を「削除」とみなす
const DELETED_LABEL = '削除';
// ====================================================================


/**
 * 全行を走査して、各資料の公開設定をあるべき状態に揃える。
 * フォーム送信時と、5分ごとの定期実行の両方から呼ばれる。
 */
function syncSharing() {
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    if (!sheet) {
        throw new Error('シートが見つかりません: ' + SHEET_NAME + '（SHEET_NAME の設定を確認してください）');
    }

    const values = sheet.getDataRange().getValues();
    if (values.length < 2) return;   // 見出しのみ、または空

    const headers = values[0].map(String);
    const fileColumn = headers.findIndex(h => h.indexOf(FILE_COLUMN_KEYWORD) >= 0);
    const statusColumn = headers.findIndex(h => h.indexOf(STATUS_COLUMN_KEYWORD) >= 0);

    if (fileColumn < 0) {
        throw new Error('「' + FILE_COLUMN_KEYWORD + '」を含む列が見つかりません。フォームの質問名を確認してください。');
    }

    let published = 0, unpublished = 0, failed = 0;

    for (let row = 1; row < values.length; row++) {
        const cell = String(values[row][fileColumn] || '');
        if (!cell) continue;

        const status = statusColumn >= 0 ? String(values[row][statusColumn] || '') : '';
        const shouldPublish = status.indexOf(DELETED_LABEL) < 0;

        fileIdsIn(cell).forEach(fileId => {
            const result = applySharing(fileId, shouldPublish);
            if (result === 'failed') failed++;
            else if (shouldPublish) published++;
            else unpublished++;
        });
    }

    console.log('同期しました — 公開: %s件 / 非公開: %s件 / 失敗: %s件', published, unpublished, failed);
}


/**
 * セル内の文字列から、ドライブのファイルIDをすべて取り出す。
 * フォームは複数ファイルをカンマ区切りのURLで記録するため、複数返ることがある。
 */
function fileIdsIn(text) {
    const ids = [];
    const pattern = /[-\w]{25,}/g;
    let match;
    while ((match = pattern.exec(text)) !== null) {
        ids.push(match[0]);
    }
    return ids;
}


/**
 * ファイル1件の公開設定を、必要なときだけ変更する。
 * 既に目的の状態なら何もしない（実行回数の上限を無駄に消費しないため）。
 */
function applySharing(fileId, shouldPublish) {
    const target = shouldPublish ? DriveApp.Access.ANYONE_WITH_LINK : DriveApp.Access.PRIVATE;

    try {
        const file = DriveApp.getFileById(fileId);
        if (file.getSharingAccess() !== target) {
            file.setSharing(target, DriveApp.Permission.VIEW);
        }
        return 'ok';
    } catch (error) {
        // 資料以外のURLが紛れている場合などはここに来る。処理は止めない。
        console.error('処理できませんでした (%s): %s', fileId, error.message);
        return 'failed';
    }
}


/**
 * 初回に1度だけ手動で実行する。必要なトリガーを設定する。
 *   - フォーム送信時（回答の編集時も発火する）
 *   - 5分ごと（取りこぼしの保険）
 */
function setupTriggers() {
    ScriptApp.getProjectTriggers().forEach(trigger => ScriptApp.deleteTrigger(trigger));

    const spreadsheet = SpreadsheetApp.getActive();
    ScriptApp.newTrigger('syncSharing').forSpreadsheet(spreadsheet).onFormSubmit().create();
    ScriptApp.newTrigger('syncSharing').timeBased().everyMinutes(5).create();

    console.log('トリガーを設定しました。続けて syncSharing を1度実行して動作を確認してください。');
}
