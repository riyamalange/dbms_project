import os


class Config:
    # =========================
    # MySQL Database Configuration
    # =========================

    MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
    MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))

    MYSQL_USER = os.getenv("MYSQL_USER", "root")

    # IMPORTANT:
    # Keep your actual MySQL root password here.
    # Do NOT share this password with anyone.
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "NewPassword123!")

    MYSQL_DATABASE = os.getenv(
        "MYSQL_DATABASE",
        "UnifiedPaymentGateway"
    )

    # =========================
    # Flask Configuration
    # =========================

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "unified-payment-gateway-secret-key"
    )

    # =========================
    # Application Configuration
    # =========================

    DEBUG = True