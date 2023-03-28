import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const agoraAppId = 'cfd1f96af9594fe0acda1ec589a41254';
const token =
    '007eJxTYDhpfLnhZJyA3J7Px+Utb218qMPNukHgWJm9NvfR0/9T+A0UGJLTUgzTLM0S0yxNLU3SUg0Sk1MSDVOTTS0sE00MjUxNWD8ppTQEMjLcWKbOzMgAgSA+O0NyRmJeXmoOAwMAkCMgBA==';

export const config = { mode: 'rtc', codec: 'vp8', appId: agoraAppId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'channel';
