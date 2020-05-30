# ITE_black
Repository for our university team project: getting temperature sensor data to a website using python and javascript.

Use ZCU VPN: http://147.228.121.17:8889

Instalace:
1) Na server s předinstalovaným Pythonem 3.7 a programem tmux nahrajte složku setup.
2) Na serveru vytvořte session pomocí programu tmux, ve které poběží program nepřetržitě:
    tmux new -s 'nazev\_session'
3) Spusťte skript main.py ve vytvořené session.
4) Na portu 8889 IP adresy vašeho serveru je nyní možné otevřít webovou stránku s údaji z MQTT brokeru.

![](/mib.jpg)
