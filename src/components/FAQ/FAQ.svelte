<script lang="ts">
  import { FAQDropdown } from '$components/Dropdown';
  import { MOCK_FAQS } from '../../tests/mocks/faq';
</script>

<div class=" w-full px-[0px]">
  <div class="pb-[30px]">
    <div class="display-large-medium">FAQs</div>
  </div>
  <div class="flex flex-col w-full gap-4">
    {#each MOCK_FAQS as { question, answer }}
      <FAQDropdown {question} {answer}></FAQDropdown>
    {/each}
  </div>
</div>
