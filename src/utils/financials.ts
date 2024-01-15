import { AccountRead } from '~/openapi';

/**
 * @summary Filters a list of accounts by bank id
 *
 * @param accounts list of accounts
 * @param bankId bank id to filter by
 * @returns a list of accounts that match the bank id
 */
export const filterBankAccounts = (accounts: AccountRead[], bankId: string) => {
  return accounts.filter((account) => account.bank_id === bankId);
};
