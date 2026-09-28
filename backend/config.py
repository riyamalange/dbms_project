import os
class Config:
    MYSQL_HOST=os.getenv("MYSQL_HOST","localhost")
    MYSQL_PORT=int(os.getenv("MYSQL_PORT","3306"))
    MYSQL_USER=os.getenv("MYSQL_USER","root")
    MYSQL_PASSWORD=os.getenv("MYSQL_PASSWORD","YOUR_MYSQL_PASSWORD")
    MYSQL_DATABASE=os.getenv("MYSQL_DATABASE","UnifiedPaymentGateway")
    SECRET_KEY=os.getenv("SECRET_KEY","change-this-secret")