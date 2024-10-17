<script lang="ts">
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';

  export let title: string;
  export let description: string;
</script>

<CampaignEndedInfoBox {title} {description} />
