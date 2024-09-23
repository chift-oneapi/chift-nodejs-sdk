import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});
// TODO: Setup Payment test data
const consumerId = process.env.CHIFT_PAYMENT_CONSUMER_ID as string;

let consumer: any;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

let payments: components['schemas']['PaymentItemOut'][];
test('getPayments', async () => {
    payments = await consumer.payment.getPayments({
        date_from: '2023-01-01',
        date_to: '2023-01-31',
    });
    expect(payments).toBeInstanceOf(Array);
    expect(payments.length).toBeGreaterThan(0);
    expect(payments[0]).toHaveProperty('id', expect.any(String));
});

test('getBalances', async () => {
    const balances: components['schemas']['BalanceItemOut'][] =
        await consumer.payment.getBalances();
    expect(balances).toBeInstanceOf(Array);
    expect(balances.length).toBeGreaterThan(0);
    expect(balances[0]).toHaveProperty('id', expect.any(String));
});

test('getTransactions', async () => {
    const transactions: components['schemas']['TransactionItemOut'][] =
        await consumer.payment.getTransactions();
    expect(transactions).toBeInstanceOf(Array);
    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0]).toHaveProperty('id', expect.any(String));
});

test('getPayment', async () => {
    const payment: components['schemas']['PaymentItemOut'] = await consumer.payment.getPayment({
        payment_id: payments[0].id,
    });
    expect(payment).toHaveProperty('id', payments[0].id);
});

test.skip('getRefunds', async () => {
    const refunds: components['schemas']['RefundItemOut'][] = await consumer.payment.getRefunds({
        date_from: '2023-01-01',
        date_to: '2023-01-31',
        payment_id: payments[0].id,
    });
    expect(refunds).toBeInstanceOf(Array);
    expect(refunds.length).toBeGreaterThan(0);
    expect(refunds[0]).toHaveProperty('id', expect.any(String));
});
