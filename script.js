function vulnerableFunction() {
    var userInput = document.getElementById('userInput').value;

    // DOM XSSの脆弱性例
    document.body.innerHTML = userInput;

    // Cookie Injectionの脆弱性例
    document.cookie = "user=" + userInput + "; path=/";

    // evalの脆弱性例
    eval(userInput);

    // SQL Injectionの疑似例（実際のデータベース接続は含まない）
    var sqlQuery = "SELECT * FROM users WHERE name = '" + userInput + "'";
    console.log(sqlQuery); // デバッグ目的で表示
}
