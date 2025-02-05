export type NewsCardContent = {
  title: string;
  subtitle: string;
  text?: string;
  featured?: boolean;
  cta: {
    disabled?: boolean;
    href: string;
    external?: boolean;
  };
  imgSrc?: string;
};
