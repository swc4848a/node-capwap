#diagram

### Mermaid

[Mermaid](http://knsv.github.io/mermaid/) doc for modules interaction

```
sequenceDiagram
    participant eap_proxy
    participant hostapd
    participant capwap
    participant wtp_wpa
    participant wpa_supplicant

    capwap-->>wtp_wpa: IEEE 802.11 WLAN Configuration Request
    wtp_wpa-->>capwap: IEEE 802.11 WLAN Configuration Response
    
    Note over capwap,wtp_wpa: wtp connect success
    
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_ADD
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_ADDED
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_ASSOC
    wtp_wpa-->>capwap: Association Request(SSID)
    capwap->>capwap: CW_IPC_MSG_I2C_STA_ADD
    Note right of capwap: internal hostapd to capwap
    capwap-->>wtp_wpa: Association Request
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_ASSOC
    capwap-->>wtp_wpa: Station Configuration Request
    capwap->>hostapd: CW_IPC_MSG_C2E_STA_ADD

    wtp_wpa-->>capwap: Station Configuration Response
    capwap-->>wtp_wpa: EAP Request Identity
    wtp_wpa->>wpa_supplicant: CW_WPA_MSG_C2E_STA_8021X
    wpa_supplicant->>wtp_wpa: CW_WPA_MSG_E2C_STA_8021X

    wtp_wpa-->>capwap: EAP Response Identity
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

![Generated diagram](./diagram.svg)
