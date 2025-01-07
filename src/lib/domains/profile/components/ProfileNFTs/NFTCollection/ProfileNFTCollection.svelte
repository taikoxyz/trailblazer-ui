<script lang="ts">
  import ProfileTab from '../../ProfileTab.svelte';
  import Collection from './Collection.svelte';
</script>

<ProfileTab>
  <Collection collected={8} multiplier={1.2} collectionName="Devs" image="/multipliers/collection_dev.svg" />
</ProfileTab>
