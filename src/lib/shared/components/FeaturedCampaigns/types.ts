export type CampaignCardType = {
  title: string;
  text: string;
  btn: {
    text: string;
    external: boolean;
    destination: string;
  };
  images: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};
