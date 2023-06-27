import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const agoraAppId = 'cfd1f96af9594fe0acda1ec589a41254';
const token =
    '007eJxTYCjWmq3HUelks9/1wrnWI2tjWwLZHpy/0epd90GEJVQrUEqBITktxTDN0iwxzdLU0iQt1SAxOSXRMDXZ1MIy0cTQyNTkzMJZKQ2BjAwG1wIZGKEQxGdnSM5IzMtLzWFgAABc2B/g';

export const config = { mode: 'rtc', codec: 'vp8', appId: agoraAppId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'channel';
