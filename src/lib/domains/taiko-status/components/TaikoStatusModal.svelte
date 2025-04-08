<script lang="ts">
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';
  import formatTaikoStatusPoints from '$shared/utils/formatTaikoStatusPoints';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import { type TaikoStatusInfo, TaikoStatusService } from '../service/TaikoStatusService';
  import { TaikoStatusModalStore } from '../stores/TaikoStatusModalStore';

  const modalClasses = classNames('modal', 'p-[24px]', 'overflow-y-scroll');
  const modalContentWrapperClasses = classNames(
    'rounded-[40px]',
    'font-clash-grotesk',
    'p-0',
    'bg-grey-700',
    'md:w-[748px]',
  );
  const modalTitleClasses = classNames(
    'pt-6',
    'px-[24px]',
    'flex',
    'justify-between',
    'items-center',
    'w-full',
    'm-0',
    'text-[24px]/[95%]',
  );
  const bodyWrapperClasses = classNames('text-grey-200', 'font-public-sans', 'px-[24px]');

  let modal = undefined as HTMLDialogElement | undefined;

  TaikoStatusModalStore.subscribe(async (open) => {
    if (open) {
      await loadTaikoStatus();
      modal?.showModal();
    } else {
      modal?.close();
    }
  });

  let currentStatus: null | TaikoStatusInfo = null;
  let nextStatus: null | TaikoStatusInfo = null;

  async function loadTaikoStatus() {
    const address = getConnectedAddress();
    const service = new TaikoStatusService();

    const { current, next } = await service.getTaikoStatus(address);

    currentStatus = current;
    nextStatus = next;
  }

  const buttonWrapperClasses = classNames('w-full', 'px-[24px]', 'py-[40px]', 'flex', 'justify-end');

  const statusProgressWrapperClasses = classNames(
    'w-full',
    'flex',
    'flex-col',
    'bg-grey-800',
    'gap-[16px]',
    'rounded-[30px]',
  );

  const statusProgressLabelClasses = classNames(
    'font-[700]',
    'text-[16px]/[24px]',
    'w-full',
    'flex',
    'justify-between',
    'text-grey-200',
  );

  const taikoStatusProgressClasses = classNames('progress', 'w-full', 'progress-primary', 'h-[16px]');

  const closeButtonClasses = classNames(
    'w-[50px]',
    'h-[50px]',
    'bg-grey-600',
    'rounded-full',
    'text-grey-100',
    'flex',
    'relative',
    'items-center',
    'justify-center',
    'hover:bg-grey-900',
    'transition-all',
  );
  const closeButtonIconClasses = classNames('absolute', 'left-[11px]', 'top-[11px]');
  const contentTitleClasses = classNames('font-clash-grotesk', 'text-[25px]/[42px]', 'text-grey-10');

  const textWrapperClasses = classNames('flex', 'w-full', 'flex-col', 'gap-[24px]', 'pb-[40px]');
  function closeModal() {
    TaikoStatusModalStore.set(false);
  }

  const infoPanelClasses = classNames(
    'bg-grey-800',
    'w-full',
    'flex',
    'gap-[20px]',
    'rounded-[30px]',
    'px-[24px]',
    'py-[30px]',
  );

  const dataWrapperClasses = classNames('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-[16px]');

  const wideInfoPanelClasses = classNames(infoPanelClasses, 'md:col-span-2');

  const infoPanelValuesClasses = classNames();

  const infoPanelValueClasses = classNames('font-clash-grotesk', 'text-[25px]/[42px]', 'text-grey-10');

  const infoPanelValueLabelClasses = classNames('font-[700]', 'text-grey-500', 'text-[16px]/[24px]');
</script>

<dialog bind:this={modal} class={modalClasses}>
  {#if currentStatus && nextStatus}
    <div class={modalContentWrapperClasses}>
      <div class={modalTitleClasses}>
        <span>What's next?</span>

        <button class={closeButtonClasses} on:click={closeModal}>
          <Icon type="x-close" class={closeButtonIconClasses} size={24} />
        </button>
      </div>

      <div class={classNames('divider')}></div>
      <div>
        <div class={bodyWrapperClasses}>
          <div class={textWrapperClasses}>
            <div class={contentTitleClasses}>Claim Complete, Status Updated!</div>

            <div>
              Holding TAIKO tokens boosts your Status. The more you hold, the more perks you unlock. Check your Taiko
              Status—you could be just steps away from a new level and unlocking fresh rewards and roles.
            </div>
          </div>
          <div class={dataWrapperClasses}>
            <div class={infoPanelClasses}>
              <img src="/taiko-status/profile.png" class="w-[60px] h-[60px]" alt="Profile" />

              <div class={infoPanelValuesClasses}>
                <div class={infoPanelValueClasses}>
                  {formatTaikoStatusPoints(currentStatus.points)}
                </div>
                <div class={infoPanelValueLabelClasses}>My Points</div>
              </div>
            </div>

            <div class={infoPanelClasses}>
              <img src={currentStatus.icon} class="w-[60px] h-[60px]" alt="Profile" />

              <div class={infoPanelValuesClasses}>
                <div class={infoPanelValueClasses}>
                  {currentStatus.name}
                </div>
                <div class={infoPanelValueLabelClasses}>My Status</div>
              </div>
            </div>
            <div class={wideInfoPanelClasses}>
              <div class={statusProgressWrapperClasses}>
                <div class={statusProgressLabelClasses}>
                  <div>Status Progress</div>
                  <div>{nextStatus.name}</div>
                </div>
                <progress class={taikoStatusProgressClasses} value={currentStatus.points} max={nextStatus.points} />
                <div class="text-grey-500">
                  {formatTaikoStatusPoints(currentStatus.points)} / {formatTaikoStatusPoints(nextStatus.points)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class={buttonWrapperClasses}>
        <ActionButton
          withArrow
          class="md:max-w-[300px]"
          href="https://taiko.mirror.xyz/vXGo-HofGENNl3J9ObyGponpAoIqAtNyQG_cKKlHeC4"
          target="_blank"
          priority="primary">How to earn more points</ActionButton>
      </div>
    </div>{/if}
</dialog>
