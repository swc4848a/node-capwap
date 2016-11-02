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
    capwap->>external_hostapd: CW_IPC_MSG_C2E_VAP_ADD
    external_hostapd->>external_hostapd: INIT ==> SETUP1 ==> INIT2
    external_hostapd->>capwap: CW_IPC_MSG_E2C_WLAN_INIT
    external_hostapd->>external_hostapd: INIT2 ==> WAITMAC

    capwap->>external_hostapd: CW_IPC_MSG_C2E_WLAN_KEY
    capwap->>external_hostapd: CW_IPC_MSG_C2E_VAP_CHG
    external_hostapd->>external_hostapd: WAITMAC==> INIT3
    external_hostapd->>capwap: CW_IPC_MSG_E2C_WLAN_KEY
    external_hostapd->>external_hostapd: INIT3==> IDLE

    capwap->>external_hostapd: CW_IPC_MSG_C2E_WLAN_KEY
    capwap->>external_hostapd: CW_IPC_MSG_C2E_VAP_CHG

    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_ADD
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_ADDED
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_ASSOC
    wtp_wpa-->>internal_hostapd: Association Request(SSID)
    internal_hostapd->>capwap: CW_IPC_MSG_I2C_STA_ADD
    internal_hostapd-->>wtp_wpa: Association Request
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_ASSOC
    capwap-->>wtp_wpa: Station Configuration Request
    capwap->>external_hostapd: CW_IPC_MSG_C2E_STA_ADD
    external_hostapd->>external_hostapd: IDLE ==> RUN
    external_hostapd->>capwap: CW_IPC_MSG_E2C_WLAN_KEY
    Note over external_hostapd: EAP: Server state machine created

    external_hostapd->>external_hostapd: BE_AUTH ==> IDLE

    wtp_wpa-->>capwap: Station Configuration Response

    capwap->>external_hostapd: CW_IPC_MSG_C2E_STA_KEY_CLR
    capwap->>external_hostapd: CW_IPC_MSG_C2E_8021X

    external_hostapd->>capwap: EAP Packet (identifier 103)
    capwap-->>wtp_wpa: EAP Request Identity
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

    wtp_wpa-->>capwap: EAP Response Identity

    capwap->>external_hostapd: EAP Response-Identity (1)
    external_hostapd->>eap_proxy: Access-Request
    eap_proxy->>external_hostapd: Access-Challenge

    external_hostapd->>capwap: CW_IPC_MSG_E2C_8021X
    capwap->>external_hostapd: CW_IPC_MSG_C2E_8021X

    capwap-->>wtp_wpa: EAP Request Tunneled TLS EAP (EAP-TTLS)

    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

    wtp_wpa-->>capwap: TLSv1 Client Hello

    loop 3 Times
        capwap-->>wtp_wpa: TLSv1 Server Hello, Certificate, Sever Hello Done
        
        wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
        wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

        wtp_wpa-->>capwap: EAP Response, Tunneled TLS EAP (EAP-TTLS)
    end

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
    capwap-->>wtp_wpa: EAP Success

    loop 2 Times
        capwap-->>wtp_wpa: EAPOL Key
        wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
        wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X
        wtp_wpa-->>capwap: EAPOL Key
    end

    capwap-->>wtp_wpa: Station Configuration Request
    wtp_wpa-->>capwap: Station Configuration Response
```

Generated diagram

![Generated diagram](./diagram.png)
