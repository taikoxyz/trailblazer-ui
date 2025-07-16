<script lang="ts">
  import { fade } from 'svelte/transition';

  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';
  import { closeOnEscapeOrOutsideClick } from '$shared/utils/customActions';
  import formatTaikoStatusPoints from '$shared/utils/formatTaikoStatusPoints';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import { type TaikoStatusInfo, TaikoStatusService } from '../service/TaikoStatusService';
  import { TaikoStatusModalStore, TaikoStatusModalType } from '../stores/TaikoStatusModalStore';

  const modalContentWrapperClasses = classNames(
    'rounded-[40px]',
    'h-max',
    'max-h-[100vh]',
    'overflow-y-auto',
    'font-clash-grotesk',
    'p-0',
    'bg-grey-700',
    'w-full',
    'max-w-[748px]',
    'mx-auto',
    'relative',
  );
  const modalTitleClasses = classNames(
    'pt-6',
    'px-[16px]',
    'sm:px-[24px]',
    'flex',
    'justify-between',
    'items-start',
    'sm:items-center',
    'w-full',
    'm-0',
    'text-[18px]/[24px]',
    'sm:text-[24px]/[95%]',
    'gap-3',
  );
  const bodyWrapperClasses = classNames(
    'text-grey-200',
    'font-public-sans',
    'px-[16px]',
    'sm:px-[24px]',
    'flex',
    'flex-col',
    'pb-[16px]',
    'sm:pb-[24px]',
  );

  TaikoStatusModalStore.subscribe(async (modalState) => {
    if (modalState.isOpen && modalState.type !== TaikoStatusModalType.NONE) {
      await loadTaikoStatus();
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

  const buttonWrapperClasses = classNames(
    'py-[16px]',
    'sm:py-[20px]',
    'md:col-span-2',
    'h-max',
    'px-[16px]',
    'sm:px-[24px]',
    'flex',
    'flex-col',
    'sm:flex-row',
    'gap-3',
    'justify-between',
  );

  const statusProgressWrapperClasses = classNames(
    'w-full',
    'flex',
    'flex-col',
    'bg-grey-800',
    'gap-[16px]',
    'rounded-[30px]',
    'px-[16px]',
    'sm:px-[24px]',
    'py-[20px]',
    'sm:py-[30px]',
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
    'w-[40px]',
    'h-[40px]',
    'sm:w-[50px]',
    'sm:h-[50px]',
    'bg-grey-600',
    'rounded-full',
    'text-grey-100',
    'flex',
    'flex-shrink-0',
    'items-center',
    'justify-center',
    'hover:bg-grey-900',
    'transition-all',
  );
  const closeButtonIconClasses = classNames('fill-primary-icon');
  const contentTitleClasses = classNames(
    'font-clash-grotesk',
    'text-[20px]/[32px]',
    'sm:text-[25px]/[42px]',
    'text-grey-10',
  );

  const textWrapperClasses = classNames(
    'flex',
    'w-full',
    'flex-col',
    'gap-[16px]',
    'sm:gap-[24px]',
    'pb-[20px]',
    'sm:pb-[40px]',
  );

  function closeModal() {
    $TaikoStatusModalStore.isOpen = false;
  }

  const infoPanelClasses = classNames(
    'bg-grey-800',
    'w-full',
    'flex',
    'gap-[12px]',
    'sm:gap-[20px]',
    'rounded-[20px]',
    'sm:rounded-[30px]',
    'px-[16px]',
    'sm:px-[24px]',
    'py-[20px]',
    'sm:py-[30px]',
  );

  const dataWrapperClasses = classNames('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-[16px]');

  const wideInfoPanelClasses = classNames(infoPanelClasses, 'md:col-span-2');

  const infoPanelValuesClasses = classNames('f-col', 'w-full');

  const infoPanelValueClasses = classNames('font-clash-grotesk', 'text-[25px]/[42px]', 'text-grey-10');

  const infoPanelValueLabelClasses = classNames('font-[700]', 'text-grey-500', 'text-[16px]/[24px]');

  const tableWrapperClasses = classNames('mt-6', 'overflow-x-auto');
  const tableClasses = classNames(
    'w-full',
    'border-collapse',
    'bg-grey-900',
    'rounded-lg',
    'overflow-hidden',
    'cursor-pointer',
  );
  const tableHeaderClasses = classNames('border-b-2', 'border-gray-800', 'bg-grey-700');
  const tableHeaderCellClasses = classNames(
    'text-left',
    'py-3',
    'px-4',
    'font-semibold',
    'text-grey-200',
    'border-b',
    'border-grey-700',
  );
  const tableRowClasses = classNames('border-b', 'border-grey-700');
  const tableRowHoverClasses = classNames(tableRowClasses, 'hover:bg-neutral-background');
  const tableCellClasses = classNames('py-3', 'px-4', 'text-grey-200');
  const dialogId = crypto.randomUUID();
  // Reactive variables for modal config
  $: modalState = $TaikoStatusModalStore;
  $: isModalOpen = modalState.isOpen && modalState.type !== TaikoStatusModalType.NONE;
</script>

{#if isModalOpen && currentStatus && nextStatus}
  <dialog
    id={dialogId}
    class:modal-open={isModalOpen}
    use:closeOnEscapeOrOutsideClick={{ enabled: isModalOpen, callback: closeModal, uuid: dialogId }}
    transition:fade
    class="modal">
    <div class={modalContentWrapperClasses}>
      <div class={modalTitleClasses}>
        <h1 class="text-left">Taiko Status meets Trailblazers</h1>

        <button class={closeButtonClasses} on:click={closeModal}>
          <Icon type="x-close" class={closeButtonIconClasses} size={20} />
        </button>
      </div>

      <div class={classNames('divider')}></div>
      <div>
        <div class={bodyWrapperClasses}>
          <div class={textWrapperClasses}>
            <p>
              <b>Holding TAIKO tokens boosts your Status. The more you hold, the more perks you unlock.</b> Check your Taiko
              Status—you could be just steps away from a new level and unlocking fresh rewards and roles.
            </p>
            <p>
              As part of Taiko Takeoff, supported projects will create opportunities, such as airdrops, for the Taiko
              community. This is where Taiko Status comes into play.
            </p>
          </div>

          <!-- Status Information - Always Visible (Non-collapsible) -->
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

          <div class={classNames('divider', 'mt-6')}></div>
          <div class={wideInfoPanelClasses}>
            <div class={textWrapperClasses}>
              <div class={contentTitleClasses}>Weekly bonus points</div>

              <!-- Weekly Bonus Points Section -->
              <div class="flex gap-[12px] sm:gap-[20px] items-start mb-6">
                <img src="/icons/gift.svg" class="size-[40px] flex-shrink-0" alt="Weekly Bonus" />
                <div class="flex-1">
                  <div class="text-grey-200 mb-4">
                    Each week you can earn additional Trailblazer Points by simply holding TAIKO. The exact numbers are
                    subject to change but the table below gives you a rough range of what you can expect.
                  </div>

                  <div class={tableWrapperClasses}>
                    <table class={tableClasses}>
                      <thead>
                        <tr class={tableHeaderClasses}>
                          <th class={tableHeaderCellClasses}>Rank</th>
                          <th
                            class="hidden sm:table-cell text-left py-3 px-2 sm:px-4 font-semibold text-grey-200 border-b border-grey-700"
                            >Status points range</th>
                          <th class={classNames(tableHeaderCellClasses, 'text-center', 'px-2', 'sm:px-4')}>Min</th>
                          <th class={classNames(tableHeaderCellClasses, 'text-center', 'px-2', 'sm:px-4')}>Max</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class={tableRowHoverClasses}>
                          <td class={tableCellClasses}>
                            <div class="font-semibold">Bronze</div>
                            <div class="text-xs text-grey-400 sm:hidden">1-5k</div>
                          </td>
                          <td class="hidden sm:table-cell py-3 px-2 sm:px-4 text-grey-200">1-5k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>350k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>500k</td>
                        </tr>
                        <tr class={tableRowHoverClasses}>
                          <td class={tableCellClasses}>
                            <div class="font-semibold">Silver</div>
                            <div class="text-xs text-grey-400 sm:hidden">5-25k</div>
                          </td>
                          <td class="hidden sm:table-cell py-3 px-2 sm:px-4 text-grey-200">5-25k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>500k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>700k</td>
                        </tr>
                        <tr class={tableRowHoverClasses}>
                          <td class={tableCellClasses}>
                            <div class="font-semibold">Gold</div>
                            <div class="text-xs text-grey-400 sm:hidden">25-100k</div>
                          </td>
                          <td class="hidden sm:table-cell py-3 px-2 sm:px-4 text-grey-200">25-100k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>700k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>850k</td>
                        </tr>
                        <tr class={tableRowHoverClasses}>
                          <td class={tableCellClasses}>
                            <div class="font-semibold">Platinum</div>
                            <div class="text-xs text-grey-400 sm:hidden">100-250k</div>
                          </td>
                          <td class="hidden sm:table-cell py-3 px-2 sm:px-4 text-grey-200">100-250k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>850k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>1,000k</td>
                        </tr>
                        <tr class={tableRowHoverClasses}>
                          <td class={tableCellClasses}>
                            <div class="font-semibold">Based</div>
                            <div class="text-xs text-grey-400 sm:hidden">250k+</div>
                          </td>
                          <td class="hidden sm:table-cell py-3 px-2 sm:px-4 text-grey-200">250k+</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>1,000k</td>
                          <td class={classNames(tableCellClasses, 'text-center', 'px-2', 'sm:px-4')}>1,000k</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class={buttonWrapperClasses}>
            <ActionButton
              withArrow
              class="w-full sm:max-w-[220px] font-[500]"
              href="https://taiko.mirror.xyz/vXGo-HofGENNl3J9ObyGponpAoIqAtNyQG_cKKlHeC4"
              target="_blank"
              priority="secondary">About Taiko Status</ActionButton>
            <ActionButton
              withArrow
              class="w-full sm:max-w-[220px] font-[500]"
              href="https://taiko.mirror.xyz/SfIbIBBE1fDs2IjD4AxgK9r8IFi5LiqzsGpjb3sChIM"
              target="_blank"
              priority="primary">Weekly bonus info</ActionButton>
          </div>
        </div>
      </div>
      <button class="overlay-backdrop" data-modal-uuid={dialogId} />
    </div>
  </dialog>
{/if}
