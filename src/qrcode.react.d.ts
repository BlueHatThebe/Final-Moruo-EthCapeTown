declare module 'qrcode.react' {
    import * as React from 'react';

    interface QRCodeProps {
        value: string;
        size?: number;
        bgColor?: string;
        fgColor?: string;
        level?: 'L' | 'M' | 'Q' | 'H';
        style?: React.CSSProperties;
    }

    export default class QRCode extends React.Component<QRCodeProps> {}
}
