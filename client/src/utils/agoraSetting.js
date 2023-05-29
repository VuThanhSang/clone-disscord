import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const agoraAppId = 'cfd1f96af9594fe0acda1ec589a41254';
const token =
    '007eJxTYOi6OXttl29356XTk+dUMrKnGS754Mds83DukysTs+bW5E9QYEhOSzFMszRLTLM0tTRJSzVITE5JNExNNrWwTDQxNDI1WbalIKUhkJGh9MdhVkYGCATx2RmSMxLz8lJzGBgAYggjaQ==';

export const config = { mode: 'rtc', codec: 'vp8', appId: agoraAppId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'channel';
