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

![Generated diagram](./diagram.png)
