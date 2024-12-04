<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'flex',
    'justify-center',
    'items-center',
    'flex-col',
    //'h-[60vh]',
    'px-[48px]',
    'py-[112px]',
  );

  const titleClasses = classNames('font-clash-grotesk', 'text-[35px]/[42px]', 'font-[500]', 'mb-[16px]', 'text-center');
  const textClasses = classNames('text-[16px]/[24px]', 'text-center', 'text-[#ADB1B8]');
  const bottomTextClasses = classNames(
    textClasses,
    'w-full',
    '!text-left',
    'border-t',
    'pt-[24px]',
    'border-[#444A55]',
    'mt-[180px]',
    'md:block',
    'hidden',
  );
</script>

<div class={wrapperClasses}>
  <img src="/error/400.png" alt="Error" />

  <div class={titleClasses}>Access Restricted</div>
  <div class={textClasses}>This site is not available in your country.</div>

  <div class={bottomTextClasses}>
    The site is not available in the following countries: Afghanistan, American Samoa, Burundi, Bahamas, Botswana,
    Belarus, Canada, The Democratic Republic of the Congo, Central African Republic, Côte d’lvoire, People’s Republic of
    China, Cuba, Ethiopia, Ghana, Guam, Indonesia, Iraq, Islamic Republic of Iran, Cambodia, Democratic People’s
    Republic of Korea (North Korea), Lebanon, Sri Lanka, Libya, Mali, Myanmar, Northern Mariana Islands, Nicaragua,
    Panama, Pakistan, Puerto Rico, Russia, Sudan, Somalia, South Sudan, Syrian Arab Republic, Tunisia, Trinidad and
    Tobago, Ukraine, United States, Bolivarian Republic of Venezuela, U.S. Virgin Islands, Yemen, Zimbabwe
  </div>
</div>
