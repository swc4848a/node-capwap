#diagram

### Mermaid

[Mermaid](http://knsv.github.io/mermaid/) doc for modules interaction

```
sequenceDiagram
    participant eap_proxy
    participant external_hostapd
    participant internal_hostapd
    participant capwap
    participant wtp_wpa
    participant wpa_supplicant

    capwap-->>wtp_wpa: IEEE 802.11 WLAN Configuration Request
    wtp_wpa-->>capwap: IEEE 802.11 WLAN Configuration Response
    
    Note over capwap,wtp_wpa: wtp connect success

    loop 2 Times
        capwap->>external_hostapd: CW_IPC_MSG_C2E_VAP_ADD
        external_hostapd->>capwap: CW_IPC_MSG_E2C_WLAN_INIT
    end

    loop 2 Times
        capwap->>external_hostapd: CW_IPC_MSG_C2E_WLAN_KEY
        capwap->>external_hostapd: CW_IPC_MSG_C2E_VAP_CHG
        external_hostapd->>capwap: CW_IPC_MSG_E2C_WLAN_KEY
    end

    loop 2 Times
        capwap->>external_hostapd: CW_IPC_MSG_C2E_WLAN_KEY
    end

    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_ADD
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_ADDED
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_ASSOC
    wtp_wpa-->>internal_hostapd: Association Request(SSID)
    internal_hostapd->>capwap: CW_IPC_MSG_I2C_STA_ADD
    internal_hostapd-->>wtp_wpa: Association Request
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_ASSOC
    capwap-->>wtp_wpa: Station Configuration Request
    capwap->>external_hostapd: CW_IPC_MSG_C2E_STA_ADD

    loop 2 Times
        external_hostapd->>capwap: CW_IPC_MSG_E2C_WLAN_KEY
    end

    Note over external_hostapd: EAP: Server state machine created

    wtp_wpa-->>capwap: Station Configuration Response

    external_hostapd->>capwap: CW_IPC_MSG_E2C_8021X [EAP Packet (identifier)]
    capwap-->>wtp_wpa: EAP Request Identity
    capwap->>external_hostapd: CW_IPC_MSG_C2E_STA_KEY_CLR
    
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

    wtp_wpa-->>capwap: EAP Response Identity
    capwap->>external_hostapd: CW_IPC_MSG_C2E_8021X [EAP Response-Identity]

    external_hostapd->>eap_proxy: Access-Request[User-Name]
    eap_proxy->>external_hostapd: Access-Challenge[EAP-Request-PEAP]

    external_hostapd->>capwap: CW_IPC_MSG_E2C_8021X[IEEE 802.1X]
    

    capwap-->>wtp_wpa: EAP Request Tunneled TLS EAP (EAP-PEAP)

    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

    wtp_wpa-->>capwap: TLSv1 Client Hello

    loop 3 Times
        capwap-->>wtp_wpa: TLSv1 Server Hello, Certificate, Sever Hello Done
        
        wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
        wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

        wtp_wpa-->>capwap: EAP Response, Tunneled TLS EAP (EAP-PEAP)
    end

    loop 3 Times
        capwap->>external_hostapd: CW_IPC_MSG_C2E_8021X[EAP Response-PEAP]
        external_hostapd->>eap_proxy: Access-Request[EAP-Message]
        eap_proxy->>external_hostapd: Access-Challenge[EAP-Message]
        external_hostapd->>capwap: CW_IPC_MSG_E2C_8021X[EAP-Request-PEAP]
    end

    external_hostapd->>capwap: CW_IPC_MSG_E2C_WIDS_EAPOL_INFO

    capwap-->>wtp_wpa: TLSv1 Server Hello, Certificate, Sever Hello Done
    
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

    wtp_wpa-->>capwap: TLSv1 Client Key Exchange, Change Cipher Spec, Encrypted Handshake Message
    capwap-->>wtp_wpa: TLSv1 New Session Ticket

    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

    loop 2 Times
        wtp_wpa-->>capwap: TLSv1 Application Data
        capwap-->>wtp_wpa: TLSv1 Application Data

        wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
        wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X
    end

    wtp_wpa-->>capwap: TLSv1 Application Data

    eap_proxy->>external_hostapd: EAP Success
    external_hostapd->>capwap: CW_IPC_MSG_E2C_8021X
    capwap->>external_hostapd: CW_IPC_MSG_C2E_8021X
    capwap-->>wtp_wpa: EAP Success

    loop 2 Times
        capwap-->>wtp_wpa: EAPOL Key
        wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
        wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X
        wtp_wpa-->>capwap: EAPOL Key
    end

    loop 2 Times
        capwap->>external_hostapd: EAPOL_KEY
        external_hostapd->>capwap: CW_IPC_MSG_E2C_8021X
        capwap->>external_hostapd: CW_IPC_MSG_C2E_8021X
    end

    capwap-->>wtp_wpa: Station Configuration Request

    external_hostapd->>capwap: CW_IPC_MSG_E2C_WLAN_KEY
    capwap->>external_hostapd: CW_IPC_MSG_C2E_WLAN_KEY

    wtp_wpa-->>capwap: Station Configuration Response

    capwap->>external_hostapd: CW_IPC_MSG_C2E_STA_IPADDR
```

Generated diagram

![Generated diagram](https://mermaidjs.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgZWFwX3Byb3h5XG4gICAgcGFydGljaXBhbnQgZXh0ZXJuYWxfaG9zdGFwZFxuICAgIHBhcnRpY2lwYW50IGludGVybmFsX2hvc3RhcGRcbiAgICBwYXJ0aWNpcGFudCBjYXB3YXBcbiAgICBwYXJ0aWNpcGFudCB3dHBfd3BhXG4gICAgcGFydGljaXBhbnQgd3BhX3N1cHBsaWNhbnRcblxuICAgIGNhcHdhcC0tPj53dHBfd3BhOiBJRUVFIDgwMi4xMSBXTEFOIENvbmZpZ3VyYXRpb24gUmVxdWVzdFxuICAgIHd0cF93cGEtLT4-Y2Fwd2FwOiBJRUVFIDgwMi4xMSBXTEFOIENvbmZpZ3VyYXRpb24gUmVzcG9uc2VcbiAgICBcbiAgICBOb3RlIG92ZXIgY2Fwd2FwLHd0cF93cGE6IHd0cCBjb25uZWN0IHN1Y2Nlc3NcblxuICAgIGxvb3AgMiBUaW1lc1xuICAgICAgICBjYXB3YXAtPj5leHRlcm5hbF9ob3N0YXBkOiBDV19JUENfTVNHX0MyRV9WQVBfQUREXG4gICAgICAgIGV4dGVybmFsX2hvc3RhcGQtPj5jYXB3YXA6IENXX0lQQ19NU0dfRTJDX1dMQU5fSU5JVFxuICAgIGVuZFxuXG4gICAgbG9vcCAyIFRpbWVzXG4gICAgICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFX1dMQU5fS0VZXG4gICAgICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFX1ZBUF9DSEdcbiAgICAgICAgZXh0ZXJuYWxfaG9zdGFwZC0-PmNhcHdhcDogQ1dfSVBDX01TR19FMkNfV0xBTl9LRVlcbiAgICBlbmRcblxuICAgIGxvb3AgMiBUaW1lc1xuICAgICAgICBjYXB3YXAtPj5leHRlcm5hbF9ob3N0YXBkOiBDV19JUENfTVNHX0MyRV9XTEFOX0tFWVxuICAgIGVuZFxuXG4gICAgd3RwX3dwYS0-PndwYV9zdXBwbGljYW50OiBDV19XUEFfTVNHX0MyRV9TVEFfQUREXG4gICAgd3BhX3N1cHBsaWNhbnQtPj53dHBfd3BhOiBDV19XUEFfTVNHX0UyQ19TVEFfQURERURcbiAgICB3cGFfc3VwcGxpY2FudC0-Pnd0cF93cGE6IENXX1dQQV9NU0dfRTJDX1NUQV9BU1NPQ1xuICAgIHd0cF93cGEtLT4-aW50ZXJuYWxfaG9zdGFwZDogQXNzb2NpYXRpb24gUmVxdWVzdChTU0lEKVxuICAgIGludGVybmFsX2hvc3RhcGQtPj5jYXB3YXA6IENXX0lQQ19NU0dfSTJDX1NUQV9BRERcbiAgICBpbnRlcm5hbF9ob3N0YXBkLS0-Pnd0cF93cGE6IEFzc29jaWF0aW9uIFJlcXVlc3RcbiAgICB3dHBfd3BhLT4-d3BhX3N1cHBsaWNhbnQ6IENXX1dQQV9NU0dfQzJFX1NUQV9BU1NPQ1xuICAgIGNhcHdhcC0tPj53dHBfd3BhOiBTdGF0aW9uIENvbmZpZ3VyYXRpb24gUmVxdWVzdFxuICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFX1NUQV9BRERcblxuICAgIGxvb3AgMiBUaW1lc1xuICAgICAgICBleHRlcm5hbF9ob3N0YXBkLT4-Y2Fwd2FwOiBDV19JUENfTVNHX0UyQ19XTEFOX0tFWVxuICAgIGVuZFxuXG4gICAgTm90ZSBvdmVyIGV4dGVybmFsX2hvc3RhcGQ6IEVBUDogU2VydmVyIHN0YXRlIG1hY2hpbmUgY3JlYXRlZFxuXG4gICAgd3RwX3dwYS0tPj5jYXB3YXA6IFN0YXRpb24gQ29uZmlndXJhdGlvbiBSZXNwb25zZVxuXG4gICAgZXh0ZXJuYWxfaG9zdGFwZC0-PmNhcHdhcDogQ1dfSVBDX01TR19FMkNfODAyMVggW0VBUCBQYWNrZXQgKGlkZW50aWZpZXIpXVxuICAgIGNhcHdhcC0tPj53dHBfd3BhOiBFQVAgUmVxdWVzdCBJZGVudGl0eVxuICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFX1NUQV9LRVlfQ0xSXG4gICAgXG4gICAgd3RwX3dwYS0-PndwYV9zdXBwbGljYW50OiBDV19XUEFfTVNHX0MyRV9TVEFfODAyMVhcbiAgICB3cGFfc3VwcGxpY2FudC0-Pnd0cF93cGE6IENXX1dQQV9NU0dfRTJDX1NUQV84MDIxWFxuXG4gICAgd3RwX3dwYS0tPj5jYXB3YXA6IEVBUCBSZXNwb25zZSBJZGVudGl0eVxuICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFXzgwMjFYIFtFQVAgUmVzcG9uc2UtSWRlbnRpdHldXG5cbiAgICBleHRlcm5hbF9ob3N0YXBkLT4-ZWFwX3Byb3h5OiBBY2Nlc3MtUmVxdWVzdFtVc2VyLU5hbWVdXG4gICAgZWFwX3Byb3h5LT4-ZXh0ZXJuYWxfaG9zdGFwZDogQWNjZXNzLUNoYWxsZW5nZVtFQVAtUmVxdWVzdC1QRUFQXVxuXG4gICAgZXh0ZXJuYWxfaG9zdGFwZC0-PmNhcHdhcDogQ1dfSVBDX01TR19FMkNfODAyMVhbSUVFRSA4MDIuMVhdXG4gICAgXG5cbiAgICBjYXB3YXAtLT4-d3RwX3dwYTogRUFQIFJlcXVlc3QgVHVubmVsZWQgVExTIEVBUCAoRUFQLVBFQVApXG5cbiAgICB3dHBfd3BhLT4-d3BhX3N1cHBsaWNhbnQ6IENXX1dQQV9NU0dfQzJFX1NUQV84MDIxWFxuICAgIHdwYV9zdXBwbGljYW50LT4-d3RwX3dwYTogQ1dfV1BBX01TR19FMkNfU1RBXzgwMjFYXG5cbiAgICB3dHBfd3BhLS0-PmNhcHdhcDogVExTdjEgQ2xpZW50IEhlbGxvXG5cbiAgICBsb29wIDMgVGltZXNcbiAgICAgICAgY2Fwd2FwLS0-Pnd0cF93cGE6IFRMU3YxIFNlcnZlciBIZWxsbywgQ2VydGlmaWNhdGUsIFNldmVyIEhlbGxvIERvbmVcbiAgICAgICAgXG4gICAgICAgIHd0cF93cGEtPj53cGFfc3VwcGxpY2FudDogQ1dfV1BBX01TR19DMkVfU1RBXzgwMjFYXG4gICAgICAgIHdwYV9zdXBwbGljYW50LT4-d3RwX3dwYTogQ1dfV1BBX01TR19FMkNfU1RBXzgwMjFYXG5cbiAgICAgICAgd3RwX3dwYS0tPj5jYXB3YXA6IEVBUCBSZXNwb25zZSwgVHVubmVsZWQgVExTIEVBUCAoRUFQLVBFQVApXG4gICAgZW5kXG5cbiAgICBsb29wIDMgVGltZXNcbiAgICAgICAgY2Fwd2FwLT4-ZXh0ZXJuYWxfaG9zdGFwZDogQ1dfSVBDX01TR19DMkVfODAyMVhbRUFQIFJlc3BvbnNlLVBFQVBdXG4gICAgICAgIGV4dGVybmFsX2hvc3RhcGQtPj5lYXBfcHJveHk6IEFjY2Vzcy1SZXF1ZXN0W0VBUC1NZXNzYWdlXVxuICAgICAgICBlYXBfcHJveHktPj5leHRlcm5hbF9ob3N0YXBkOiBBY2Nlc3MtQ2hhbGxlbmdlW0VBUC1NZXNzYWdlXVxuICAgICAgICBleHRlcm5hbF9ob3N0YXBkLT4-Y2Fwd2FwOiBDV19JUENfTVNHX0UyQ184MDIxWFtFQVAtUmVxdWVzdC1QRUFQXVxuICAgIGVuZFxuXG4gICAgZXh0ZXJuYWxfaG9zdGFwZC0-PmNhcHdhcDogQ1dfSVBDX01TR19FMkNfV0lEU19FQVBPTF9JTkZPXG5cbiAgICBjYXB3YXAtLT4-d3RwX3dwYTogVExTdjEgU2VydmVyIEhlbGxvLCBDZXJ0aWZpY2F0ZSwgU2V2ZXIgSGVsbG8gRG9uZVxuICAgIFxuICAgIHd0cF93cGEtPj53cGFfc3VwcGxpY2FudDogQ1dfV1BBX01TR19DMkVfU1RBXzgwMjFYXG4gICAgd3BhX3N1cHBsaWNhbnQtPj53dHBfd3BhOiBDV19XUEFfTVNHX0UyQ19TVEFfODAyMVhcblxuICAgIHd0cF93cGEtLT4-Y2Fwd2FwOiBUTFN2MSBDbGllbnQgS2V5IEV4Y2hhbmdlLCBDaGFuZ2UgQ2lwaGVyIFNwZWMsIEVuY3J5cHRlZCBIYW5kc2hha2UgTWVzc2FnZVxuICAgIGNhcHdhcC0tPj53dHBfd3BhOiBUTFN2MSBOZXcgU2Vzc2lvbiBUaWNrZXRcblxuICAgIHd0cF93cGEtPj53cGFfc3VwcGxpY2FudDogQ1dfV1BBX01TR19DMkVfU1RBXzgwMjFYXG4gICAgd3BhX3N1cHBsaWNhbnQtPj53dHBfd3BhOiBDV19XUEFfTVNHX0UyQ19TVEFfODAyMVhcblxuICAgIGxvb3AgMiBUaW1lc1xuICAgICAgICB3dHBfd3BhLS0-PmNhcHdhcDogVExTdjEgQXBwbGljYXRpb24gRGF0YVxuICAgICAgICBjYXB3YXAtLT4-d3RwX3dwYTogVExTdjEgQXBwbGljYXRpb24gRGF0YVxuXG4gICAgICAgIHd0cF93cGEtPj53cGFfc3VwcGxpY2FudDogQ1dfV1BBX01TR19DMkVfU1RBXzgwMjFYXG4gICAgICAgIHdwYV9zdXBwbGljYW50LT4-d3RwX3dwYTogQ1dfV1BBX01TR19FMkNfU1RBXzgwMjFYXG4gICAgZW5kXG5cbiAgICB3dHBfd3BhLS0-PmNhcHdhcDogVExTdjEgQXBwbGljYXRpb24gRGF0YVxuXG4gICAgZWFwX3Byb3h5LT4-ZXh0ZXJuYWxfaG9zdGFwZDogRUFQIFN1Y2Nlc3NcbiAgICBleHRlcm5hbF9ob3N0YXBkLT4-Y2Fwd2FwOiBDV19JUENfTVNHX0UyQ184MDIxWFxuICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFXzgwMjFYXG4gICAgY2Fwd2FwLS0-Pnd0cF93cGE6IEVBUCBTdWNjZXNzXG5cbiAgICBsb29wIDIgVGltZXNcbiAgICAgICAgY2Fwd2FwLS0-Pnd0cF93cGE6IEVBUE9MIEtleVxuICAgICAgICB3dHBfd3BhLT4-d3BhX3N1cHBsaWNhbnQ6IENXX1dQQV9NU0dfQzJFX1NUQV84MDIxWFxuICAgICAgICB3cGFfc3VwcGxpY2FudC0-Pnd0cF93cGE6IENXX1dQQV9NU0dfRTJDX1NUQV84MDIxWFxuICAgICAgICB3dHBfd3BhLS0-PmNhcHdhcDogRUFQT0wgS2V5XG4gICAgZW5kXG5cbiAgICBsb29wIDIgVGltZXNcbiAgICAgICAgY2Fwd2FwLT4-ZXh0ZXJuYWxfaG9zdGFwZDogRUFQT0xfS0VZXG4gICAgICAgIGV4dGVybmFsX2hvc3RhcGQtPj5jYXB3YXA6IENXX0lQQ19NU0dfRTJDXzgwMjFYXG4gICAgICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFXzgwMjFYXG4gICAgZW5kXG5cbiAgICBjYXB3YXAtLT4-d3RwX3dwYTogU3RhdGlvbiBDb25maWd1cmF0aW9uIFJlcXVlc3RcblxuICAgIGV4dGVybmFsX2hvc3RhcGQtPj5jYXB3YXA6IENXX0lQQ19NU0dfRTJDX1dMQU5fS0VZXG4gICAgY2Fwd2FwLT4-ZXh0ZXJuYWxfaG9zdGFwZDogQ1dfSVBDX01TR19DMkVfV0xBTl9LRVlcblxuICAgIHd0cF93cGEtLT4-Y2Fwd2FwOiBTdGF0aW9uIENvbmZpZ3VyYXRpb24gUmVzcG9uc2VcblxuICAgIGNhcHdhcC0-PmV4dGVybmFsX2hvc3RhcGQ6IENXX0lQQ19NU0dfQzJFX1NUQV9JUEFERFIiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)
