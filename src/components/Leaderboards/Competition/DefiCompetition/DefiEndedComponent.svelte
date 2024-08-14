<script lang="ts">
  import { CampaignEndedInfoBox } from '$components/Leaderboards/CampaignEndedInfoBox';

  export let title: string;
  export let description: string;
</script>

<CampaignEndedInfoBox {title} {description} />
