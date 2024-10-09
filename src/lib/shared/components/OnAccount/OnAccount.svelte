<script lang="ts">
  import { type Account, account } from '$shared/stores/account';
  import { noop } from '$shared/utils/noop';

  export let change: (newAccount: Account, oldAccount?: Account) => void = noop;

  let prevAccount: Account;

  account.subscribe((newAccount) => {
    change(newAccount, prevAccount);
    prevAccount = newAccount;
  });
</script>
