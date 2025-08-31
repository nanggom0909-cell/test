// Default ad configuration
const adConfig = {
  rewarded: ['hint', 'unlock'],
  interstitial: ['stageEnd', 'savePoint']
};

function showRewardedAd(reason) {
  console.log(`Showing rewarded ad for ${reason}`);
  // Placeholder: integrate real rewarded ad logic here
}

function showInterstitialAd(trigger) {
  console.log(`Showing interstitial ad at ${trigger}`);
  // Placeholder: integrate real interstitial ad logic here
}

function getDefaultAdConfig() {
  return adConfig;
}
