import os
from dotenv import load_dotenv
import smtplib
from email.message import EmailMessage


def sendMail(who, token):
    load_dotenv("mail.env")
    server = os.getenv("SERVER")
    psw = os.getenv("PSW")

    msg = EmailMessage()
    msg.set_content(
        f"Aqui está seu código de acesso: {token}"
    )

    msg['Subject'] = 'Código de Acesso - ESPEON'
    msg['From'] = server
    msg['To'] = who

    try:
        s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        s.login(server, psw)
        s.send_message(msg)
        s.quit
    except Exception as e:
        print("[EMAIL] Erro ao enviar e-mail:", e)
