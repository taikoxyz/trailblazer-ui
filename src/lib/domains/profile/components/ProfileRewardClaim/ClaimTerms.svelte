<script lang="ts">
  import { t } from 'svelte-i18n';

  import { tokenClaimTermsAccepted } from '$shared/stores/tokenClaim';
  import { classNames } from '$shared/utils/classNames';

  const textClasses = classNames('text-secondary-content', 'text-base', 'font-normal', 'text-center');
</script>

<div class={textClasses}>
  <p>
    By confirming your claim, you agree to the
    <a
      href="https://www.notion.so/taikoxyz/Legal-Disclaimer-89047a75cb0948f8833032f3467660c4"
      target="_blank"
      class="underline text-pink-200 hover:text-primary">
      terms and conditions
    </a>
    of the token distribution and authorize the transfer of tokens directly to your wallet.
  </p>
  <div class="form-control pt-[24px] f-row items-center justify-center">
    <label class="cursor-pointer f-col md:f-row gap-0 md:flex-row md:gap-[10px] label font-[400]">
      <input
        type="checkbox"
        bind:checked={$tokenClaimTermsAccepted}
        class="checkbox checkbox-primary bg-black bg-opacity-50" />
      <span>{$t('claim.terms_agree')}</span>
    </label>
  </div>
</div>
