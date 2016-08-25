BEGIN {RS == ""} {
    map["ACT"]="Australia/Darwin"
    map["AET"]="Australia/ACT"
    map["AGT"]="America/Argentina/Buenos_Aires"
    map["ART"]="EET"
    map["AST"]="America/Anchorage"
    map["Asia/Riyadh87"]="Asia/Riyadh"
    map["Asia/Riyadh88"]="Asia/Riyadh"
    map["Asia/Riyadh89"]="Asia/Riyadh"
    map["BET"]="America/Sao_Paulo"
    map["BST"]="Asia/Dacca"
    map["CAT"]="Africa/Blantyre"
    map["CNT"]="America/St_Johns"
    map["CST"]="America/Chicago"
    map["CTT"]="Asia/Chongqing"
    map["EAT"]="Africa/Addis_Ababa"
    map["ECT"]="Europe/Paris"
    map["IET"]="America/Fort_Wayne"
    map["IST"]="Asia/Calcutta"
    map["JST"]="Asia/Tokyo"
    map["MIT"]="Pacific/Apia"
    map["Mideast/Riyadh87"]="Asia/Riyadh"
    map["Mideast/Riyadh88"]="Asia/Riyadh"
    map["Mideast/Riyadh89"]="Asia/Riyadh"
    map["NET"]="Asia/Yerevan"
    map["NST"]="Antarctica/McMurdo"
    map["PLT"]="Asia/Karachi"
    map["PNT"]="America/Phoenix"
    map["PRT"]="America/Puerto_Rico"
    map["PST"]="America/Los_Angeles"
    map["Pacific/Bougainville"]="Etc/GMT-11"
    map["SST"]="Pacific/Guadalcanal"
    map["SystemV/AST4"]="Etc/GMT+4"
    map["SystemV/AST4ADT"]="Atlantic/Bermuda"
    map["SystemV/CST6"]="Etc/GMT+6"
    map["SystemV/CST6CDT"]="US/Central"
    map["SystemV/EST5"]="Etc/GMT+5"
    map["SystemV/EST5EDT"]="US/Eastern"
    map["SystemV/HST10"]="Etc/GMT+10"
    map["SystemV/MST7"]="Etc/GMT+7"
    map["SystemV/MST7MDT"]="US/Mountain"
    map["SystemV/PST8"]="Etc/GMT+8"
    map["SystemV/PST8PDT"]="US/Pacific"
    map["SystemV/YST9"]="Etc/GMT+9"
    map["SystemV/YST9YDT"]="US/Alaska"
    map["VST"]="Asia/Ho_Chi_Minh"
    map["Chile/EasterIsland"]="CST6CDT"
    map["Pacific/Easter"]="CST6CDT"
    map["America/Santiago"]="America/Thule"
    map["Chile/Continental"]="America/Thule"
    map["Antarctica/Palmer"]="America/Thule"
    map["America/Godthab"]="America/Miquelon"
    map["Asia/Amman"]="Asia/Beirut"
    map["Asia/Gaza"]="Asia/Beirut"
    map["Asia/Hebron"]="Asia/Beirut"
    map["Asia/Jerusalem"]="Asia/Beirut"
    map["Asia/Tel_Aviv"]="Asia/Beirut"
    map["Israel"]="Asia/Beirut"

    out = "";

    if (map[$1]) {
        cmd = "tail -n 1 /usr/share/zoneinfo/"map[$1]
        cmd | getline out;
        close(cmd)

        if (length(out)==0) {
            print map[$1]" not exist for map"
            system("tail -n 1 /usr/share/zoneinfo/"map[$1])
        }
    }
    else {
        cmd = "tail -n 1 /usr/share/zoneinfo/"$1
        cmd | getline out;
        close(cmd)

        if (length(out)==0) {
            print $1" not exist for ori"
            system("tail -n 1 /usr/share/zoneinfo/"$1)
        }
    }

    arr[$1] = out;
} 
END {
    for(x in arr) {
        if (map[x]) {
            print x" "map[x]" "arr[x] > "timezone.conf"
        }
        else {
            print x" "x" "arr[x] > "timezone.conf"
        }
    }
}