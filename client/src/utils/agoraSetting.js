import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const agoraAppId = 'cfd1f96af9594fe0acda1ec589a41254';
const token =
    '007eJxTYEicwTCBJ/XlNaNa9es/9W8K7Nu0bv807o9WYUlXed7tq3VSYEhOSzFMszRLTLM0tTRJSzVITE5JNExNNrWwTDQxNDI1SRHTSGkIZGSwnZDNyMgAgSA+O0NyRmJeXmoOAwMA1KAghQ==';

export const config = { mode: 'rtc', codec: 'vp8', appId: agoraAppId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'channel';
