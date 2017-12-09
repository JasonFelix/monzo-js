# A Monzo API Wrapper

This is an easy to use asynchronous javascript library for the Monzo API.

- [Installation](#installation)
	- [ES6](#installation-es6)
	- [Nodejs](#installation-nodejs)
- [OAuth API](#oauth-api)
	- [Using authentication code](#oauth-api-auth)
	- [Using a password](#oauth-api-password)
	- [Using client credentials](#oauth-api-clientcredentials)
	- [Refreshing tokens](#oauth-api-refreshtokens)
- [Accounts API](#accounts-api)
	- [Get all accounts](#accounts-api-all)
	- [Find an account](#accounts-api-find)
- [Transactions API](#transactions-api)
	- [Get all transactions](#transactions-api-all)
	- [Find a transaction](#transactions-api-find)
	- [Query transactions](#transactions-api-query)
	- [Get transactions before a date](#transactions-api-before)
	- [Get transactions since a date](#transactions-api-since)
	- [Get transactions between dates](#transactions-api-between)
- [Balance API](#balance-api)
	- [Getting Balance](#balance-api-find-on-account)
	- [Finding Balance](#balance-api-find-on-monzo)
- [Pots API](#pots-api)
	- [Get all pots](#pots-api-all)
	- [Find a pot](#pots-api-find)
- [Webhooks API](#webhooks-api)
	- [Get all webhooks](#webhooks-api-all)
	- [Find a webhook](#webhooks-api-find)
	- [Register a webhook](#webhooks-api-register)
	- [Delete a webhook](#webhooks-api-delete)

### <a name="installation"></a> Installation
##### <a name="installation-es6"></a> ES6
```js
import monzo from 'monzo-js';

const monzo = new Monzo(accessToken);
```

##### <a name="installation-nodejs"></a> Nodejs
```js
const monzo = require('monzo-js');

const monzo = new Monzo(accessToken);
```

### <a name="oauth-api"></a> OAuth API

##### <a name="oauth-api-auth"></a> Authenticate using an authentication token
```js
Monzo.OAuth.usingAuthCode(clientId, clientSecret, redirectURI, authCode) => {
	console.log(access_token);
});

```
##### <a name="oauth-api-password"></a> Authenticate using a password
```js
Monzo.OAuth.usingPassword(clientId, username, password) => {
	console.log(access_token);
});

```

##### <a name="oauth-api-clientcredentials"></a> Authenticate using Client Credentials
```js
Monzo.OAuth.usingClientCredentials(clientId, clientSecret).then(({access_token}) => {
	console.log(access_token);
});

```

##### <a name="oauth-api-refreshtokens"></a> Refreshing tokens
```js
Monzo.OAuth.refreshToken(clientId, clientSecret, refreshToken) => {
	console.log(access_token);
});

```
### <a name="accounts-api"></a> Accounts API

##### <a name="accounts-api-all"></a> Find all accounts
```js
monzo.accounts.all().then(accounts => {
	for (const [id, acc] of accounts) {
		console.log(`💵 £${acc.balance} in ${acc.id}`);
	}
});
```

##### <a name="accounts-api-find"></a> Find a specific account
```js
monzo.accounts.find(accountId).then(account => {
  console.log(account.id);
});
```

### <a name="transactions-api"></a>  Transactions API

##### <a name="transactions-api-all"></a> Find all transactions
```js
account.transactions.all().then(transactions => {
  for (const [id, transaction] of transactions) {
		console.log(transaction.id);
	}
});
```
##### <a name="transactions-api-find"></a> Find a specific transaction
```js
account.transactions.find(transactionId).then(transaction =>
	console.log(`Transaction Id: ${transcation.id}`)
);
```
##### <a name="transactions-api-query"></a> To query transactions
```js
const q = {since: '2016-01-01T01:45:29.54Z', before: '2017-10-01T01:45:29.54Z', limit: 100};

account.transactions.query(q).then(transactions => {
  for (const [id, transaction] of transactions) {
		console.log(transaction.id);
	}
});
```
##### <a name="transactions-api-before"></a> Find transactions before a date
```js
const date = '2016-01-01T01:45:29.54Z';

account.transactions.before(date).then(transactions => {
  for (const [id, transaction] of transactions) {
		console.log(transaction.id);
	}
});
```
##### <a name="transactions-api-since"></a> Find transactions since a date
You can use also use `after` instead of `since`.
```js
const date = '2016-01-01T01:45:29.54Z';

account.transactions.since(date).then(transactions => {
  for (const [id, transaction] of transactions) {
		console.log(transaction.id);
	}
});
```
##### <a name="transactions-api-between"></a> Find transactions after between dates
```js
const since = '2016-01-01T01:45:29.54Z'
const before = '2017-01-01T01:45:29.54Z';

account.transactions.between(since, before).then(transactions => {
  for (const [id, transaction] of transactions) {
		console.log(transaction.id);
	}
});
```
### <a name="balance-api"></a>  Balance API
There are two ways to get a balance, through the Account object or fetching directly on the Monzo object.

##### <a name="balance-api-find-on-account"></a> Find Balance through Account
```js
monzo.accounts.find(accountId).then(account => {
  const balance = account.balance;

	const amount = balance.amount;
	const currency = balance.currency;

	console.log(`${amount} ${currency} in ${account.id}`);
});
```

##### <a name="balance-api-find-on-monzo"></a> Find Balance directly through Monzo Client
```js
monzo.fetchBalance(accountId).then(balance => {
  const balance = account.balance;

	const amount = balance.amount;
	const currency = balance.currency;

	console.log(`${amount} ${currency} in ${accountId}`);
});
```
### <a name="pots-api"></a> Pots API

##### <a name="pots-api-all"></a> Find all Pots
```js
monzo.pots.all().then(pots => {
  for (const [id, pot] of pots) {
    console.log(`${pot.name}: ${pot.balance} ${pot.currency}`);
  }
});
```
##### <a name="pots-api-find"></a> Find a specific Pot
```js
monzo.pots.find(potId).then(pot => {
  console.log(`${pot.name}: ${pot.balance} ${pot.currency}`);
});
```

### <a name="webhooks-api"></a> Webhooks API

##### <a name="webhooks-api-all"></a> Find all webhooks
```js
account.webhooks.all().then(webhooks => {
	for (const [id, webhook] of webhooks) {
		console.log(`Webhook ${id} hooked to ${webhook.url}`);
	}
});
```

##### <a name="webhooks-api-find"></a> Find a specific webhook
```js
account.webhooks.find(webhookId).then(webhook => {
	console.log(`Webhook ${id} hooked to ${webhook.url}`);
});
```

##### <a name="webhooks-api-register"></a> Register a webhook
```js
account.webhooks.register(url);
```

##### <a name="webhooks-api-delete"></a> Delete a webhook
```js
account.webhooks.delete(url);
```
