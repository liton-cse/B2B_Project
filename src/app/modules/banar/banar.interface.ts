/**
 * Banner interface
 * Single banner configuration for the system
 */
export interface webBanner{
  image: string;
}

export interface mobileBanner{
  image: string;
} 
export interface IBanner {
  webBanners?: webBanner[];
  mobileBanners?: mobileBanner[];
}
