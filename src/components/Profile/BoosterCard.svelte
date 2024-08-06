<script lang="ts">
  import { Button } from '$components/Button';
  import { AbstractProfileCard } from '$components/Profile/Template';
  import { Tooltip } from '$components/Tooltip';
</script>

<AbstractProfileCard class="bg-[#1B0E3E]">
  <div slot="title" class="title-subsection-bold">Multipliers</div>
  <Tooltip slot="tooltip">tooltip</Tooltip>
  <div slot="status" class="display-medium-medium">1x</div>
  <Button slot="cta" type="neutral" block class="px-4 py-2 truncate bg-[#5D08C8] border-none body-bold  mt-auto"
    >Boost</Button>
</AbstractProfileCard>
