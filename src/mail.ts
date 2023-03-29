//環境変数利用
require('dotenv').config()
const env = process.env

const nodemailer = require('nodemailer');

//
// SMTP の設定
//
const options = {
	service: env.SMTP_SERICE,
	port: env.SMTP_PORT, // ポート番号 25 など
	secure: env.SMTP_SECURE, // 465 番ポートを使う場合。それ以外は false
	requireTLS: false,
	tls: {
		rejectUnauthorized: false,
	},
	auth: { // 認証情報
		user: env.SMTP_USER, // ユーザー名
		pass: env.SMTP_PASSWORD, // パスワード
	},
};

//
// メールメッセージ
//
const mail = {
	from: 'foo@example.com', // 送信元メールアドレス
	to: 'katsumoto.k@arsaga.jp', // 送信先メールアドレス
	subject: 'Email Test Mail',
	text: `Email was sent!`,
	html: `<p>Email was sent!</p>`,
};

//
// メールの送信
//
(async () => {
	try {
		const transport = nodemailer.createTransport(options);
		const result = await transport.sendMail(mail);
		console.log('+++ Sent +++');
		console.log(result);
	} catch (err) {
		console.log('--- Error ---');
		console.log(err);
	}
})();