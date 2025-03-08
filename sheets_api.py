from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

# Carregar credenciais do arquivo JSON
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
SERVICE_ACCOUNT_FILE = "credenciais.json"  # Nome do seu arquivo de credenciais

creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)

# Criar cliente da API Google Sheets
service = build("sheets", "v4", credentials=creds)

# ID da planilha (substitua pelo seu ID real)
SPREADSHEET_ID = "1lesTDy_J_rbeIlVhEl4a3M7cMZC6tc-m-MWPMXH4WsU"

# Acessar a primeira aba da planilha
sheet = service.spreadsheets()

# Testar leitura da planilha
result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="A1:D10").execute()
values = result.get("values", [])

print("Dados na planilha:", values)
