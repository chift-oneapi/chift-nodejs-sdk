import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
import { Consumer } from '../../src/modules/consumer';

dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});

const consumerId = process.env.CHIFT_BANKING_CONSUMER_ID as string;

let consumer: ReturnType<typeof Consumer>;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

let financialInstitutions: components['schemas']['BankingFinancialInstitutionItem'][];
test('getFinancialInstitutions', async () => {
    financialInstitutions = await consumer.banking.getFinancialInstitutions();
    expect(financialInstitutions).toBeInstanceOf(Array);
    expect(financialInstitutions.length).toBeGreaterThan(0);
    expect(financialInstitutions[0]).toHaveProperty('id', expect.any(String));
    expect(financialInstitutions[0]).toHaveProperty('name', expect.any(String));
    expect(financialInstitutions[0]).toHaveProperty('country_code');
    expect(financialInstitutions[0]).toHaveProperty('bic');
});

let accounts: components['schemas']['BankingAccountItem'][];
test('getAccounts', async () => {
    accounts = await consumer.banking.getAccounts();
    expect(accounts).toBeInstanceOf(Array);
    expect(accounts.length).toBeGreaterThan(0);
    expect(accounts[0]).toHaveProperty('id', expect.any(String));
    expect(accounts[0]).toHaveProperty('account_number');
    expect(accounts[0]).toHaveProperty('iban');
    expect(accounts[0]).toHaveProperty('currency', expect.any(String));
    expect(accounts[0]).toHaveProperty('account_type');
    expect(accounts[0]).toHaveProperty('balance', expect.any(Number));
    expect(accounts[0]).toHaveProperty('financial_institution_id');
});

let transactions: components['schemas']['BankingTransactionItem'][];
test('getAccountTransactions', async () => {
    if (!accounts.length) {
        throw new Error('No accounts found to test getAccountTransactions');
    }

    transactions = await consumer.banking.getAccountTransactions(accounts[0].id);
    expect(transactions).toBeInstanceOf(Array);
    if (transactions.length > 0) {
        expect(transactions[0]).toHaveProperty('id', expect.any(String));
        expect(transactions[0]).toHaveProperty('amount', expect.any(Number));
        expect(transactions[0]).toHaveProperty('currency', expect.any(String));
        expect(transactions[0]).toHaveProperty('transaction_date', expect.any(String));
    }
});

let counterparts: components['schemas']['BankingCounterPartItem'][];
test('getAccountCounterparts', async () => {
    counterparts = await consumer.banking.getAccountCounterparts();
    expect(counterparts).toBeInstanceOf(Array);
    if (counterparts.length > 0) {
        expect(counterparts[0]).toHaveProperty('id', expect.any(String));
        expect(counterparts[0]).toHaveProperty('name', expect.any(String));
    }
});
