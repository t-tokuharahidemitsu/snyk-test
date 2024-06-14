// 脆弱なJavaScriptコード

// 1. クロスサイトスクリプティング（XSS）
// URLパラメータ 'msg' をページに表示する。適切なサニタイズなしで行うと、XSS攻撃を許してしまう。
function displayMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('msg');
    if (message) {
        // innerHTML を使用しているため、スクリプトインジェクションのリスクがある
        document.getElementById('message').innerHTML = message;
    }
}

// 2. ローカルストレージを利用した不適切なデータ保存
// センシティブなユーザーデータ（パスワードなど）を暗号化せずにローカルストレージに保存
function saveCredentials(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password); // パスワードをプレーンテキストで保存（非常に危険）
}

// 3. 無制限な入力値を受け入れる
// サーバー側で受け入れたJSONデータをクライアント側で直接パースして使用する（信頼できないデータの場合は危険）
function parseUserData(jsonString) {
    try {
        const userData = JSON.parse(jsonString); // ユーザ入力からのJSONを直接パース（安全でない）
        console.log(`User Data: ${userData}`);
    } catch (error) {
        console.error('Invalid JSON data provided:', error);
    }
}

// 4. Open Redirect
// 任意のURLにリダイレクトする機能。URLのバリデーションをせずに任意のURLにリダイレクトすると、フィッシングサイトなどに誘導されるリスクがある。
function redirectTo(url) {
    window.location.href = url; // URLのバリデーションを行わずにリダイレクト（危険）
}

// イベントリスナーを設定して脆弱な関数を呼び出す
document.addEventListener('DOMContentLoaded', () => {
    // XSSテスト用のメッセージを表示
    displayMessage();

    // ユーザーの資格情報を保存する（デモ用のダミーデータ）
    saveCredentials('user123', 'password123');

    // JSONパースの例
    parseUserData('{"name": "John Doe", "email": "john@example.com"}');

    // Open Redirectの例
    // 例えば、https://example.com?redirect=https://malicious-site.com というURLでアクセスすると、悪意のあるサイトにリダイレクトされる
    const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
    if (redirectUrl) {
        redirectTo(redirectUrl);
    }
});
